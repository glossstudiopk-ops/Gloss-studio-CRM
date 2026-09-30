import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { PDFDocument, StandardFonts, rgb } from "npm:pdf-lib@1.17.1";

const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS"};
const json=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...cors,"Content-Type":"application/json"}});
const n=(v:any)=>Number(v||0);
const rs=(v:any)=>"Rs. "+n(v).toLocaleString("en-US",{maximumFractionDigits:2,minimumFractionDigits:0});
const strip=(s:any)=>String(s??"").replace(/[^\x20-\x7E]/g," ").replace(/\s+/g," ").trim();
const isoOk=(x:any)=>typeof x==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&!Number.isNaN(Date.parse(x+"T00:00:00Z"));
const localPK=()=>new Date(Date.now()+5*3600000).toISOString().slice(0,10);
const plusDays=(d:string,n:number)=>new Date(Date.parse(d+"T00:00:00Z")+n*86400000).toISOString().slice(0,10);
const sortDesc=(a:any,b:any)=>String(b.date).localeCompare(String(a.date));
const toB64=(u:Uint8Array)=>{let out="";for(let i=0;i<u.length;i+=8192)out+=String.fromCharCode(...u.slice(i,i+8192));return btoa(out);};
const gather=async(q:any)=>{let all:any[]=[];for(let start=0;start<100000;start+=1000){const {data,error}=await q.range(start,start+999);if(error)throw error;all.push(...(data||[]));if((data||[]).length<1000)return all;}throw new Error("Report exceeds row limit. Please select a shorter date range.");};

