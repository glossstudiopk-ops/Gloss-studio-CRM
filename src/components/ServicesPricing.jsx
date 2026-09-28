import React, { useState } from 'react';
import { Sparkles, Clock, Plus, Search, Pencil, Trash2 } from 'lucide-react';

const emptyService={
  id:null,
  name:'',
  category:'Aesthetic',
  subcategory:'',
  duration:'',
  price:0,
  priceLabel:'',
  unitRate:'',
  units:'',
  description:''
};

export default function ServicesPricing({services,onAddService,onUpdateService,onRemoveService,canEdit=false}){
  const [searchQuery,setSearchQuery]=useState('');
  const [showModal,setShowModal]=useState(false);
  const [editing,setEditing]=useState(false);
  const [form,setForm]=useState(emptyService);
  const [saving,setSaving]=useState(false);
  const [message,setMessage]=useState('');

  const filtered=services.filter(s=>{
    const q=searchQuery.toLowerCase();
    return !q || [s.name,s.subcategory,s.description,s.priceLabel].filter(Boolean).some(v=>String(v).toLowerCase().includes(q));
  });

  const openAdd=()=>{
    setEditing(false);
    setForm({...emptyService});
    setMessage('');
    setShowModal(true);
  };

  const openEdit=(service)=>{
    setEditing(true);
    setForm({
      id:service.id,
      name:service.name||'',
      category:'Aesthetic',
      subcategory:service.subcategory||'',
      duration:service.duration||'',
      price:service.price||0,
      priceLabel:service.priceLabel||'',
      unitRate:service.unitRate||'',
      units:service.units||'',
      description:service.description||''
    });
    setMessage('');
    setShowModal(true);
  };

  const submit=async(e)=>{
    e.preventDefault();
    setSaving(true); setMessage('');
    const payload={
      ...form,
      duration:form.duration ? Number(form.duration) : null,
      price:Number(form.price||0),
      unitRate:form.unitRate ? Number(form.unitRate) : null
    };
    const result=editing ? await onUpdateService(payload) : await onAddService(payload);
    setSaving(false);
    if(!result?.ok){setMessage(result?.message||'Could not save service.');return;}
    setShowModal(false);
  };

  const remove=async(service)=>{
    if(!window.confirm('Remove "'+service.name+'" from the CRM and public menu?')) return;
    const result=await onRemoveService(service.id);
    if(!result?.ok) alert(result?.message||'Could not remove service.');
  };

  return <div className="space-y-6">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h2 className="font-serif-luxury text-2xl font-bold">Services & Pricing</h2>
        <p className="text-xs text-[#6B7280] mt-1">This catalog is the source for the public menu on glossstudiopk.com.</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/>
          <input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search treatments..." className="pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:outline-none focus:border-[#C5A059]"/>
        </div>
        {canEdit&&<button onClick={openAdd} className="gold-gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={15}/>Add Service</button>}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {filtered.map(service=><div key={service.id} className="bg-white border border-[#E8DFD1] rounded-2xl p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#C5A059] font-bold"><Sparkles size={14}/><span>{service.subcategory||'Aesthetic'}</span></div>
            {canEdit&&<div className="flex gap-1"><button onClick={()=>openEdit(service)} className="p-2 rounded-lg hover:bg-[#FAF7F2]" title="Edit"><Pencil size={14}/></button><button onClick={()=>remove(service)} className="p-2 rounded-lg hover:bg-rose-50 text-rose-600" title="Remove"><Trash2 size={14}/></button></div>}
          </div>
          <h3 className="font-serif-luxury text-xl font-bold mt-2">{service.name}</h3>
          {service.description&&<p className="text-xs text-[#6B7280] mt-2 leading-relaxed">{service.description}</p>}
        </div>
        <div className="mt-5 pt-4 border-t border-[#F0ECE1] flex items-end justify-between gap-4">
          <div className="text-xs text-[#6B7280] flex items-center gap-1.5"><Clock size={14} className="text-[#C5A059]"/><span>{service.duration?service.duration+' mins':'Duration not set'}</span></div>
          <div className="text-right">
            <div className="font-serif-luxury text-2xl font-bold">{service.priceLabel||('Rs. '+Number(service.price||0).toLocaleString())}</div>
            {service.unitRate&&<div className="text-[10px] text-[#6B7280] mt-1">Rs. {Number(service.unitRate).toLocaleString()} per unit{service.units?' · '+service.units:''}</div>}
          </div>
        </div>
      </div>)}
    </div>

    {showModal&&canEdit&&<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-[#E8DFD1] max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-[#F0ECE1] pb-3 mb-4"><h3 className="font-serif-luxury text-xl font-bold">{editing?'Edit Service':'Add Service'}</h3><button onClick={()=>setShowModal(false)}>✕</button></div>
        <form onSubmit={submit} className="space-y-3 text-xs">
          <div><label className="font-bold">Service Name *</label><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
          <div><label className="font-bold">Menu Category / Subcategory *</label><input required value={form.subcategory} onChange={e=>setForm({...form,subcategory:e.target.value})} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl" placeholder="e.g. Premium Facials"/></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="font-bold">Base Price (Rs.)</label><input type="number" min="0" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
            <div><label className="font-bold">Duration (mins)</label><input type="number" min="0" value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
          </div>
          <div><label className="font-bold">Public Price Label</label><input value={form.priceLabel} onChange={e=>setForm({...form,priceLabel:e.target.value})} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl" placeholder="e.g. Rs. 20,000 / ml"/></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className="font-bold">Unit Rate (optional)</label><input type="number" min="0" value={form.unitRate} onChange={e=>setForm({...form,unitRate:e.target.value})} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
            <div><label className="font-bold">Units Label</label><input value={form.units} onChange={e=>setForm({...form,units:e.target.value})} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl" placeholder="e.g. 8–10 units"/></div>
          </div>
          <div><label className="font-bold">Description</label><textarea rows="3" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
          {message&&<div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">{message}</div>}
          <div className="flex justify-end gap-2 pt-2"><button type="button" onClick={()=>setShowModal(false)} className="px-4 py-2 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl font-bold">Cancel</button><button disabled={saving} className="px-4 py-2 gold-gradient-bg text-white rounded-xl font-bold disabled:opacity-60">{saving?'Saving...':editing?'Save Changes':'Add Service'}</button></div>
        </form>
      </div>
    </div>}
  </div>
}