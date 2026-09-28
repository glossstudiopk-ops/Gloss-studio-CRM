import React from 'react';
import { CalendarDays, Plus } from 'lucide-react';

export default function AppointmentsCalendar({appointments,staff,clients,onOpenAddAppointment}) {
  return <div className="space-y-6">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 flex items-center justify-between">
      <div><h3 className="font-serif-luxury text-2xl font-bold">Appointments</h3><p className="text-xs text-[#6B7280]">Reception and admin can create and review customer bookings.</p></div>
      <button onClick={()=>onOpenAddAppointment()} className="gold-gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={15}/>New Booking</button>
    </div>
    {staff.length===0&&<div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-4 text-xs">No staff profiles exist yet. An administrator should add staff before assigning appointments.</div>}
    <div className="bg-white border border-[#E8DFD1] rounded-2xl overflow-hidden">
      {appointments.length===0?<div className="p-12 text-center text-sm text-[#6B7280]"><CalendarDays className="mx-auto mb-3 text-[#C5A059]"/>No appointments have been entered yet.</div>:
      <div className="overflow-x-auto"><table className="w-full text-xs"><thead className="bg-[#FAF7F2]"><tr><th className="p-3 text-left">Date</th><th className="p-3 text-left">Time</th><th className="p-3 text-left">Customer</th><th className="p-3 text-left">Treatment</th><th className="p-3 text-left">Staff</th><th className="p-3 text-left">Status</th><th className="p-3 text-right">Price</th></tr></thead><tbody>{appointments.map(a=><tr key={a.id} className="border-t border-[#F0ECE1]"><td className="p-3 font-bold">{a.date}</td><td className="p-3">{a.time}</td><td className="p-3">{a.clientName}</td><td className="p-3"><div className="font-semibold">{a.serviceName}</div>{a.pricingDetail?.detail&&<div className="text-[10px] text-[#C5A059] mt-0.5">{a.pricingDetail.detail}</div>}</td><td className="p-3">{a.staffName}</td><td className="p-3"><span className="px-2 py-1 bg-[#F7F3EC] text-[#C5A059] rounded-lg font-bold">{a.status}</span></td><td className="p-3 text-right font-bold">Rs. {Number(a.price||0).toLocaleString()}</td></tr>)}</tbody></table></div>}
    </div>
  </div>
}
