import React, { useState } from 'react';
import { LockKeyhole, Mail, ShieldCheck, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Login({ onLogin }) {
  const [mode,setMode]=useState('signin');
  const [fullName,setFullName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

  const signIn=async(e)=>{
    e.preventDefault();
    setLoading(true); setError('');
    const { data,error:authError }=await supabase.auth.signInWithPassword({email:email.trim(),password});
    if(authError){ setError(authError.message); setLoading(false); return; }
    const { data:profile,error:profileError }=await supabase.from('profiles').select('*').eq('id',data.user.id).single();
    if(profileError||!profile){ setError(profileError?.message||'Profile not found'); await supabase.auth.signOut(); setLoading(false); return; }
    onLogin({...profile,name:profile.full_name});
    setLoading(false);
  };

  const bootstrap=async(e)=>{
    e.preventDefault();
    setLoading(true); setError('');
    const { data,error:fnError }=await supabase.functions.invoke('bootstrap-admin',{
      body:{full_name:fullName.trim(),email:email.trim(),password}
    });
    if(fnError || data?.error){ setError(data?.error || fnError?.message || 'Could not create admin'); setLoading(false); return; }
    const { data:authData,error:authError }=await supabase.auth.signInWithPassword({email:email.trim(),password});
    if(authError){ setError(authError.message); setLoading(false); return; }
    const { data:profile,error:profileError }=await supabase.from('profiles').select('*').eq('id',authData.user.id).single();
    if(profileError||!profile){ setError(profileError?.message||'Profile not found'); setLoading(false); return; }
    onLogin({...profile,name:profile.full_name});
    setLoading(false);
  };

  return <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-white border border-[#E8DFD1] rounded-3xl shadow-xl p-8">
      <div className="text-center mb-7">
        <img src="/logo.jpg" alt="Gloss Studio" className="w-20 h-20 object-contain mx-auto rounded-2xl border border-[#E8DFD1] mb-4"/>
        <h1 className="font-serif-luxury text-3xl font-bold">Gloss Studio CRM</h1>
        <p className="text-xs text-[#6B7280] mt-2">Secure Supabase authentication with role-based access.</p>
      </div>

      <div className="grid grid-cols-2 gap-2 bg-[#FAF7F2] p-1 rounded-xl mb-5 text-xs font-bold">
        <button onClick={()=>setMode('signin')} className={`py-2 rounded-lg ${mode==='signin'?'bg-white text-[#C5A059] shadow-sm':'text-[#6B7280]'}`}>Sign In</button>
        <button onClick={()=>setMode('bootstrap')} className={`py-2 rounded-lg ${mode==='bootstrap'?'bg-white text-[#C5A059] shadow-sm':'text-[#6B7280]'}`}>Initial Admin</button>
      </div>

      <form onSubmit={mode==='signin'?signIn:bootstrap} className="space-y-4">
        {mode==='bootstrap'&&<div><label className="text-xs font-bold">Admin Full Name</label><input required value={fullName} onChange={e=>setFullName(e.target.value)} className="w-full mt-1 px-3 py-3 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl" placeholder="Full name"/></div>}
        <div><label className="text-xs font-bold">Email</label><div className="relative mt-1"><Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full pl-9 pr-3 py-3 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl" placeholder="name@glossstudio.pk"/></div></div>
        <div><label className="text-xs font-bold">Password</label><div className="relative mt-1"><LockKeyhole size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/><input required minLength="8" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full pl-9 pr-3 py-3 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl" placeholder="Password"/></div></div>
        {error&&<div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">{error}</div>}
        <button disabled={loading} className="w-full gold-gradient-bg text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-60">
          {mode==='signin'?<ShieldCheck size={17}/>:<UserPlus size={17}/>}
          {loading?'Please wait...':mode==='signin'?'Sign In':'Create First Admin'}
        </button>
      </form>

      <p className="mt-5 text-[11px] text-[#6B7280] leading-relaxed">
        Use <b>Initial Admin</b> only once, on a new CRM database. After that, the administrator creates Reception and Staff accounts from the CRM.
      </p>
    </div>
  </div>
}
