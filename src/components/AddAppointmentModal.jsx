import React, { useEffect, useMemo, useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function AddAppointmentModal({isOpen,onClose,clients,services,staff,onSave,initialData={}}) {
  const [clientId,setClientId]=useState('');
  const [serviceId,setServiceId]=useState('');
  const [staffId,setStaffId]=useState('');
  const [time,setTime]=useState('10:00');
  const [date,setDate]=useState(new Date().toISOString().slice(0,10));
  const [status,setStatus]=useState('Upcoming');
  const [price,setPrice]=useState('');
  const [notes,setNotes]=useState('');

  useEffect(()=>{
    if(!isOpen) return;
    setClientId(initialData.clientId || (clients[0] && clients[0].id) || '');
    setServiceId(initialData.serviceId || (services[0] && services[0].id) || '');
    setStaffId(initialData.staffId || (staff[0] && staff[0].id) || '');
    setTime(initialData.time || '10:00');
    setDate(initialData.date || new Date().toISOString().slice(0,10));
  },[isOpen]);

  const service=useMemo(()=>services.find(s=>s.id===serviceId),[services,serviceId]);
  useEffect(()=>{ if(service) setPrice(String(service.price||'')); },[serviceId]);

  if(!isOpen) return null;

  const client=clients.find(c=>c.id===clientId);
  const member=staff.find(s=>s.id===staffId);

  const submit=e=>{
    e.preventDefault();
    if(!client||!service||!member) return;
    onSave({
      id:'apt-'+Date.now(),
      clientId:client.id,clientName:client.name,clientPhone:client.phone||'',
      serviceId:service.id,serviceName:service.name,category:'Aesthetic',
      staffId:member.id,staffName:member.name,time,date,duration:service.duration,
      price:Number(price)||0,status,notes
    });
    onClose();
  };

  return <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl border border-[#E8DFD1] max-w-lg w-full p-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3 mb-4">
        <div className="flex items-center gap-2"><Sparkles size={18} className="text-[#C5A059]"/><h3 className="font-serif-luxury text-xl font-bold">New Appointment</h3></div>
        <button onClick={onClose}><X size={18}/></button>
      </div>
      {clients.length===0||staff.length===0?
        <div className="text-sm text-[#6B7280] bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl p-5">Before creating an appointment, add at least one customer and one staff member.</div>
        :
        <form onSubmit={submit} className="space-y-4 text-xs">
          <div><label className="font-bold">Customer</label><select value={clientId} onChange={e=>setClientId(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">{clients.map(c=><option key={c.id} value={c.id}>{c.name}{c.phone?' — '+c.phone:''}</option>)}</select></div>
          <div><label className="font-bold">Treatment</label><select value={serviceId} onChange={e=>setServiceId(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">{services.map(s=><option key={s.id} value={s.id}>{s.subcategory} — {s.name} — {s.priceLabel}</option>)}</select></div>
          <div><label className="font-bold">Assigned Staff</label><select value={staffId} onChange={e=>setStaffId(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">{staff.map(s=><option key={s.id} value={s.id}>{s.name} — {s.role}</option>)}</select></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="font-bold">Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
            <div><label className="font-bold">Time</label><input type="time" value={time} onChange={e=>setTime(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="font-bold">Final Price (Rs.)</label><input type="number" min="0" value={price} onChange={e=>setPrice(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
            <div><label className="font-bold">Status</label><select value={status} onChange={e=>setStatus(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"><option>Upcoming</option><option>In Progress</option><option>Completed</option><option>Cancelled</option></select></div>
          </div>
          {service&&service.unitRate&&<div className="p-3 bg-[#F7F3EC] border border-[#E8DFD1] rounded-xl"><b>Botox pricing:</b> {service.units} at a flat rate of Rs. {service.unitRate.toLocaleString()} per unit. Adjust the final price according to the actual units used.</div>}
          <div><label className="font-bold">Notes</label><textarea rows="2" value={notes} onChange={e=>setNotes(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
          <div className="flex justify-end gap-2"><button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] font-bold">Cancel</button><button className="px-4 py-2 rounded-xl gold-gradient-bg text-white font-bold">Save Appointment</button></div>
        </form>
      }
    </div>
  </div>
}
