import React, { useEffect, useMemo, useState } from 'react';
import { X, Sparkles, UserRound } from 'lucide-react';

export default function AddAppointmentModal({isOpen,onClose,clients,services,staff,onSave,initialData={}}){
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [email,setEmail]=useState('');
  const [serviceId,setServiceId]=useState('');
  const [staffId,setStaffId]=useState('');
  const [date,setDate]=useState(new Date().toISOString().slice(0,10));
  const [time,setTime]=useState('10:00');
  const [price,setPrice]=useState('');
  const [notes,setNotes]=useState('');
  const [saving,setSaving]=useState(false);
  const [message,setMessage]=useState('');

  useEffect(()=>{
    if(!isOpen) return;
    const c=clients.find(x=>x.id===initialData.clientId);
    setName(c?.name||''); setPhone(c?.phone||''); setEmail(c?.email||'');
    setServiceId(initialData.serviceId||services[0]?.id||'');
    setStaffId(initialData.staffId||staff[0]?.id||'');
    setDate(initialData.date||new Date().toISOString().slice(0,10));
    setTime(initialData.time||'10:00'); setNotes(''); setMessage('');
  },[isOpen,initialData.clientId]);

  const service=useMemo(()=>services.find(s=>s.id===serviceId),[services,serviceId]);
  useEffect(()=>{ if(service) setPrice(String(service.price||'')); },[serviceId]);

  if(!isOpen) return null;

  const submit=async(e)=>{
    e.preventDefault();
    if(!name.trim()||(!phone.trim()&&!email.trim())||!serviceId||!staffId) return;
    setSaving(true); setMessage('');
    const result=await onSave({customerName:name.trim(),customerPhone:phone.trim(),customerEmail:email.trim(),serviceId,staffId,date,time,price:Number(price)||0,notes});
    setSaving(false);
    if(!result?.ok){ setMessage(result?.message||'Could not save booking.'); return; }
    setMessage(result.isNewClient?'Booking saved. New customer profile created.':'Booking saved. Visit added to existing customer profile.');
    setTimeout(onClose,700);
  };

  return <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl border border-[#E8DFD1] max-w-xl w-full p-6 shadow-2xl">
      <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3 mb-4">
        <div><div className="flex items-center gap-2"><Sparkles size={18} className="text-[#C5A059]"/><h3 className="font-serif-luxury text-xl font-bold">New Booking</h3></div><p className="text-[11px] text-[#6B7280] mt-1">Enter customer and service details. Existing customers are matched automatically.</p></div>
        <button onClick={onClose}><X size={18}/></button>
      </div>
      {staff.length===0?<div className="text-sm text-[#6B7280] bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl p-5">Admin must add at least one staff member before bookings can be assigned.</div>:
      <form onSubmit={submit} className="space-y-4 text-xs">
        <div className="p-4 bg-[#FAF7F2] border border-[#E8DFD1] rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold"><UserRound size={15} className="text-[#C5A059]"/>Customer Information</div>
          <div><label className="font-bold">Customer Name *</label><input required value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 p-2.5 bg-white border border-[#E8DFD1] rounded-xl"/></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="font-bold">Phone</label><input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full mt-1 p-2.5 bg-white border border-[#E8DFD1] rounded-xl" placeholder="03xx xxxxxxx"/></div>
            <div><label className="font-bold">Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 p-2.5 bg-white border border-[#E8DFD1] rounded-xl" placeholder="Optional"/></div>
          </div>
          <p className="text-[10px] text-[#6B7280]">Phone is checked first, then email. A new customer is created only when no existing match is found.</p>
        </div>
        <div><label className="font-bold">Treatment *</label><select required value={serviceId} onChange={e=>setServiceId(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">{services.map(s=><option key={s.id} value={s.id}>{s.subcategory} — {s.name} — {s.priceLabel}</option>)}</select></div>
        <div><label className="font-bold">Assigned Staff *</label><select required value={staffId} onChange={e=>setStaffId(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">{staff.map(s=><option key={s.id} value={s.id}>{s.name} — {s.role}</option>)}</select></div>
        <div className="grid grid-cols-2 gap-3"><div><label className="font-bold">Date *</label><input required type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div><div><label className="font-bold">Time *</label><input required type="time" value={time} onChange={e=>setTime(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div></div>
        <div><label className="font-bold">Booking Price (Rs.)</label><input type="number" min="0" value={price} onChange={e=>setPrice(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
        {service?.unitRate&&<div className="p-3 bg-[#F7F3EC] border border-[#E8DFD1] rounded-xl"><b>Botox:</b> {service.units} at Rs. {service.unitRate.toLocaleString()} per unit.</div>}
        <div><label className="font-bold">Notes</label><textarea rows="2" value={notes} onChange={e=>setNotes(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
        {message&&<div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] text-[#6B7280]">{message}</div>}
        <div className="flex justify-end gap-2"><button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] font-bold">Cancel</button><button disabled={saving} className="px-4 py-2 rounded-xl gold-gradient-bg text-white font-bold disabled:opacity-60">{saving?'Saving...':'Save Booking'}</button></div>
      </form>}
    </div>
  </div>
}