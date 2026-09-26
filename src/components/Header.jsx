import React from 'react';
import { Search, Plus, Calendar } from 'lucide-react';

export default function Header({searchQuery,setSearchQuery,onOpenAddAppointment,activeTabTitle,role}) {
  const date=new Date().toLocaleDateString('en-PK',{weekday:'long',year:'numeric',month:'short',day:'numeric'});
  return <header className="h-16 bg-white border-b border-[#E8DFD1] px-6 flex items-center justify-between sticky top-0 z-20">
    <div className="flex items-center gap-6"><h2 className="font-serif-luxury text-xl font-bold">{activeTabTitle}</h2>{role!=='staff'&&<div className="relative w-72 hidden md:block"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/><input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search customers..." className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:outline-none focus:border-[#C5A059]"/></div>}</div>
    <div className="flex items-center gap-3"><div className="hidden lg:flex items-center gap-2 bg-[#FAF7F2] border border-[#E8DFD1] px-3 py-1.5 rounded-xl text-xs text-[#6B7280]"><Calendar size={14} className="text-[#C5A059]"/>{date}</div>{(role==='admin'||role==='reception')&&<button onClick={onOpenAddAppointment} className="gold-gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"><Plus size={16}/>Book Appointment</button>}</div>
  </header>
}
