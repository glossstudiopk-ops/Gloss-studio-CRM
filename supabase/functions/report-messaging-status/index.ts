import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
const cors={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Access-Control-Allow-Methods":"POST, OPTIONS"};
const json=(x:unknown,status=200)=>new Response(JSON.stringify(x),{status,headers:{...cors,"Content-Type":"application/json"}});
Deno.serve(async req=>{
 if(req.method==="OPTIONS")return new Response("ok",{headers:cors});
 if(req.method!=="POST")return json({error:"Method not allowed"},405);
 try{
  const token=(req.headers.get("authorization")||"").replace(/^Bearer\s+/i,"");
  if(!token)return json({error:"Sign in first."},401);
  const sb=createClient(Deno.env.get("SUPABASE_URL")!,Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,{auth:{persistSession:false,autoRefreshToken:false}});
  const {data:auth,error:authError}=await sb.auth.getUser(token);
  if(authError||!auth.user)return json({error:"Unauthorized"},401);
  const {data:prof,error:profErr}=await sb.from("profiles").select("role,active").eq("id",auth.user.id).single();
  if(profErr||prof?.role!=="admin"||!prof.active)return json({error:"Admin only"},403);
  const emailKey=Deno.env.get("RESEND_API_KEY"),from=Deno.env.get("REPORT_FROM_EMAIL");
  const waToken=Deno.env.get("WA_ACCESS_TOKEN"),waPhone=Deno.env.get("WA_PHONE_NUMBER_ID"),waTemplate=Deno.env.get("WA_REPORT_TEMPLATE_NAME"),waba=Deno.env.get("WA_BUSINESS_ACCOUNT_ID");
  let emailStatus="not_configured",waStatus="not_configured",emailDetail="",waDetail="";
  if(emailKey&&from){
    emailStatus="configured_not_verified";
    try{
      const res=await fetch("https://api.resend.com/domains",{headers:{Authorization:"Bearer "+emailKey}});
      if(res.ok){
        const out=await res.json(),domain=String(from).match(/@([^>\\s]+)/)?.[1]?.toLowerCase();
        const found=(out.data||[]).find((x:any)=>String(x.name).toLowerCase()===domain);
        if(found?.status==="verified"){emailStatus="verified";}
        else emailDetail=found?"Domain status: "+found.status:"Sender domain is not listed as verified by Resend.";
      }else emailDetail="Could not verify sending domain; check API key permissions.";
    }catch{emailDetail="Unable to check email domain status.";}
  }
  if(waToken&&waPhone&&waTemplate){
    waStatus="configured_not_verified";
    try{
      const graph="https://graph.facebook.com/"+(Deno.env.get("WA_GRAPH_VERSION")||"v23.0");
      const ping=await fetch(graph+"/"+waPhone+"?fields=display_phone_number,verified_name",{headers:{Authorization:"Bearer "+waToken}});
      if(ping.ok){
        if(waba){
          const templ=await fetch(graph+"/"+waba+"/message_templates?limit=100&name="+encodeURIComponent(waTemplate),{headers:{Authorization:"Bearer "+waToken}});
          if(templ.ok){
            const templates=await templ.json(),match=(templates.data||[]).find((t:any)=>t.name===waTemplate&&t.status==="APPROVED");
            if(match){
              const header=(match.components||[]).find((x:any)=>x.type==="HEADER");
              if(header?.format==="DOCUMENT")waStatus="verified";
              else waDetail="Approved template must use a document header.";
            }else waDetail="WhatsApp document template is not yet approved.";
          }else waDetail="Could not verify WhatsApp template; check account ID and permissions.";
        }else waDetail="WhatsApp phone verified; add WA_BUSINESS_ACCOUNT_ID to verify the approved template.";
      }else waDetail="WhatsApp phone or token could not be verified.";
    }catch{waDetail="Unable to verify WhatsApp provider status.";}
  }
  const {data:log,error:logErr}=await sb.from("report_delivery_log").select("id,channel,recipient,period,period_start,period_end,status,created_at").order("created_at",{ascending:false}).limit(15);
  return json({email:{status:emailStatus,from:from||null,detail:emailDetail},whatsapp:{status:waStatus,detail:waDetail},
    recent:logErr?[]:log||[],meaning:"accepted means the provider accepted the message request, not that the recipient has opened it."});
 }catch(e){console.error(e);return json({error:String(e?.message||e)},500);}
});