import React from 'react';
import { CalendarDays, UserRound, BriefcaseBusiness } from 'lucide-react';

export default function StaffPortal({ account, staffMember, appointments }) {
  const mine=appointments.filter(a=>a.staffId===account.staffId || a.staffName===account.name);
  return <div className="space-y-6">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#F7F3EC] text-[#C5A059] flex items-center justify-center"><UserRound size={28}/></div>
        <div><h2 className="font-serif-luxury text-2xl font-bold">{staffMember?.name || account.name}</h2><p className="text-xs text-[#6B7280]">{staffMember?.role || 'Staff Member'} · {account.email}</p></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
        <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFD1]"><span className="text-[10px] uppercase font-bold text-[#6B7280]">Assigned Work</span><div className="text-2xl font-bold mt-1">{mine.length}</div></div>
        <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFD1]"><span className="text-[10px] uppercase font-bold text-[#6B7280]">Status</span><div className="text-sm font-bold mt-2">{staffMember?.status || 'Active'}</div></div>
        <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DFD1]"><span className="text-[10px] uppercase font-bold text-[#6B7280]">Speciality</span><div className="text-sm font-bold mt-2">{staffMember?.category || 'Aesthetic'}</div></div>
      </div>
    </div>
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4"><BriefcaseBusiness size={18} className="text-[#C5A059]"/><h3 className="font-serif-luxury text-xl font-bold">My Work Details</h3></div>
      {mine.length===0?<div className="p-8 text-center text-sm text-[#6B7280]">No appointments have been assigned to your account yet.</div>:
      <div className="space-y-3">{mine.map(a=><div key={a.id} className="p-4 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><div className="font-bold text-sm">{a.clientName}</div><div className="text-xs text-[#6B7280]">{a.serviceName}</div></div><div className="text-xs text-right"><div className="font-bold">{a.date} · {a.time}</div><div className="text-[#C5A059]">{a.status}</div></div></div>)}</div>}
    </div>
  </div>
}
