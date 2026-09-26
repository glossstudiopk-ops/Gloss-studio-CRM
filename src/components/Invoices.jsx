import React, { useMemo, useState } from 'react';
import { FileText, Plus, Printer } from 'lucide-react';

export default function Invoices({ invoices, clients, services, onCreateInvoice, canCreate=true }) {
  const [showForm, setShowForm] = useState(false);
  const [clientId, setClientId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const service = useMemo(()=>services.find(s=>s.id===serviceId),[services,serviceId]);

  const chooseService=(id)=>{
    setServiceId(id);
    const s=services.find(x=>x.id===id);
    const qty=s?.unitRate ? Math.max(1, parseInt(s.units)||1) : 1;
    setQuantity(qty);
    setAmount(s ? String((s.unitRate ? s.unitRate*qty : s.price) || '') : '');
  };

  const create=(e)=>{
    e.preventDefault();
    const client=clients.find(c=>c.id===clientId);
    if(!client || !service || !amount) return;
    onCreateInvoice({
      id: `INV-${Date.now()}`,
      number: `GS-${String(Date.now()).slice(-7)}`,
      date: new Date().toISOString().slice(0,10),
      clientId: client.id,
      clientName: client.name,
      serviceId: service.id,
      serviceName: service.name,
      quantity: Number(quantity)||1,
      amount: Number(amount)||0,
      paymentMethod,
      createdAt: new Date().toISOString()
    });
    setShowForm(false); setClientId(''); setServiceId(''); setQuantity(1); setAmount('');
  };

  const printInvoice=(invoice)=>{
    const html=`<html><head><title>${invoice.number}</title><style>body{font-family:Arial;padding:40px;color:#222}h1{margin:0}.row{display:flex;justify-content:space-between;margin:10px 0}.total{font-size:22px;font-weight:bold;border-top:1px solid #ccc;padding-top:15px;margin-top:25px}</style></head><body><h1>GLOSS STUDIO</h1><p>Aesthetic | Hair | Spa</p><hr/><h2>Invoice ${invoice.number}</h2><div class="row"><span>Date</span><strong>${invoice.date}</strong></div><div class="row"><span>Customer</span><strong>${invoice.clientName}</strong></div><div class="row"><span>Service</span><strong>${invoice.serviceName}</strong></div><div class="row"><span>Quantity / Units</span><strong>${invoice.quantity}</strong></div><div class="row"><span>Payment</span><strong>${invoice.paymentMethod}</strong></div><div class="row total"><span>Total</span><span>Rs. ${invoice.amount.toLocaleString()}</span></div></body></html>`;
    const win=window.open('','_blank','width=800,height=700');
    if(win){ win.document.write(html); win.document.close(); win.focus(); win.print(); }
  };

  return <div className="space-y-6">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 flex items-center justify-between">
      <div><h3 className="font-serif-luxury text-2xl font-bold">Invoices</h3><p className="text-xs text-[#6B7280]">Create customer invoices and print them.</p></div>
      {canCreate && <button onClick={()=>setShowForm(true)} className="gold-gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"><Plus size={15}/>New Invoice</button>}
    </div>

    {showForm && <form onSubmit={create} className="bg-white border border-[#E8DFD1] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
      <div><label className="font-bold">Customer</label><select required value={clientId} onChange={e=>setClientId(e.target.value)} className="w-full mt-1 p-2.5 border border-[#E8DFD1] rounded-xl bg-[#FAF7F2]"><option value="">Select customer</option>{clients.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
      <div><label className="font-bold">Service</label><select required value={serviceId} onChange={e=>chooseService(e.target.value)} className="w-full mt-1 p-2.5 border border-[#E8DFD1] rounded-xl bg-[#FAF7F2]"><option value="">Select service</option>{services.map(s=><option key={s.id} value={s.id}>{s.subcategory} — {s.name}</option>)}</select></div>
      <div><label className="font-bold">{service?.unitRate ? 'Botox Units / Quantity' : 'Quantity'}</label><input type="number" min="1" value={quantity} onChange={e=>{const q=Number(e.target.value)||1;setQuantity(q); if(service?.unitRate)setAmount(String(q*service.unitRate));}} className="w-full mt-1 p-2.5 border border-[#E8DFD1] rounded-xl bg-[#FAF7F2]"/></div>
      <div><label className="font-bold">Final Amount (Rs.)</label><input type="number" min="0" required value={amount} onChange={e=>setAmount(e.target.value)} className="w-full mt-1 p-2.5 border border-[#E8DFD1] rounded-xl bg-[#FAF7F2]"/></div>
      <div><label className="font-bold">Payment Method</label><select value={paymentMethod} onChange={e=>setPaymentMethod(e.target.value)} className="w-full mt-1 p-2.5 border border-[#E8DFD1] rounded-xl bg-[#FAF7F2]"><option>Cash</option><option>Card</option><option>Bank Transfer</option><option>Online</option></select></div>
      <div className="flex items-end gap-2"><button type="button" onClick={()=>setShowForm(false)} className="px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] font-bold">Cancel</button><button className="px-4 py-2.5 rounded-xl gold-gradient-bg text-white font-bold">Generate Invoice</button></div>
    </form>}

    <div className="bg-white border border-[#E8DFD1] rounded-2xl overflow-hidden">
      {invoices.length===0 ? <div className="p-10 text-center text-sm text-[#6B7280]"><FileText className="mx-auto mb-2 text-[#C5A059]"/>No invoices yet.</div> :
      <div className="overflow-x-auto"><table className="w-full text-xs"><thead className="bg-[#FAF7F2]"><tr><th className="text-left p-3">Invoice</th><th className="text-left p-3">Date</th><th className="text-left p-3">Customer</th><th className="text-left p-3">Service</th><th className="text-right p-3">Amount</th><th className="p-3"></th></tr></thead><tbody>{invoices.map(i=><tr key={i.id} className="border-t border-[#F0ECE1]"><td className="p-3 font-bold">{i.number}</td><td className="p-3">{i.date}</td><td className="p-3">{i.clientName}</td><td className="p-3">{i.serviceName}</td><td className="p-3 text-right font-bold">Rs. {i.amount.toLocaleString()}</td><td className="p-3 text-right"><button onClick={()=>printInvoice(i)} className="p-2 rounded-lg hover:bg-[#FAF7F2]" title="Print invoice"><Printer size={15}/></button></td></tr>)}</tbody></table></div>}
    </div>
  </div>
}
