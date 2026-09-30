import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ArrowLeft, ArrowRight, Download, Send, RefreshCw, Mail, MessageCircle, X } from 'lucide-react';

const money=n=>'Rs. '+Number(n||0).toLocaleString('en-PK',{minimumFractionDigits:0,maximumFractionDigits:2});
const localDate=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
const fromISO=s=>new Date(s+'T12:00:00');
const shift=(d,n)=>{const v=new Date(d);v.setDate(v.getDate()+n);return v;};
function getWindow(period,anchor){
  const d=fromISO(anchor);
  if(period==='day')return {start:localDate(d),end:localDate(d),label:d.toLocaleDateString('en-PK',{day:'numeric',month:'long',year:'numeric'})};
  if(period==='week'){
    const mon=shift(d,-((d.getDay()+6)%7)),sun=shift(mon,6);
    return {start:localDate(mon),end:localDate(sun),label:mon.toLocaleDateString('en-PK',{day:'numeric',month:'short'})+' – '+sun.toLocaleDateString('en-PK',{day:'numeric',month:'short',year:'numeric'})};
  }
  if(period==='month'){
    const first=new Date(d.getFullYear(),d.getMonth(),1),last=new Date(d.getFullYear(),d.getMonth()+1,0);
    return {start:localDate(first),end:localDate(last),label:d.toLocaleDateString('en-PK',{month:'long',year:'numeric'})};
  }
  return {start:d.getFullYear()+'-01-01',end:d.getFullYear()+'-12-31',label:String(d.getFullYear())};
}
function moveAnchor(period,anchor,direction){
  const d=fromISO(anchor);
  if(period==='day')d.setDate(d.getDate()+direction);
  if(period==='week')d.setDate(d.getDate()+7*direction);
  if(period==='month')d.setMonth(d.getMonth()+direction,15);
  if(period==='year')d.setFullYear(d.getFullYear()+direction);
  return localDate(d);
}
async function allRows(base){
  let offset=0,records=[];
  while(true){
    const r=await base.range(offset,offset+999);
    if(r.error)throw r.error;
    records=records.concat(r.data||[]);
    if(!r.data||r.data.length<1000)return records;
    offset+=1000;
  }
}
export default function BusinessReports(){
  const [period,setPeriod]=useState('month');
  const [anchor,setAnchor]=useState(localDate(new Date()));
  const [report,setReport]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const [refresh,setRefresh]=useState(0);
  const [reportBusy,setReportBusy]=useState(false);
  const [sendOpen,setSendOpen]=useState(false);
  const [sendChannel,setSendChannel]=useState('email');
  const [sendTo,setSendTo]=useState('');
  const [whatsappConsent,setWhatsappConsent]=useState(false);
  const [reportMessage,setReportMessage]=useState('');
  const range=useMemo(()=>getWindow(period,anchor),[period,anchor]);

  useEffect(()=>{
    let cancelled=false;
    const run=async()=>{
      setLoading(true);setError('');setReport(null);
      try{
        const generated=await supabase.rpc('generate_recurring_payables');
        if(generated.error)throw generated.error;
        const [invoices,expenses,payments,payables,appointments,clients]=await Promise.all([
          allRows(supabase.from('invoices').select('id,invoice_number,invoice_date,total,payment_method').gte('invoice_date',range.start).lte('invoice_date',range.end).order('invoice_date')),
          allRows(supabase.from('expenses').select('id,expense_date,title,category,amount').gte('expense_date',range.start).lte('expense_date',range.end).order('expense_date')),
          allRows(supabase.from('payable_payments').select('id,payment_date,payable_id,amount,method').gte('payment_date',range.start).lte('payment_date',range.end).order('payment_date')),
          allRows(supabase.from('payables').select('id,title,category,total_amount,due_date,bill_date').order('bill_date')),
          allRows(supabase.from('appointments').select('id,appointment_date,status,final_price').gte('appointment_date',range.start).lte('appointment_date',range.end)),
          allRows(supabase.from('clients').select('id,created_at').gte('created_at',range.start+'T00:00:00+05:00').lte('created_at',range.end+'T23:59:59.999+05:00'))
        ]);
        const allPayments=await allRows(supabase.from('payable_payments').select('payable_id,amount'));
        if(!cancelled)setReport({invoices,expenses,payments,payables,appointments,clients,allPayments});
      }catch(e){if(!cancelled)setError(e.message||String(e));}
      finally{if(!cancelled)setLoading(false);}
    };
    run();return()=>{cancelled=true;};
  },[range.start,range.end,refresh]);

  const stats=useMemo(()=>{
    if(!report)return null;
    const {invoices,expenses,payments,payables,appointments,clients,allPayments}=report;
    const sales=invoices.reduce((s,i)=>s+Number(i.total||0),0);
    const direct=expenses.reduce((s,i)=>s+Number(i.amount||0),0);
    const payablePaid=payments.reduce((s,i)=>s+Number(i.amount||0),0);
    const paidById={};allPayments.forEach(p=>{paidById[p.payable_id]=(paidById[p.payable_id]||0)+Number(p.amount||0);});
    const outstanding=payables.reduce((s,p)=>s+Math.max(0,Number(p.total_amount)-(paidById[p.id]||0)),0);
    const overdue=payables.filter(p=>p.due_date&&p.due_date<localDate(new Date())).reduce((s,p)=>s+Math.max(0,Number(p.total_amount)-(paidById[p.id]||0)),0);
    const category={};
    expenses.forEach(e=>{category[e.category||'Other']=(category[e.category||'Other']||0)+Number(e.amount||0);});
    payments.forEach(p=>{
      const bill=payables.find(x=>x.id===p.payable_id);
      const cat=bill?.category||'Payables';
      category[cat]=(category[cat]||0)+Number(p.amount||0);
    });
    const byDate={};
    invoices.forEach(i=>{const date=i.invoice_date;(byDate[date] ||= {date,sales:0,costs:0}).sales+=Number(i.total||0);});
    expenses.forEach(e=>{const date=e.expense_date;(byDate[date] ||= {date,sales:0,costs:0}).costs+=Number(e.amount||0);});
    payments.forEach(p=>{const date=p.payment_date;(byDate[date] ||= {date,sales:0,costs:0}).costs+=Number(p.amount||0);});
    let timeline=Object.values(byDate).sort((a,b)=>a.date.localeCompare(b.date));
    if(period==='year'){
      const months={};timeline.forEach(x=>{const key=x.date.slice(0,7);(months[key] ||= {date:key,sales:0,costs:0}).sales+=x.sales;months[key].costs+=x.costs;});
      timeline=Object.values(months).sort((a,b)=>a.date.localeCompare(b.date));
    }
    return {sales,direct,payablePaid,outflows:direct+payablePaid,outstanding,overdue,category,timeline,
      bookings:appointments.length,completed:appointments.filter(a=>a.status==='completed').length,
      newClients:clients.length,invoices:invoices.length};
  },[report,period]);


  const parseFunctionError=async error=>{
    try{const payload=await error.context?.json?.();if(payload?.error)return payload.error;}catch{}
    return error?.message||'The report service could not complete this request.';
  };
  const reportPayload={period,start:range.start,end:range.end};

  const download=async()=>{
    if(loading||reportBusy||!report)return;
    setReportMessage('');setReportBusy(true);
    try{
      const {data,error:err}=await supabase.functions.invoke('business-report',{
        body:{action:'download',...reportPayload}
      });
      if(err)throw new Error(await parseFunctionError(err));
      const blob=data instanceof Blob?data:new Blob([data],{type:'application/pdf'});
      if(blob.type.includes('json')){
        const payload=JSON.parse(await blob.text());throw new Error(payload?.error||'Could not create the PDF.');
      }
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');
      a.href=url;a.download='Gloss-Studio-'+period+'-'+range.start+'-'+range.end+'.pdf';
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),5000);
      setReportMessage('PDF report downloaded.');
    }catch(e){setReportMessage(e.message||'Could not download the report.');}
    finally{setReportBusy(false);}
  };

  const sendReport=async e=>{
    e.preventDefault();
    if(loading||reportBusy||!report)return;
    setReportBusy(true);setReportMessage('');
    try{
      const {data,error:err}=await supabase.functions.invoke('business-report',{
        body:{action:'send',...reportPayload,channel:sendChannel,recipient:sendTo.trim(),
          consent:sendChannel==='whatsapp'?whatsappConsent:undefined}
      });
      if(err)throw new Error(await parseFunctionError(err));
      if(data?.error)throw new Error(data.error);
      setSendOpen(false);
      setReportMessage(data?.message||'Report has been accepted for delivery.');
      setSendTo('');setWhatsappConsent(false);
    }catch(e){setReportMessage(e.message||'Report could not be sent.');}
    finally{setReportBusy(false);}
  };

  return <div className="space-y-5 min-w-0">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div><h2 className="font-serif-luxury text-2xl font-bold">Business Reports</h2><p className="text-xs text-[#6B7280] mt-1">Invoice sales, bookings, operating expenses, payable payments and outstanding bills.</p></div>
        <div className="flex flex-wrap gap-2">
          <button onClick={()=>setRefresh(n=>n+1)} disabled={loading} className="px-3 py-2 border rounded-xl text-xs flex gap-1 items-center"><RefreshCw size={14}/>Refresh</button>
          <button onClick={download} disabled={!report||loading||reportBusy} className="gold-gradient-bg text-white px-3 py-2 rounded-xl text-xs font-bold flex gap-1 items-center disabled:opacity-50"><Download size={14}/>{reportBusy?'Preparing...':'Download Report'}</button>
          <button onClick={()=>{setReportMessage('');setSendOpen(true);}} disabled={!report||loading||reportBusy} className="px-3 py-2 border border-[#C5A059] text-[#946F2E] rounded-xl text-xs font-bold flex gap-1 items-center disabled:opacity-50"><Send size={14}/>Send Report</button>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-5">
        {['day','week','month','year'].map(x=><button key={x} onClick={()=>setPeriod(x)} className={'capitalize px-3 py-2 rounded-xl text-xs font-semibold border '+(period===x?'bg-[#C5A059] border-[#C5A059] text-white':'border-[#E8DFD1]')}>{x==='day'?'Daily':x==='week'?'Weekly':x==='month'?'Monthly':'Yearly'}</button>)}
        <div className="flex gap-2 items-center flex-wrap sm:ml-auto">
          <button aria-label="Previous period" onClick={()=>setAnchor(moveAnchor(period,anchor,-1))} className="p-2 border rounded-xl"><ArrowLeft size={15}/></button>
          <input type="date" value={anchor} onChange={e=>e.target.value&&setAnchor(e.target.value)} className="px-2 py-1.5 border rounded-xl text-xs"/>
          <button aria-label="Next period" onClick={()=>setAnchor(moveAnchor(period,anchor,1))} className="p-2 border rounded-xl"><ArrowRight size={15}/></button>
        </div>
      </div>
      <h3 className="font-serif-luxury text-xl font-bold mt-4">{range.label}</h3>
    </div>
    {error&&<div role="alert" className="text-rose-700 bg-rose-50 p-3 rounded-xl text-sm">{error}</div>}
    {reportMessage&&<div role="status" className="text-sm border border-[#E8DFD1] bg-white rounded-xl p-3">{reportMessage}</div>}
    {loading&&<div className="text-sm text-[#6B7280]">Loading report data...</div>}
    {stats&&!loading&&<>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[['Invoiced Sales',money(stats.sales)],['Recorded Cash Outflows',money(stats.outflows)],['Invoices',stats.invoices],['Appointments',stats.bookings],['Completed Treatments',stats.completed],['New Customers',stats.newClients],['Unpaid Bills (All Dates)',money(stats.outstanding)],['Overdue (All Dates)',money(stats.overdue)]].map(([label,value])=>
          <div key={label} className="bg-white border border-[#E8DFD1] rounded-2xl p-4 min-w-0"><div className="text-xs text-[#6B7280]">{label}</div><div className="text-lg sm:text-xl font-bold mt-2 break-words">{value}</div></div>)}
      </div>
      <p className="text-xs text-[#6B7280] leading-relaxed px-1">Invoiced sales reflect issued invoices, not verified receipts or accounting profit. Cash outflows include daily expenses plus payments recorded against bills; unpaid bills are shown separately and are not counted as paid expenses. Outstanding and overdue figures cover all dates.</p>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5">
          <h3 className="font-serif-luxury text-xl font-bold mb-4">Sales & Outflows</h3>
          {stats.timeline.length===0?<p className="text-sm text-[#6B7280] py-8 text-center">No transactions recorded in this period.</p>:<div className="space-y-3 max-h-[360px] overflow-y-auto">
            {stats.timeline.map(t=>{const max=Math.max(...stats.timeline.flatMap(x=>[x.sales,x.costs]),1);return <div key={t.date}><div className="text-xs text-[#6B7280] mb-1">{t.date}</div>
              <div className="flex items-center gap-2 text-[10px]"><span className="w-12 shrink-0">Sales</span><div className="flex-1 h-3 bg-[#FAF7F2] rounded-full"><div className="h-3 rounded-full bg-[#C5A059]" style={{width:(t.sales/max*100)+'%'}}/></div><span className="w-24 text-right">{money(t.sales)}</span></div>
              <div className="flex items-center gap-2 text-[10px] mt-1"><span className="w-12 shrink-0">Outflows</span><div className="flex-1 h-3 bg-[#FAF7F2] rounded-full"><div className="h-3 rounded-full bg-[#6B7280]" style={{width:(t.costs/max*100)+'%'}}/></div><span className="w-24 text-right">{money(t.costs)}</span></div>
            </div>})}
          </div>}
        </div>
        <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5">
          <h3 className="font-serif-luxury text-xl font-bold mb-4">Cost Breakdown</h3>
          {Object.entries(stats.category).length===0?<p className="text-sm text-[#6B7280] py-8 text-center">No recorded payments in this period.</p>:<div className="space-y-3">
            {Object.entries(stats.category).sort((a,b)=>b[1]-a[1]).map(([name,val])=><div key={name} className="flex items-center justify-between border-b pb-2 text-sm"><span>{name}</span><b>{money(val)}</b></div>)}
            <div className="flex justify-between pt-2 font-bold"><span>Total</span><span>{money(stats.outflows)}</span></div>
          </div>}
        </div>
      </div>
      <div className="bg-white border border-[#E8DFD1] rounded-2xl overflow-hidden">
        <h3 className="font-serif-luxury text-xl font-bold p-4">Period Transactions</h3>
        {stats.invoices+report.expenses.length+report.payments.length===0?<p className="p-8 text-sm text-[#6B7280] text-center">No financial transactions in this period.</p>:
          <div className="overflow-x-auto max-h-[480px]"><table className="w-full min-w-[590px] text-xs"><thead className="sticky top-0 bg-[#FAF7F2]"><tr>{['Date','Type','Description','Amount'].map(x=><th key={x} className="p-3 text-left">{x}</th>)}</tr></thead><tbody>
            {[...report.invoices.map(x=>({id:'i'+x.id,date:x.invoice_date,type:'Invoice',name:x.invoice_number,amount:Number(x.total)})),
              ...report.expenses.map(x=>({id:'e'+x.id,date:x.expense_date,type:'Daily Expense',name:x.title,amount:Number(x.amount)})),
              ...report.payments.map(x=>({id:'p'+x.id,date:x.payment_date,type:'Payable Payment',name:report.payables.find(y=>y.id===x.payable_id)?.title||'Payment',amount:Number(x.amount)}))]
              .sort((a,b)=>b.date.localeCompare(a.date)).map(t=><tr key={t.id} className="border-t"><td className="p-3">{t.date}</td><td className="p-3">{t.type}</td><td className="p-3">{t.name}</td><td className="p-3 font-semibold">{money(t.amount)}</td></tr>)}
          </tbody></table></div>}
      </div>
    </>}
    {sendOpen&&<div className="fixed inset-0 z-50 bg-black/45 p-3 flex items-center justify-center">
      <div className="bg-white w-full max-w-md max-h-[94vh] overflow-y-auto rounded-2xl border border-[#E8DFD1] p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between gap-3"><div><h3 className="font-serif-luxury text-xl font-bold">Send PDF Report</h3><p className="text-xs text-[#6B7280] mt-1">{range.label} · Confidential management report</p></div><button type="button" aria-label="Close" onClick={()=>setSendOpen(false)}><X size={19}/></button></div>
        <form onSubmit={sendReport} className="space-y-4 text-sm">
          <div><label className="font-bold text-xs">Delivery channel</label><div className="grid grid-cols-2 gap-2 mt-2">
            <button type="button" onClick={()=>{setSendChannel('email');setSendTo('');setWhatsappConsent(false);}} className={'rounded-xl border p-3 flex justify-center gap-2 items-center text-xs '+(sendChannel==='email'?'border-[#C5A059] bg-[#FAF7F2] font-bold':'border-[#E8DFD1]')}><Mail size={15}/>Email</button>
            <button type="button" onClick={()=>{setSendChannel('whatsapp');setSendTo('');}} className={'rounded-xl border p-3 flex justify-center gap-2 items-center text-xs '+(sendChannel==='whatsapp'?'border-[#C5A059] bg-[#FAF7F2] font-bold':'border-[#E8DFD1]')}><MessageCircle size={15}/>WhatsApp</button>
          </div></div>
          <div><label className="font-bold text-xs">{sendChannel==='email'?'Recipient email address':'WhatsApp number (international format)'}</label>
            <input required type={sendChannel==='email'?'email':'tel'} placeholder={sendChannel==='email'?'manager@example.com':'+923001234567'}
              pattern={sendChannel==='whatsapp'?'\\+?[1-9][0-9]{7,14}':undefined}
              value={sendTo} onChange={e=>setSendTo(e.target.value)} className="w-full mt-1 p-3 rounded-xl border border-[#E8DFD1] bg-[#FAF7F2]"/>
          </div>
          {sendChannel==='whatsapp'&&<label className="flex gap-2 text-xs leading-relaxed text-[#6B7280]"><input required type="checkbox" checked={whatsappConsent} onChange={e=>setWhatsappConsent(e.target.checked)} className="self-start mt-0.5"/>I confirm the recipient has agreed to receive this report via WhatsApp.</label>}
          <p className="text-xs text-[#6B7280] leading-relaxed">{sendChannel==='email'?'A PDF copy will be attached to a secure business email once the sender domain and email service are configured.':'The PDF is delivered using an approved WhatsApp Business document template once your official WhatsApp integration is configured.'}</p>
          <div className="flex gap-2 justify-end"><button type="button" onClick={()=>setSendOpen(false)} className="px-4 py-2.5 rounded-xl border border-[#E8DFD1]">Cancel</button><button disabled={reportBusy} className="gold-gradient-bg text-white px-5 py-2.5 rounded-xl font-bold disabled:opacity-50">{reportBusy?'Sending...':'Send PDF'}</button></div>
        </form>
      </div>
    </div>}
  </div>;
}
