import React, { useState } from 'react';
import { X, Crown, Phone, Mail, Plus, FileText, History, Calendar, UserRound } from 'lucide-react';

export default function ClientProfileDrawer({client,onClose,onAddNote,onOpenAddAppointment}) {
  const [newNoteText,setNewNoteText]=useState('');
  const [activeTab,setActiveTab]=useState('notes');
  if(!client) return null;

  const saveNote=e=>{
    e.preventDefault();
    if(!newNoteText.trim()) return;
    onAddNote(client.id,{
      id:'note-'+Date.now(),
      date:new Date().toISOString().slice(0,10),
      author:'CRM User',
      text:newNoteText.trim()
    });
    setNewNoteText('');
  };

  return <div className="fixed inset-0 z-50 flex justify-end">
    <div onClick={onClose} className="fixed inset-0 bg-black/40"></div>
    <div className="relative w-full max-w-xl bg-white h-full shadow-2xl z-10 flex flex-col border-l border-[#E8DFD1]">
      <div className="p-6 bg-[#FAF7F2] border-b border-[#E8DFD1] flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#F7F3EC] border border-[#E8DFD1] flex items-center justify-center text-[#C5A059]"><UserRound size={26}/></div>
          <div><div className="flex items-center gap-2"><h3 className="font-serif-luxury text-2xl font-bold">{client.name}</h3>{client.isVip&&<Crown size={15} className="text-[#C5A059]"/>}</div><div className="text-xs text-[#6B7280] mt-1 flex flex-wrap gap-3">{client.phone&&<span className="flex items-center gap-1"><Phone size={12}/>{client.phone}</span>}{client.email&&<span className="flex items-center gap-1"><Mail size={12}/>{client.email}</span>}</div></div>
        </div>
        <button onClick={onClose} className="p-2 text-[#9CA3AF]"><X size={20}/></button>
      </div>

      <div className="grid grid-cols-3 border-b border-[#E8DFD1] p-4 text-center text-xs">
        <div><span className="block text-[10px] uppercase text-[#6B7280] font-bold">Total Spent</span><b className="text-base">Rs. {Number(client.totalSpent||0).toLocaleString()}</b></div>
        <div><span className="block text-[10px] uppercase text-[#6B7280] font-bold">Preferred Staff</span><b>{client.preferredStaff||'—'}</b></div>
        <div><span className="block text-[10px] uppercase text-[#6B7280] font-bold">Last Visit</span><b>{client.lastVisit||'—'}</b></div>
      </div>

      <div className="flex border-b border-[#E8DFD1] bg-[#FAF7F2] text-xs font-bold">
        <button onClick={()=>setActiveTab('notes')} className={'flex-1 py-3 '+(activeTab==='notes'?'text-[#C5A059] bg-white':'text-[#6B7280]')}><FileText size={14} className="inline mr-1"/>Notes</button>
        <button onClick={()=>setActiveTab('history')} className={'flex-1 py-3 '+(activeTab==='history'?'text-[#C5A059] bg-white':'text-[#6B7280]')}><History size={14} className="inline mr-1"/>History</button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {activeTab==='notes'&&<div className="space-y-4">
          <form onSubmit={saveNote} className="bg-[#FAF7F2] border border-[#E8DFD1] rounded-2xl p-4"><label className="text-xs font-bold flex items-center gap-1"><Plus size={13}/>Add Note / Allergy Alert</label><textarea value={newNoteText} onChange={e=>setNewNoteText(e.target.value)} rows="3" className="w-full mt-2 p-3 text-xs bg-white border border-[#E8DFD1] rounded-xl" placeholder="Add customer note..."></textarea><div className="flex justify-end mt-2"><button className="gold-gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold">Save Note</button></div></form>
          {(client.notes||[]).length===0?<div className="text-xs text-[#9CA3AF] text-center py-6">No notes recorded yet.</div>:<div className="space-y-2">{client.notes.map(n=><div key={n.id} className="p-3 border border-[#E8DFD1] rounded-xl text-xs"><div className="flex justify-between"><b className="text-[#C5A059]">{n.author}</b><span className="text-[#9CA3AF]">{n.date}</span></div><p className="mt-1">{n.text}</p></div>)}</div>}
        </div>}
        {activeTab==='history'&&((client.history||[]).length===0?<div className="text-xs text-[#9CA3AF] text-center py-6">No bookings or visits recorded yet.</div>:<div className="space-y-2">{client.history.map(h=><div key={h.id} className="p-3 border border-[#E8DFD1] rounded-xl text-xs"><div className="flex justify-between gap-3"><div><b>{h.service}</b>{h.pricingDetail?.detail&&<div className="text-[10px] text-[#C5A059] font-bold mt-0.5">{h.pricingDetail.detail}</div>}<div className="text-[#6B7280] mt-0.5">{h.staff||'—'} · {h.date}{h.time?' · '+h.time:''}</div></div><div className="text-right"><b>Rs. {Number(h.amount||0).toLocaleString()}</b><div className="text-[10px] text-[#C5A059] font-bold mt-1">{h.status||'Booked'}</div></div></div>{h.notes&&<div className="mt-2 pt-2 border-t border-[#F0ECE1] text-[#6B7280]">{h.notes}</div>}</div>)}</div>)}
      </div>

      <div className="p-4 border-t border-[#E8DFD1] bg-[#FAF7F2]"><button onClick={()=>{onClose();onOpenAddAppointment({clientId:client.id});}} className="w-full py-2.5 gold-gradient-bg text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"><Calendar size={15}/>Book Appointment</button></div>
    </div>
  </div>
}
