import React, { useState } from 'react';
import { Plus, UserCheck, ShieldCheck } from 'lucide-react';

export default function StaffManagement({staff,appointments,accounts,onAddStaff}) {
  const [show,setShow]=useState(false);
  const [accountType,setAccountType]=useState('staff');
  const [name,setName]=useState('');
  const [jobTitle,setJobTitle]=useState('Aesthetic Staff');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const submit=async(e)=>{
    e.preventDefault();
    await onAddStaff({
      full_name:name.trim(),
      email:email.trim(),
      password,
      role:accountType,
      job_title:accountType==='staff'?jobTitle.trim():'Reception'
    });
    setName('');setEmail('');setPassword('');setJobTitle('Aesthetic Staff');setAccountType('staff');setShow(false);
  };

  const receptionAccounts=(accounts||[]).filter(a=>a.role==='reception');

  return <div className="space-y-6">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 flex items-center justify-between">
      <div>
        <h3 className="font-serif-luxury text-2xl font-bold">Staff & Accounts</h3>
        <p className="text-xs text-[#6B7280]">Create secure Supabase login accounts for staff and reception.</p>
      </div>
      <button onClick={()=>setShow(true)} className="gold-gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={15}/>Create Account</button>
    </div>

    {show&&<form onSubmit={submit} className="bg-white border border-[#E8DFD1] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      <div><label className="font-bold">Account Type</label><select value={accountType} onChange={e=>setAccountType(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"><option value="staff">Staff</option><option value="reception">Reception</option></select></div>
      <div><label className="font-bold">Full Name</label><input required value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      {accountType==='staff'&&<div><label className="font-bold">Work Role</label><input required value={jobTitle} onChange={e=>setJobTitle(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl" placeholder="e.g. Aesthetician"/></div>}
      <div><label className="font-bold">Login Email</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div><label className="font-bold">Temporary Password</label><input required minLength="8" type="text" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div className="md:col-span-2 flex justify-end gap-2"><button type="button" onClick={()=>setShow(false)} className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] font-bold">Cancel</button><button className="px-4 py-2 rounded-xl gold-gradient-bg text-white font-bold">Create {accountType==='staff'?'Staff':'Reception'} Account</button></div>
    </form>}

    <div>
      <div className="flex items-center gap-2 mb-3"><UserCheck size={18} className="text-[#C5A059]"/><h4 className="font-serif-luxury text-xl font-bold">Staff Profiles</h4></div>
      {staff.length===0?<div className="bg-white border border-[#E8DFD1] rounded-2xl p-10 text-center text-sm text-[#6B7280]">No staff profiles yet.</div>:
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{staff.map(s=>{const work=appointments.filter(a=>a.staffId===s.id);return <div key={s.id} className="bg-white border border-[#E8DFD1] rounded-2xl p-5"><h4 className="font-serif-luxury text-xl font-bold">{s.name}</h4><div className="text-xs text-[#C5A059] font-bold">{s.role}</div><div className="text-xs text-[#6B7280] mt-1">{s.email||'—'}</div><div className="mt-4 pt-3 border-t border-[#F0ECE1] flex justify-between text-xs"><span>Assigned appointments</span><b>{work.length}</b></div></div>})}</div>}
    </div>

    <div>
      <div className="flex items-center gap-2 mb-3"><ShieldCheck size={18} className="text-[#C5A059]"/><h4 className="font-serif-luxury text-xl font-bold">Reception Accounts</h4></div>
      {receptionAccounts.length===0?<div className="bg-white border border-[#E8DFD1] rounded-2xl p-8 text-center text-sm text-[#6B7280]">No reception accounts yet.</div>:
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{receptionAccounts.map(a=><div key={a.id} className="bg-white border border-[#E8DFD1] rounded-2xl p-5"><div className="font-bold">{a.name}</div><div className="text-xs text-[#6B7280] mt-1">{a.email}</div><div className="text-[10px] uppercase text-[#C5A059] font-bold mt-2">Reception</div></div>)}</div>}
    </div>
  </div>
}
