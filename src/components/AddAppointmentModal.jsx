import React, { useEffect, useMemo, useState } from 'react';
import { X, Sparkles, UserRound } from 'lucide-react';
import { getPricingModel, initialPricingSelection } from '../lib/pricing';

export default function AddAppointmentModal({isOpen,onClose,clients,services,staff,onSave,initialData={}}){
  const [name,setName]=useState('');
  const [phone,setPhone]=useState('');
  const [email,setEmail]=useState('');
  const [serviceId,setServiceId]=useState('');
  const [staffId,setStaffId]=useState('');
  const [date,setDate]=useState(new Date().toISOString().slice(0,10));
  const [time,setTime]=useState('10:00');
  const [notes,setNotes]=useState('');
  const [pricing,setPricing]=useState({option:'',quantity:1,unitPrice:null,finalPrice:0,detail:''});
  const [saving,setSaving]=useState(false);
  const [message,setMessage]=useState('');

  useEffect(()=>{
    if(!isOpen) return;
    const c=clients.find(x=>x.id===initialData.clientId);
    setName(c?.name||'');
    setPhone(c?.phone||'');
    setEmail(c?.email||'');
    setServiceId(initialData.serviceId||services[0]?.id||'');
    setStaffId(initialData.staffId||staff[0]?.id||'');
    setDate(initialData.date||new Date().toISOString().slice(0,10));
    setTime(initialData.time||'10:00');
    setNotes('');
    setMessage('');
  },[isOpen,initialData.clientId,initialData.serviceId,initialData.staffId,initialData.date,initialData.time,clients,services,staff]);

  const service=useMemo(()=>services.find(s=>s.id===serviceId),[services,serviceId]);
  const model=useMemo(()=>getPricingModel(service),[service]);

  useEffect(()=>{
    if(service) setPricing(initialPricingSelection(service));
  },[serviceId,service]);

  if(!isOpen) return null;

  const selectOption=(option)=>{
    if(model.type==='variants'){
      const chosen=model.options.find(x=>x.name===option);
      setPricing(p=>({...p,option,detail:option,unitPrice:chosen?.price||0,finalPrice:chosen?.price||0,quantity:1}));
      return;
    }
    if(model.type==='choice'){
      setPricing(p=>({...p,option,detail:option,unitPrice:model.price,finalPrice:model.price,quantity:1}));
      return;
    }
    setPricing(p=>({...p,option,detail:option||p.detail}));
  };

  const setUnits=(value)=>{
    const qty=Math.max(model.min||1,Math.min(model.max||999,Number(value)||model.min||1));
    setPricing(p=>({...p,quantity:qty,unitPrice:model.unitRate,finalPrice:qty*model.unitRate,detail:qty+' units'}));
  };

  const setQuantity=(value)=>{
    const qty=Math.max(1,Number(value)||1);
    setPricing(p=>({...p,quantity:qty,unitPrice:model.unitPrice,finalPrice:qty*model.unitPrice,detail:(p.option?p.option+' · ':'')+qty+' '+model.unit+(qty===1?'':'s')}));
  };

  const submit=async(e)=>{
    e.preventDefault();
    if(!name.trim()||(!phone.trim()&&!email.trim())||!serviceId||!staffId) return;
    setSaving(true); setMessage('');
    const result=await onSave({
      customerName:name.trim(),
      customerPhone:phone.trim(),
      customerEmail:email.trim(),
      serviceId,staffId,date,time,notes,
      price:Number(pricing.finalPrice)||0,
      quantity:Number(pricing.quantity)||1,
      unitPrice:pricing.unitPrice==null?null:Number(pricing.unitPrice),
      pricingDetail:{
        type:model.type,
        option:pricing.option||null,
        detail:pricing.detail||null,
        listedPrice:service?.priceLabel||null,
        quantity:Number(pricing.quantity)||1,
        unitPrice:pricing.unitPrice==null?null:Number(pricing.unitPrice),
        finalPrice:Number(pricing.finalPrice)||0
      }
    });
    setSaving(false);
    if(!result?.ok){setMessage(result?.message||'Could not save booking.');return;}
    setMessage(result.isNewClient?'Booking saved. New customer profile created.':'Booking saved. Visit added to existing customer profile.');
    setTimeout(onClose,700);
  };

  return <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3 sm:p-4">
    <div className="bg-white rounded-2xl border border-[#E8DFD1] w-full max-w-xl p-4 sm:p-6 shadow-2xl max-h-[94vh] overflow-y-auto">
      <div className="flex items-start justify-between gap-3 border-b border-[#F0ECE1] pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2"><Sparkles size={18} className="text-[#C5A059]"/><h3 className="font-serif-luxury text-xl font-bold">New Booking</h3></div>
          <p className="text-[11px] text-[#6B7280] mt-1">Enter customer and service details. Existing customers are matched automatically.</p>
        </div>
        <button onClick={onClose} className="shrink-0"><X size={18}/></button>
      </div>

      {staff.length===0?
        <div className="text-sm text-[#6B7280] bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl p-5">Admin must add at least one staff member before bookings can be assigned.</div>
        :
        <form onSubmit={submit} className="space-y-4 text-xs">
          <div className="p-4 bg-[#FAF7F2] border border-[#E8DFD1] rounded-2xl space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold"><UserRound size={15} className="text-[#C5A059]"/>Customer Information</div>
            <div><label className="font-bold">Customer Name *</label><input required value={name} onChange={e=>setName(e.target.value)} className="w-full mt-1 p-2.5 bg-white border border-[#E8DFD1] rounded-xl"/></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><label className="font-bold">Phone</label><input value={phone} onChange={e=>setPhone(e.target.value)} className="w-full mt-1 p-2.5 bg-white border border-[#E8DFD1] rounded-xl" placeholder="03xx xxxxxxx"/></div>
              <div><label className="font-bold">Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full mt-1 p-2.5 bg-white border border-[#E8DFD1] rounded-xl" placeholder="Optional"/></div>
            </div>
          </div>

          <div><label className="font-bold">Treatment *</label><select required value={serviceId} onChange={e=>setServiceId(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">{services.map(s=><option key={s.id} value={s.id}>{s.subcategory} — {s.name} — {s.priceLabel}</option>)}</select></div>

          {(model.type==='choice'||model.type==='variants'||(model.nameOptions&&model.nameOptions.length>1))&&<div>
            <label className="font-bold">Treatment Option *</label>
            <select required value={pricing.option} onChange={e=>selectOption(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">
              {(model.type==='variants'?model.options.map(x=>x.name):(model.options||model.nameOptions||[])).map(option=><option key={option} value={option}>{option}</option>)}
            </select>
          </div>}

          {model.type==='units'&&<div>
            <label className="font-bold">Botox Units *</label>
            <select value={pricing.quantity} onChange={e=>setUnits(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">
              {Array.from({length:(model.max-model.min)+1},(_,i)=>model.min+i).map(n=><option key={n} value={n}>{n} units — Rs. {(n*model.unitRate).toLocaleString()}</option>)}
            </select>
            <p className="text-[10px] text-[#6B7280] mt-1">Flat rate: Rs. {model.unitRate.toLocaleString()} per unit.</p>
          </div>}

          {model.type==='quantity'&&<div>
            <label className="font-bold">Quantity ({model.unit}) *</label>
            <input type="number" min="1" step={model.unit==='ml'?'0.5':'1'} value={pricing.quantity} onChange={e=>setQuantity(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/>
          </div>}

          {model.type==='range'&&<div>
            <label className="font-bold">Actual Price (Rs.) *</label>
            <input required type="number" min={model.min} max={model.max} value={pricing.finalPrice} onChange={e=>setPricing(p=>({...p,finalPrice:Number(e.target.value)||0,unitPrice:null,detail:(p.option?p.option+' · ':'')+'Actual price'}))} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/>
            <p className="text-[10px] text-[#6B7280] mt-1">Listed range: Rs. {model.min.toLocaleString()} – Rs. {model.max.toLocaleString()}.</p>
          </div>}

          <div><label className="font-bold">Assigned Staff *</label><select required value={staffId} onChange={e=>setStaffId(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">{staff.map(s=><option key={s.id} value={s.id}>{s.name} — {s.role}</option>)}</select></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="font-bold">Date *</label><input required type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
            <div><label className="font-bold">Time *</label><input required type="time" value={time} onChange={e=>setTime(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
          </div>

          <div className="p-4 rounded-xl border border-[#E8DFD1] bg-[#FAF7F2] flex items-center justify-between gap-4">
            <div><div className="text-[10px] uppercase tracking-wider text-[#6B7280] font-bold">Actual Amount</div><div className="text-[11px] text-[#6B7280] mt-1">{pricing.detail||service?.priceLabel}</div></div>
            <div className="font-serif-luxury text-2xl font-bold whitespace-nowrap">Rs. {Number(pricing.finalPrice||0).toLocaleString()}</div>
          </div>

          <div><label className="font-bold">Notes</label><textarea rows="2" value={notes} onChange={e=>setNotes(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
          {message&&<div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] text-[#6B7280]">{message}</div>}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2"><button type="button" onClick={onClose} className="px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] font-bold">Cancel</button><button disabled={saving} className="px-4 py-2.5 rounded-xl gold-gradient-bg text-white font-bold disabled:opacity-60">{saving?'Saving...':'Save Booking'}</button></div>
        </form>
      }
    </div>
  </div>
}