Deno.serve(async(req:Request)=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers:cors});
 if(req.method!=="POST")return json({error:"Method not allowed"},405);
 let userId="";
 let metadata:any=null;
 let service:any;
 try{
   const token=(req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
   if(!token)return json({error:"Sign in as an administrator."},401);
   const url=Deno.env.get("SUPABASE_URL"),key=Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
   if(!url||!key)throw new Error("Supabase server settings are incomplete.");
   service=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
   const {data:auth,error:authErr}=await service.auth.getUser(token);
   if(authErr||!auth.user)return json({error:"Your session has expired. Sign in again."},401);
   userId=auth.user.id;
   const {data:profile,error:profileErr}=await service.from("profiles").select("role,active").eq("id",userId).single();
   if(profileErr||!profile||profile.role!=="admin"||!profile.active)return json({error:"Only active administrators can generate or share reports."},403);
   const body=await req.json();
   const {action,period,start,end,channel,recipient,consent}=body;
   if(!["download","send"].includes(action)||!["day","week","month","year"].includes(period)||!isoOk(start)||!isoOk(end)||start>end||Date.parse(end+"T00:00:00Z")-Date.parse(start+"T00:00:00Z")>370*86400000)
     return json({error:"Choose a valid report period (maximum 370 days)."},400);
   if(action==="send"){
     if(!["email","whatsapp"].includes(channel))return json({error:"Select email or WhatsApp."},400);
     if(channel==="email"&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(recipient||"")))return json({error:"Enter a valid email address."},400);
     if(channel==="whatsapp"&&(!/^\+?[1-9]\d{7,14}$/.test(String(recipient||"").replace(/[\s()-]/g,""))||consent!==true))
       return json({error:"Use an international WhatsApp number and confirm the recipient has agreed to receive the report."},400);
   }
   const [invoices,expenses,paymentRows,payables,appointments,clients,allPaymentRows]=await Promise.all([
     gather(service.from("invoices").select("invoice_date,invoice_number,total,payment_method").gte("invoice_date",start).lte("invoice_date",end).order("invoice_date")),
     gather(service.from("expenses").select("expense_date,title,category,amount").gte("expense_date",start).lte("expense_date",end).order("expense_date")),
     gather(service.from("payable_payments").select("payment_date,payable_id,amount,method,reference").gte("payment_date",start).lte("payment_date",end).order("payment_date")),
     gather(service.from("payables").select("id,title,category,vendor,total_amount,due_date,bill_date").order("bill_date")),
     gather(service.from("appointments").select("appointment_date,status").gte("appointment_date",start).lte("appointment_date",end)),
     gather(service.from("clients").select("created_at").gte("created_at",start+"T00:00:00+05:00").lte("created_at",end+"T23:59:59.999+05:00")),
     gather(service.from("payable_payments").select("payable_id,amount"))
   ]);
   const bills=new Map(payables.map((b:any)=>[b.id,b]));
   const paid=new Map<string,number>();
   allPaymentRows.forEach((p:any)=>paid.set(p.payable_id,(paid.get(p.payable_id)||0)+n(p.amount)));
   const sales=invoices.reduce((s:number,i:any)=>s+n(i.total),0);
   const dayCosts=expenses.reduce((s:number,e:any)=>s+n(e.amount),0);
   const supplierPaid=paymentRows.reduce((s:number,p:any)=>s+n(p.amount),0);
   const open=payables.map((p:any)=>({...p,balance:Math.max(0,n(p.total_amount)-(paid.get(p.id)||0))})).filter((p:any)=>p.balance>0.009);
   const outstanding=open.reduce((s:number,p:any)=>s+p.balance,0);
   const overdue=open.filter((p:any)=>p.due_date&&p.due_date<localPK()).reduce((s:number,p:any)=>s+p.balance,0);
   const rows:any[]=[
     ...invoices.map((i:any)=>({date:i.invoice_date,type:"Invoice",detail:i.invoice_number,category:i.payment_method,amount:n(i.total)})),
     ...expenses.map((e:any)=>({date:e.expense_date,type:"Operating expense",detail:e.title,category:e.category,amount:n(e.amount)})),
     ...paymentRows.map((p:any)=>({date:p.payment_date,type:"Bill payment",detail:(bills.get(p.payable_id) as any)?.title||"Bill payment",category:(bills.get(p.payable_id) as any)?.category||p.method,amount:n(p.amount)}))
   ].sort(sortDesc);
   const costs=new Map<string,number>();
   expenses.forEach((e:any)=>costs.set(e.category||"Other",(costs.get(e.category||"Other")||0)+n(e.amount)));
   paymentRows.forEach((p:any)=>{const group=(bills.get(p.payable_id) as any)?.category||"Payables";costs.set(group,(costs.get(group)||0)+n(p.amount));});
   const doc=await PDFDocument.create();
   const regular=await doc.embedFont(StandardFonts.Helvetica);
   const bold=await doc.embedFont(StandardFonts.HelveticaBold);
   const W=595,H=842,margin=45;let page:any,y=0,pageNo=0;
   const gold=rgb(.67,.45,.25),dark=rgb(.19,.16,.14),muted=rgb(.42,.42,.42),light=rgb(.97,.95,.92);
   const newPage=()=>{
     page=doc.addPage([W,H]);pageNo++;y=H-42;
     page.drawRectangle({x:0,y:H-13,width:W,height:13,color:gold});
     page.drawText("GLOSS STUDIO  /  BUSINESS REPORT",{x:margin,y,font:bold,size:10,color:dark});y-=29;
     page.drawLine({start:{x:margin,y},end:{x:W-margin,y},thickness:.7,color:gold});y-=20;
   };
   const footer=()=>doc.getPages().forEach((p:any,i:number)=>{
     p.drawLine({start:{x:margin,y:37},end:{x:W-margin,y:37},thickness:.4,color:muted});
     p.drawText("Confidential - Gloss Studio management",{x:margin,y:22,font:regular,size:8,color:muted});
     p.drawText("Page "+(i+1)+" of "+doc.getPageCount(),{x:W-96,y:22,font:regular,size:8,color:muted});
   });
   const ensure=(height:number)=>{if(y-height<65)newPage();};
   const line=(s:any,{font=regular,size=10,color=dark,indent=0,space=6}={})=>{
     const text=strip(s); const max=W-2*margin-indent;
     const words=text.split(" ");let segment="";
     for(const word of words){
       const candidate=segment?segment+" "+word:word;
       if(font.widthOfTextAtSize(candidate,size)>max&&segment){ensure(size+7);page.drawText(segment,{x:margin+indent,y,font,size,color});y-=size+7;segment=word;}
       else segment=candidate;
     }
     if(segment){ensure(size+space);page.drawText(segment,{x:margin+indent,y,font,size,color});y-=size+space;}
   };
   const title=(s:string)=>{ensure(42);y-=9;line(s,{font:bold,size:14,color:gold,space:12});};
   const pair=(label:string,value:string)=>{
     ensure(25);page.drawRectangle({x:margin-3,y:y-9,width:W-2*margin+6,height:23,color:pageNo%2?rgb(.985,.981,.975):light});
     page.drawText(strip(label),{x:margin+7,y,font:regular,size:10,color:dark});
     page.drawText(strip(value),{x:W-margin-7-bold.widthOfTextAtSize(strip(value),10),y,font:bold,size:10,color:dark});y-=25;
   };
   const tableHeader=(fields:any[])=>{ensure(26);page.drawRectangle({x:margin,y:y-11,width:W-2*margin,height:25,color:light});
     fields.forEach(([text,x]:any)=>page.drawText(text,{x,y:y-1,font:bold,size:8,color:dark}));y-=31;};
   const row=(date:string,type:string,detail:string,amount:number)=>{
     ensure(23);
     const short=strip(detail).slice(0,40);
     page.drawText(strip(date),{x:margin,y,font:regular,size:8});
     page.drawText(strip(type),{x:margin+77,y,font:regular,size:8});
     page.drawText(short,{x:margin+184,y,font:regular,size:8});
     const val=rs(amount);page.drawText(val,{x:W-margin-regular.widthOfTextAtSize(val,8),y,font:regular,size:8});
     y-=20;
   };
   newPage();
   title(period.toUpperCase()+" REPORT");
   line(start+"  to  "+end,{font:bold,size:11});
   line("Generated: "+localPK()+" | Currency: Pakistani rupees (PKR)",{size:9,color:muted});
   y-=6;
   title("At a glance");
   pair("Invoiced sales",rs(sales));
   pair("Daily operating expenses paid",rs(dayCosts));
   pair("Payments made against bills",rs(supplierPaid));
   pair("Total recorded cash outflows",rs(dayCosts+supplierPaid));
   pair("Open bills (all dates, current)",rs(outstanding));
   pair("Overdue bills (all dates, current)",rs(overdue));
   title("Activity");
   pair("Invoices issued",String(invoices.length));
   pair("Appointments booked",String(appointments.length));
   pair("Completed treatments",String(appointments.filter((a:any)=>a.status==="completed").length));
   pair("New customer profiles",String(clients.length));
   title("What these numbers mean");
   line("Invoiced sales are issued invoices, not proof of cash received. Recorded cash outflows include daily paid expenses and payments against supplier/fixed-cost bills. Unpaid bills are shown separately.",{size:9,color:muted,space:7});
   line("This is an operational summary, not an audited profit-and-loss statement. A financial profit figure requires accurate receipts, accrual adjustments, taxes, depreciation and inventory accounting.",{size:9,color:muted,space:7});
   title("Where business cash was spent");
   if(!costs.size)line("No payments recorded for this period.",{size:10,color:muted});
   else [...costs.entries()].sort((a,b)=>b[1]-a[1]).forEach(([c,v])=>pair(strip(c).slice(0,48),rs(v)));
   title("Outstanding bills to manage");
   if(!open.length)line("No outstanding bills are recorded.",{size:10,color:muted});
   else{
     tableHeader([["Due",margin],["Supplier / expense",margin+80],["Remaining",margin+389]]);
     open.sort((a:any,b:any)=>String(a.due_date||"9999").localeCompare(String(b.due_date||"9999")))
       .forEach((b:any)=>{ensure(23);page.drawText(strip(b.due_date||"Not set"),{x:margin,y,font:regular,size:8});
          page.drawText(strip((b.vendor?b.vendor+" - ":"")+b.title).slice(0,42),{x:margin+80,y,font:regular,size:8});
          const val=rs(b.balance);page.drawText(val,{x:W-margin-regular.widthOfTextAtSize(val,8),y,font:regular,size:8});y-=20;});
   }
   title("Transaction details");
   if(!rows.length)line("No financial transactions recorded for this period.",{size:10,color:muted});
   else{
     tableHeader([["Date",margin],["Type",margin+77],["Reference / description",margin+184],["Amount",margin+389]]);
     rows.forEach((r:any)=>{if(y-23<65){newPage();title("Transaction details (continued)");tableHeader([["Date",margin],["Type",margin+77],["Reference / description",margin+184],["Amount",margin+389]]);}
       row(r.date,r.type,r.detail,r.amount);
     });
   }
   footer();
   const pdf=new Uint8Array(await doc.save());
   const filename="Gloss-Studio-"+period+"-"+start+"-"+end+".pdf";
   if(action==="download")return new Response(pdf,{headers:{...cors,"Content-Type":"application/pdf","Content-Disposition":'attachment; filename="'+filename+'"',"Cache-Control":"no-store"}});
   metadata={channel,recipient:String(recipient).trim(),period,start,end};
   let messageId="";
   if(channel==="email"){
     const api=Deno.env.get("RESEND_API_KEY"),from=Deno.env.get("REPORT_FROM_EMAIL");
     if(!api||!from)return json({error:"Email is not configured. Add RESEND_API_KEY and verified REPORT_FROM_EMAIL in Supabase Edge Function secrets."},412);
     const resp=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+api,"Content-Type":"application/json"},
       body:JSON.stringify({from,to:[recipient],subject:"Gloss Studio - "+period+" business report ("+start+" to "+end+")",
         html:"<p>Hello,</p><p>Attached is the Gloss Studio business report for <strong>"+start+" to "+end+"</strong>.</p><p>This report contains confidential financial information. Please handle it securely.</p>",
         attachments:[{filename,content:toB64(pdf)}]})});
     const ans=await resp.json();
     if(!resp.ok)throw new Error("Email provider: "+(ans?.message||resp.status));
     messageId=ans?.id||"accepted";
   }else{
     const waToken=Deno.env.get("WA_ACCESS_TOKEN"),phoneId=Deno.env.get("WA_PHONE_NUMBER_ID"),tpl=Deno.env.get("WA_REPORT_TEMPLATE_NAME");
     if(!waToken||!phoneId||!tpl)return json({error:"WhatsApp is not configured. Add WA_ACCESS_TOKEN, WA_PHONE_NUMBER_ID and an approved document-header WA_REPORT_TEMPLATE_NAME."},412);
     const base="https://graph.facebook.com/"+(Deno.env.get("WA_GRAPH_VERSION")||"v23.0")+"/"+phoneId;
     const form=new FormData();form.append("messaging_product","whatsapp");form.append("type","application/pdf");
     form.append("file",new File([pdf],filename,{type:"application/pdf"}));
     const upload=await fetch(base+"/media",{method:"POST",headers:{"Authorization":"Bearer "+waToken},body:form});
     const uploadJson=await upload.json();
     if(!upload.ok||!uploadJson.id)throw new Error("WhatsApp document upload: "+(uploadJson?.error?.message||upload.status));
     const phone=String(recipient).replace(/\D/g,"");
     const send=await fetch(base+"/messages",{method:"POST",headers:{"Authorization":"Bearer "+waToken,"Content-Type":"application/json"},
       body:JSON.stringify({messaging_product:"whatsapp",to:phone,type:"template",
         template:{name:tpl,language:{code:Deno.env.get("WA_TEMPLATE_LANGUAGE")||"en_US"},
           components:[{type:"header",parameters:[{type:"document",document:{id:uploadJson.id,filename}}]}]}})});
     const answer=await send.json();
     if(!send.ok)throw new Error("WhatsApp: "+(answer?.error?.message||send.status));
     messageId=answer?.messages?.[0]?.id||"accepted";
   }
   await service.from("report_delivery_log").insert({requested_by:userId,channel,recipient:String(recipient).trim(),
     period,period_start:start,period_end:end,provider_message_id:messageId,status:"accepted"});
   return json({accepted:true,channel,message:"Report accepted by "+(channel==="email"?"email":"WhatsApp")+" provider. Delivery may take a short time.",messageId});
 }catch(e){
   console.error("business-report",e);
   if(userId&&metadata&&service){
     await service.from("report_delivery_log").insert({requested_by:userId,channel:metadata.channel,recipient:metadata.recipient,
       period:metadata.period,period_start:metadata.start,period_end:metadata.end,status:"failed",error_message:String(e?.message||e).slice(0,500)});
   }
   return json({error:String(e?.message||"Report generation failed.")},500);
 }
});
