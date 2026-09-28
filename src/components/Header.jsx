import React from 'react';
import { Search, Plus, Calendar, Menu } from 'lucide-react';

export default function Header({searchQuery,setSearchQuery,onOpenAddAppointment,onToggleSidebar,activeTabTitle,role}) {
  const date=new Date().toLocaleDateString('en-PK',{weekday:'long',year:'numeric',month:'short',day:'numeric'});
  return <header className="min-h-16 bg-white border-b border-[#E8DFD1] px-3 sm:px-6 py-2 flex items-center justify-between gap-3 sticky top-0 z-20">
    <div className="flex items-center gap-3 sm:gap-5 min-w-0">
      <button onClick={onToggleSidebar} className="lg:hidden p-2 rounded-xl border border-[#E8DFD1] bg-[#FAF7F2] shrink-0" aria-label="Open navigation"><Menu size={18}/></button>
      <h2 className="font-serif-luxury text-lg sm:text-xl font-bold truncate">{activeTabTitle}</h2>
      {role!=='staff'&&<div className="relative w-64 hidden md:block"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/><input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search customers..." className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:outline-none focus:border-[#C5A059]"/></div>}
    </div>
    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
      <div className="hidden xl:flex items-center gap-2 bg-[#FAF7F2] border border-[#E8DFD1] px-3 py-1.5 rounded-xl text-xs text-[#6B7280]"><Calendar size={14} className="text-[#C5A059]"/>{date}</div>
      {(role==='admin'||role==='reception')&&<button onClick={onOpenAddAppointment} className="gold-gradient-bg text-white px-3 sm:px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"><Plus size={16}/><span className="hidden sm:inline">Book Appointment</span></button>}
    </div>
  </header>
}
