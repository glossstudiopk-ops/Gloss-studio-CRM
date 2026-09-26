import React from 'react';
import { CalendarDays, Users, FileText, Receipt, Plus, ArrowRight } from 'lucide-react';

export default function DashboardOverview({kpis,appointments,activities,onOpenAddAppointment,setActiveTab,role}) {
  const cards=[
    ['Today Appointments',kpis.todayAppointments,CalendarDays],
    ['Customers',kpis.totalActiveClients,Users],
    ['Today Revenue',`Rs. ${kpis.todayRevenue.toLocaleString()}`,FileText],
    ['Today Expenses',`Rs. ${kpis.todayExpenses.toLocaleString()}`,Receipt]
  ];
  return <div className="space-y-6">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div><div className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Gloss Studio Operations</div><h2 className="font-serif-luxury text-3xl font-bold mt-1">{role==='admin'?'Administrator Dashboard':'Reception Dashboard'}</h2><p className="text-xs text-[#6B7280] mt-1">Live CRM data only. No sample customers, bookings, invoices or expenses are preloaded.</p></div>
      <button onClick={onOpenAddAppointment} className="gold-gradient-bg text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={16}/>New Booking</button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{cards.map(([label,value,I])=><div key={label} className="bg-white border border-[#E8DFD1] rounded-2xl p-5"><div className="flex justify-between text-xs text-[#6B7280] uppercase font-bold"><span>{label}</span><I size={18} className="text-[#C5A059]"/></div><div className="text-2xl font-bold mt-3">{value}</div></div>)}</div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5"><div className="flex justify-between items-center mb-4"><h3 className="font-serif-luxury text-xl font-bold">Recent Appointments</h3><button onClick={()=>setActiveTab('calendar')} className="text-xs text-[#C5A059] font-bold flex items-center gap-1">View all <ArrowRight size={13}/></button></div>{appointments.length===0?<div className="text-sm text-[#6B7280] py-8 text-center">No appointments yet.</div>:<div className="space-y-2">{appointments.slice(0,5).map(a=><div key={a.id} className="p-3 bg-[#FAF7F2] rounded-xl border border-[#F0ECE1] text-xs flex justify-between"><div><b>{a.clientName}</b><div className="text-[#6B7280]">{a.serviceName}</div></div><div className="text-right"><b>{a.date}</b><div className="text-[#C5A059]">{a.time}</div></div></div>)}</div>}</div>
      <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5"><h3 className="font-serif-luxury text-xl font-bold mb-4">Recent Activity</h3>{activities.length===0?<div className="text-sm text-[#6B7280] py-8 text-center">No activity yet.</div>:<div className="space-y-2">{activities.slice(0,6).map(a=><div key={a.id} className="p-3 bg-[#FAF7F2] rounded-xl border border-[#F0ECE1] text-xs"><div>{a.text}</div><div className="text-[10px] text-[#9CA3AF] mt-1">{a.time}</div></div>)}</div>}</div>
    </div>
  </div>
}
