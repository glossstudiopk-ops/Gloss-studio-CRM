import React, { useState } from 'react';
import { Plus, UserCheck } from 'lucide-react';

export default function StaffManagement({staff,appointments,accounts,onAddStaff}) {
  const [show,setShow]=useState(false);
  const [name,setName]=useState(''); const [role,setRole]=useState('Aesthetic Staff'); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const submit=e=>{
    e.preventDefault();
    if(accounts.some(a=>a.email.toLowerCase()===email.toLowerCase())) return alert('An account with this email already exists.');
    const id=`staff-${Date.now()}`;
    const member={id,name:name.trim(),role,category:'Aesthetic',status:'Active',bio:'',email:email.trim()};
    const account={id:`account-${Date.now()}`,name:name.trim(),email:email.trim(),password,role:'staff',staffId:id};
    onAddStaff(member,account); setName('');setEmail('');setPassword('');setRole('Aesthetic Staff');setShow(false);
  };
  return <div className="space-y-6">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 flex items-center justify-between"><div><h3 className="font-serif-luxury text-2xl font-bold">Staff & Accounts</h3><p className="text-xs text-[#6B7280]">Create staff profiles and their CRM login accounts.</p></div><button onClick={()=>setShow(true)} className="gold-gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={15}/>Add Staff</button></div>
    {show&&<form onSubmit={submit} className="bg-white border border-[#E8DFD1] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      <div><label className="font-bold">Full Name</label><input required value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div><label className="font-bold">Work Role</label><input required value={role} onChange={e=>setRole(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div><label className="font-bold">Login Email</label><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div><label className="font-bold">Temporary Password</label><input required type="text" value={password} onChange={e=>setPassword(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div className="md:col-span-2 flex justify-end gap-2"><button type="button" onClick={()=>setShow(false)} className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] font-bold">Cancel</button><button className="px-4 py-2 rounded-xl gold-gradient-bg text-white font-bold">Create Staff Account</button></div>
    </form>}
    {staff.length===0?<div className="bg-white border border-[#E8DFD1] rounded-2xl p-12 text-center text-sm text-[#6B7280]"><UserCheck className="mx-auto mb-3 text-[#C5A059]"/>No staff profiles yet.</div>:
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{staff.map(s=>{const work=appointments.filter(a=>a.staffId===s.id);return <div key={s.id} className="bg-white border border-[#E8DFD1] rounded-2xl p-5"><h4 className="font-serif-luxury text-xl font-bold">{s.name}</h4><div className="text-xs text-[#C5A059] font-bold">{s.role}</div><div className="text-xs text-[#6B7280] mt-1">{s.email}</div><div className="mt-4 pt-3 border-t border-[#F0ECE1] flex justify-between text-xs"><span>Assigned appointments</span><b>{work.length}</b></div></div>})}</div>}
  </div>
}
