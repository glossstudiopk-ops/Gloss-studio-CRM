import React,{useEffect,useState} from 'react';
import { supabase } from '../lib/supabase';
import { RefreshCw, Mail, MessageCircle, ShieldCheck, ExternalLink } from 'lucide-react';

const states={
  not_configured:['Not configured','text-rose-700 bg-rose-50 border-rose-200'],
  configured_not_verified:['Needs verification','text-amber-700 bg-amber-50 border-amber-200'],
  verified:['Provider verified','text-emerald-800 bg-emerald-50 border-emerald-200']
};
export default function MessagingSetup(){
  const [data,setData]=useState(null),[loading,setLoading]=useState(false),[error,setError]=useState('');
  const refresh=async()=>{
    setLoading(true);setError('');
    try{
      const {data:response,error:err}=await supabase.functions.invoke('report-messaging-status',{body:{}});
      if(err){
        let msg=err.message;
        try{const body=await err.context?.json?.();msg=body?.error||msg;}catch{}
        throw new Error(msg);
      }
      if(response?.error)throw new Error(response.error);
      setData(response);
    }catch(e){setError(e.message||'Could not check provider settings.');}
    finally{setLoading(false);}
  };
  useEffect(()=>{refresh();},[]);
  const provider=(name,value,details)=><div className="bg-white border border-[#E8DFD1] rounded-2xl p-4 sm:p-5 min-w-0">
    <div className="flex justify-between flex-wrap items-center gap-2">
      <h3 className="font-serif-luxury font-bold text-xl flex gap-2 items-center">{name==='Email'?<Mail size={20} className="text-[#C5A059]"/>:<MessageCircle size={20} className="text-[#C5A059]"/>}{name}</h3>
      {value&&<span className={'border rounded-full text-xs font-bold px-3 py-1 '+(states[value.status]?.[1]||'')}>{states[value.status]?.[0]||value.status}</span>}
    </div>
    {value?.from&&<p className="text-xs text-[#6B7280] mt-3">Sender: <b>{value.from}</b></p>}
    {value?.detail&&<p className="text-xs text-amber-800 bg-amber-50 p-3 mt-3 rounded-xl">{value.detail}</p>}
    <div className="mt-4 space-y-2 text-sm">{details}</div>
  </div>;
  return <div className="space-y-5 min-w-0">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 flex flex-wrap justify-between items-center gap-3">
      <div><h2 className="font-serif-luxury text-2xl font-bold">Report Messaging Setup</h2><p className="text-xs text-[#6B7280] mt-2">Secure Email and WhatsApp delivery for business PDF reports. No API keys are stored in the browser.</p></div>
      <button disabled={loading} onClick={refresh} className="border border-[#E8DFD1] px-3 py-2 rounded-xl text-xs flex gap-2 items-center"><RefreshCw size={14}/>{loading?'Checking...':'Check connections'}</button>
    </div>
    {error&&<div role="alert" className="p-3 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-sm">{error}</div>}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {provider('Email',data?.email,<><p>Connect a verified business email sender through <a className="text-[#946F2E] underline inline-flex items-center gap-1" href="https://resend.com/domains" target="_blank" rel="noreferrer">Resend Domains <ExternalLink size={12}/></a>.</p>
        <p>Set the server secrets <code>RESEND_API_KEY</code> and <code>REPORT_FROM_EMAIL</code> (for example, reports@your-verified-domain).</p>
        <p className="text-xs text-[#6B7280]">Only a verified sending domain can deliver reports to arbitrary addresses. Use the Send Report dialog to test with your own address.</p></>)}
      {provider('WhatsApp',data?.whatsapp,<><p>Use the official <a href="https://developers.facebook.com/docs/whatsapp/cloud-api/" target="_blank" rel="noreferrer" className="text-[#946F2E] underline inline-flex items-center gap-1">Meta WhatsApp Cloud API <ExternalLink size={12}/></a>.</p>
        <p>Set <code>WA_ACCESS_TOKEN</code>, <code>WA_PHONE_NUMBER_ID</code> and <code>WA_BUSINESS_ACCOUNT_ID</code>.</p>
        <p>Get an approved utility template with a <b>DOCUMENT</b> header, then set <code>WA_REPORT_TEMPLATE_NAME</code> and (if needed) <code>WA_TEMPLATE_LANGUAGE</code>.</p>
        <p className="text-xs text-[#6B7280]">Use recipient international numbers with country code and obtain consent before sending sensitive financial reports.</p></>)}
    </div>
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-4 sm:p-5">
      <h3 className="font-serif-luxury text-xl font-bold flex gap-2 items-center"><ShieldCheck size={20} className="text-[#C5A059]"/>Security & delivery</h3>
      <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">Configure these credentials only in Supabase Dashboard → Edge Functions → Secrets for the Gloss Studio CRM project. Never paste private API keys into GitHub, frontend settings, or this chat. Both channels are restricted to signed-in CRM administrators. A provider-accepted request is not confirmation that a recipient has opened the document.</p>
    </div>
    <div className="bg-white border border-[#E8DFD1] rounded-2xl overflow-hidden">
      <h3 className="font-serif-luxury text-xl font-bold p-4">Recent report sending attempts</h3>
      {!data?.recent?.length?<p className="text-sm text-[#6B7280] px-4 pb-6">No report deliveries recorded yet.</p>:
        <div className="overflow-x-auto"><table className="w-full min-w-[630px] text-xs"><thead className="bg-[#FAF7F2]"><tr>{['Date','Channel','Recipient','Reporting period','Provider status'].map(x=><th key={x} className="text-left p-3">{x}</th>)}</tr></thead><tbody>{data.recent.map(r=><tr key={r.id} className="border-t border-[#F0ECE1]"><td className="p-3">{new Date(r.created_at).toLocaleString('en-PK')}</td><td className="p-3 capitalize">{r.channel}</td><td className="p-3">{r.recipient}</td><td className="p-3 capitalize">{r.period} · {r.period_start} – {r.period_end}</td><td className="p-3 capitalize">{r.status}</td></tr>)}</tbody></table></div>}
    </div>
  </div>;
}
