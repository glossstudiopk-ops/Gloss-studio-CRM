import React, { useState } from 'react';
import { X, UserPlus, Crown } from 'lucide-react';

export default function AddClientModal({isOpen,onClose,onSave,staff=[]}) {
  const [name,setName]=useState(''); const [phone,setPhone]=useState(''); const [email,setEmail]=useState('');
  const [isVip,setIsVip]=useState(false); const [preferredStaff,setPreferredStaff]=useState(''); const [note,setNote]=useState('');
  if(!isOpen) return null;
  const submit=e=>{
    e.preventDefault();
    onSave({
      id:`client-${Date.now()}`,name:name.trim(),phone:phone.trim(),email:email.trim(),isVip,
      lastVisit:'',totalSpent:0,preferredCategory:'Aesthetic',preferredStaff,
      notes: note.trim()?[{id:`note-${Date.now()}`,date:new Date().toISOString().slice(0,10),author:'Reception',text:note.trim()}]:[],
      history:[]
    });
    setName('');setPhone('');setEmail('');setIsVip(false);setPreferredStaff('');setNote('');onClose();
  };
  return <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4"><div className="bg-white rounded-2xl border border-[#E8DFD1] max-w-lg w-full p-6 shadow-2xl">
    <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3 mb-4"><div className="flex items-center gap-2"><UserPlus size={18} className="text-[#C5A059]"/><h3 className="font-serif-luxury text-xl font-bold">New Customer</h3></div><button onClick={onClose}><X size={18}/></button></div>
    <form onSubmit={submit} className="space-y-4 text-xs">
      <div><label className="font-bold">Full Name *</label><input required value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><div><label className="font-bold">Phone</label><input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div><div><label className="font-bold">Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div></div>
      <div><label className="font-bold">Preferred Staff</label><select value={preferredStaff} onChange={e=>setPreferredStaff(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"><option value="">Not assigned</option>{staff.map(s=><option key={s.id} value={s.name}>{s.name} — {s.role}</option>)}</select></div>
      <div><label className="font-bold">Notes / Allergies</label><textarea rows="3" value={note} onChange={e=>setNote(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <label className="flex items-center gap-2 font-bold"><input type="checkbox" checked={isVip} onChange={e=>setIsVip(e.target.checked)}/><Crown size={14} className="text-[#C5A059]"/>VIP Customer</label>
      <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] font-bold">Cancel</button><button className="px-4 py-2 rounded-xl gold-gradient-bg text-white font-bold">Save Customer</button></div>
    </form>
  </div></div>
}
