import React from 'react';
import { Plus, Search, Users, Crown } from 'lucide-react';

export default function ClientDatabase({clients,onSelectClient,onOpenAddClient,searchQuery,setSearchQuery}) {
  const filtered=clients.filter(c=>{
    const q=searchQuery.toLowerCase();
    return (c.name||'').toLowerCase().includes(q)||(c.phone||'').toLowerCase().includes(q)||(c.email||'').toLowerCase().includes(q);
  });
  return <div className="space-y-6">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 flex flex-col md:flex-row gap-4 md:items-center justify-between">
      <div className="relative flex-1 max-w-md"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"/><input value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search customer name, phone or email" className="w-full pl-9 pr-3 py-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl text-xs focus:outline-none focus:border-[#C5A059]"/></div>
      <button onClick={onOpenAddClient} className="gold-gradient-bg text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={15}/>Add Customer</button>
    </div>
    <div className="bg-white border border-[#E8DFD1] rounded-2xl overflow-hidden">
      {filtered.length===0?<div className="p-12 text-center text-sm text-[#6B7280]"><Users className="mx-auto mb-3 text-[#C5A059]"/>No customer records yet. Reception can add the first customer.</div>:
      <div className="overflow-x-auto"><table className="w-full text-xs"><thead className="bg-[#FAF7F2]"><tr><th className="p-3 text-left">Customer</th><th className="p-3 text-left">Phone</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Last Visit</th><th className="p-3 text-right">Total Spent</th></tr></thead><tbody>{filtered.map(c=><tr key={c.id} onClick={()=>onSelectClient(c)} className="border-t border-[#F0ECE1] hover:bg-[#FAF7F2] cursor-pointer"><td className="p-3 font-bold"><span className="flex items-center gap-2">{c.name}{c.isVip&&<Crown size={13} className="text-[#C5A059]"/>}</span></td><td className="p-3">{c.phone||'—'}</td><td className="p-3">{c.email||'—'}</td><td className="p-3">{c.lastVisit||'—'}</td><td className="p-3 text-right font-bold">Rs. {Number(c.totalSpent||0).toLocaleString()}</td></tr>)}</tbody></table></div>}
    </div>
  </div>
}
