import React, { useMemo, useState } from 'react';
import { Plus, Receipt } from 'lucide-react';

export default function Expenses({ expenses, onAddExpense, canCreate=true }) {
  const [show,setShow]=useState(false);
  const [title,setTitle]=useState('');
  const [category,setCategory]=useState('General');
  const [amount,setAmount]=useState('');
  const [date,setDate]=useState(new Date().toISOString().slice(0,10));
  const [note,setNote]=useState('');
  const total=useMemo(()=>expenses.reduce((s,e)=>s+Number(e.amount||0),0),[expenses]);

  const submit=e=>{
    e.preventDefault();
    onAddExpense({id:`exp-${Date.now()}`,title,category,amount:Number(amount)||0,date,note,createdAt:new Date().toISOString()});
    setTitle('');setAmount('');setNote('');setDate(new Date().toISOString().slice(0,10));setShow(false);
  };

  return <div className="space-y-6">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 flex items-center justify-between">
      <div><h3 className="font-serif-luxury text-2xl font-bold">Daily Expenses</h3><p className="text-xs text-[#6B7280]">Record and review daily operating expenses.</p></div>
      <div className="flex items-center gap-3"><div className="text-right"><span className="text-[10px] uppercase text-[#6B7280] font-bold">Recorded Total</span><div className="font-bold text-[#C5A059]">Rs. {total.toLocaleString()}</div></div>{canCreate&&<button onClick={()=>setShow(true)} className="gold-gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={15}/>Add Expense</button>}</div>
    </div>
    {show&&<form onSubmit={submit} className="bg-white border border-[#E8DFD1] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      <div><label className="font-bold">Expense</label><input required value={title} onChange={e=>setTitle(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl" placeholder="e.g. Cleaning supplies"/></div>
      <div><label className="font-bold">Category</label><select value={category} onChange={e=>setCategory(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"><option>General</option><option>Supplies</option><option>Utilities</option><option>Maintenance</option><option>Marketing</option><option>Staff</option><option>Other</option></select></div>
      <div><label className="font-bold">Amount (Rs.)</label><input required type="number" min="0" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div><label className="font-bold">Date</label><input required type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div className="md:col-span-2"><label className="font-bold">Note</label><textarea value={note} onChange={e=>setNote(e.target.value)} rows="2" className="w-full mt-1 p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl"/></div>
      <div className="md:col-span-2 flex justify-end gap-2"><button type="button" onClick={()=>setShow(false)} className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] font-bold">Cancel</button><button className="px-4 py-2 rounded-xl gold-gradient-bg text-white font-bold">Save Expense</button></div>
    </form>}
    <div className="bg-white border border-[#E8DFD1] rounded-2xl overflow-hidden">
      {expenses.length===0?<div className="p-10 text-center text-sm text-[#6B7280]"><Receipt className="mx-auto mb-2 text-[#C5A059]"/>No expenses recorded yet.</div>:
      <div className="overflow-x-auto"><table className="w-full text-xs"><thead className="bg-[#FAF7F2]"><tr><th className="text-left p-3">Date</th><th className="text-left p-3">Expense</th><th className="text-left p-3">Category</th><th className="text-left p-3">Note</th><th className="text-right p-3">Amount</th></tr></thead><tbody>{expenses.map(e=><tr key={e.id} className="border-t border-[#F0ECE1]"><td className="p-3">{e.date}</td><td className="p-3 font-bold">{e.title}</td><td className="p-3">{e.category}</td><td className="p-3 text-[#6B7280]">{e.note||'—'}</td><td className="p-3 text-right font-bold">Rs. {e.amount.toLocaleString()}</td></tr>)}</tbody></table></div>}
    </div>
  </div>
}
