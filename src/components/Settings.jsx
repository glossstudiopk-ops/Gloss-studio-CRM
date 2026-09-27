import React, { useEffect, useState } from 'react';
import { Store, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Settings() {
  const [salonName,setSalonName]=useState('Gloss Studio');
  const [phone,setPhone]=useState('');
  const [address,setAddress]=useState('');
  const [saved,setSaved]=useState(false);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    (async()=>{
      const {data}=await supabase.from('business_settings').select('*').eq('id',true).single();
      if(data){setSalonName(data.salon_name||'Gloss Studio');setPhone(data.phone||'');setAddress(data.address||'');}
      setLoading(false);
    })();
  },[]);

  const submit=async(e)=>{
    e.preventDefault();
    const {data:{user}}=await supabase.auth.getUser();
    const {error}=await supabase.from('business_settings').update({
      salon_name:salonName,phone:phone||null,address:address||null,updated_by:user?.id||null,updated_at:new Date().toISOString()
    }).eq('id',true);
    if(error) return alert(error.message);
    setSaved(true);setTimeout(()=>setSaved(false),2000);
  };

  if(loading) return <div className="text-sm text-[#6B7280]">Loading settings...</div>;

  return <div className="max-w-3xl"><div className="bg-white border border-[#E8DFD1] rounded-2xl p-6">
    <div className="flex items-center gap-3 border-b border-[#F0ECE1] pb-4 mb-5"><Store className="text-[#C5A059]"/><div><h3 className="font-serif-luxury text-xl font-bold">Business Information</h3><p className="text-xs text-[#6B7280]">Saved securely in the Gloss Studio Supabase database.</p></div></div>
    {saved&&<div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2"><CheckCircle size={15}/>Settings saved.</div>}
    <form onSubmit={submit} className="space-y-4 text-xs">
      <div><label className="font-bold">Business Name</label><input value={salonName} onChange={e=>setSalonName(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div><label className="font-bold">Phone</label><input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div><label className="font-bold">Address</label><input value={address} onChange={e=>setAddress(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div className="flex justify-end"><button className="gold-gradient-bg text-white px-5 py-2.5 rounded-xl font-bold">Save Settings</button></div>
    </form>
  </div></div>
}
