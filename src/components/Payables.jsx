import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, RefreshCw, Wallet, CalendarClock, CreditCard, X } from 'lucide-react';

const today=()=>{const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');};
const money=n=>'Rs. '+Number(n||0).toLocaleString('en-PK',{maximumFractionDigits:2});
const input='w-full mt-1 px-3 py-2.5 rounded-xl border border-[#E8DFD1] bg-[#FAF7F2] text-sm';
const categories=['Rent','Utilities','Supplies','Inventory','Staff','Maintenance','Marketing','Equipment','Taxes & Fees','Other'];
const emptyBill=()=>({title:'',vendor:'',category:'Supplies',payable_type:'purchase',invoice_reference:'',total_amount:'',bill_date:today(),due_date:today(),description:''});
const emptyRecurring=()=>({title:'',vendor:'',category:'Rent',amount:'',frequency:'monthly',next_due_on:today(),description:''});

export default function Payables(){
  const [bills,setBills]=useState([]);
  const [payments,setPayments]=useState([]);
  const [templates,setTemplates]=useState([]);
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [show,setShow]=useState('');
  const [bill,setBill]=useState(emptyBill);
  const [recurring,setRecurring]=useState(emptyRecurring);
  const [selected,setSelected]=useState(null);
  const [payment,setPayment]=useState({amount:'',payment_date:today(),method:'Cash',reference:'',note:''});
  const [filter,setFilter]=useState('all');
  const load=async()=>{
    setBusy(true);setError('');
    try{
      const gen=await supabase.rpc('generate_recurring_payables');
      if(gen.error) throw gen.error;
      const [a,b,c]=await Promise.all([
        supabase.from('payables').select('*').order('due_date',{ascending:false}),
        supabase.from('payable_payments').select('*').order('payment_date',{ascending:false}),
        supabase.from('recurring_payables').select('*').order('next_due_on',{ascending:true})
      ]);
      for(const res of [a,b,c]) if(res.error) throw res.error;
      setBills(a.data||[]);setPayments(b.data||[]);setTemplates(c.data||[]);
    }catch(e){setError(e.message||String(e));}
    finally{setBusy(false);}
  };
  useEffect(()=>{load();},[]);
  const paidById=useMemo(()=>{
    const map={};payments.forEach(p=>{map[p.payable_id]=(map[p.payable_id]||0)+Number(p.amount||0);});return map;
  },[payments]);
  const outstanding=b=>Math.max(0,Number(b.total_amount)-(paidById[b.id]||0));
  const status=b=>outstanding(b)<0.01?'Paid':b.due_date&&b.due_date<today()?'Overdue':paidById[b.id]?'Partially paid':'Unpaid';
  const totals=useMemo(()=>({
    billed:bills.reduce((s,b)=>s+Number(b.total_amount),0),
    paid:payments.reduce((s,p)=>s+Number(p.amount),0),
    open:bills.reduce((s,b)=>s+Math.max(0,Number(b.total_amount)-(paidById[b.id]||0)),0),
    overdue:bills.filter(b=>b.due_date&&b.due_date<today()).reduce((s,b)=>s+Math.max(0,Number(b.total_amount)-(paidById[b.id]||0)),0)
  }),[bills,payments,paidById]);
  const visible=bills.filter(b=>filter==='all'||(filter==='open'?outstanding(b)>0:filter==='overdue'?status(b)==='Overdue':status(b)==='Paid'));

  const saveBill=async e=>{
    e.preventDefault();setBusy(true);setError('');
    const {error:err}=await supabase.from('payables').insert({
      ...bill,total_amount:Number(bill.total_amount),invoice_reference:bill.invoice_reference||null,
      vendor:bill.vendor||null,description:bill.description||null,due_date:bill.due_date||null
    });
    if(err){setError(err.message);setBusy(false);return;}
    setShow('');setBill(emptyBill());await load();
  };
  const saveRecurring=async e=>{
    e.preventDefault();setBusy(true);setError('');
    const {error:err}=await supabase.from('recurring_payables').insert({
      ...recurring,amount:Number(recurring.amount),vendor:recurring.vendor||null,description:recurring.description||null
    });
    if(err){setError(err.message);setBusy(false);return;}
    setShow('');setRecurring(emptyRecurring());await load();
  };
  const recordPayment=async e=>{
    e.preventDefault();setBusy(true);setError('');
    const {error:err}=await supabase.rpc('record_payable_payment',{
      p_payable_id:selected.id,p_amount:Number(payment.amount),p_payment_date:payment.payment_date,
      p_method:payment.method,p_reference:payment.reference||null,p_note:payment.note||null
    });
    if(err){setError(err.message);setBusy(false);return;}
    setSelected(null);setPayment({amount:'',payment_date:today(),method:'Cash',reference:'',note:''});await load();
  };
  const toggleRecurring=async t=>{
    const {error:err}=await supabase.from('recurring_payables').update({active:!t.active}).eq('id',t.id);
    if(err) setError(err.message); else await load();
  };
  const openPayment=b=>{setError('');setPayment({amount:outstanding(b).toFixed(2),payment_date:today(),method:'Cash',reference:'',note:''});setSelected(b);};

  return <div className="space-y-5 min-w-0">
    <div className="bg-white border border-[#E8DFD1] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div><h2 className="font-serif-luxury text-2xl font-bold">Payables & Purchases</h2><p className="text-xs text-[#6B7280] mt-1">Supplier purchases, bills, fixed costs, due dates and partial payments.</p></div>
      <div className="flex flex-wrap gap-2">
        <button onClick={load} disabled={busy} title="Refresh and generate due recurring bills" className="px-3 py-2 border rounded-xl text-xs flex gap-1 items-center"><RefreshCw size={14}/>Refresh</button>
        <button onClick={()=>{setError('');setShow('recurring');}} className="px-3 py-2 border border-[#C5A059] text-[#946F2E] rounded-xl text-xs font-bold flex gap-1 items-center"><CalendarClock size={14}/>Fixed / Recurring</button>
        <button onClick={()=>{setError('');setShow('bill');}} className="gold-gradient-bg text-white px-3 py-2 rounded-xl text-xs font-bold flex gap-1 items-center"><Plus size={14}/>Add Payable</button>
      </div>
    </div>
    {error&&<div role="alert" className="p-3 text-sm text-rose-700 rounded-xl bg-rose-50 border border-rose-200">{error}</div>}
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      {[['Recorded Bills',totals.billed],['Payments Made',totals.paid],['Outstanding',totals.open],['Overdue',totals.overdue]].map(([name,value])=><div key={name} className="bg-white border border-[#E8DFD1] rounded-2xl p-4 min-w-0"><div className="text-xs text-[#6B7280]">{name}</div><div className="font-bold text-lg sm:text-xl mt-2 break-words">{money(value)}</div></div>)}
    </div>
    <div className="bg-white border border-[#E8DFD1] rounded-2xl overflow-hidden">
      <div className="p-4 flex flex-wrap justify-between items-center gap-3 border-b"><h3 className="font-bold">Purchase & Bill Ledger</h3><select value={filter} onChange={e=>setFilter(e.target.value)} className={input+' !w-auto !mt-0'}><option value="all">All bills</option><option value="open">Outstanding</option><option value="overdue">Overdue</option><option value="paid">Paid</option></select></div>
      {visible.length===0?<p className="p-9 text-center text-sm text-[#6B7280]">No records in this view.</p>:<div className="overflow-x-auto"><table className="w-full min-w-[780px] text-xs text-left"><thead className="bg-[#FAF7F2]"><tr>{['Bill / Supplier','Category','Due Date','Billed','Paid','Balance','Status','Action'].map(x=><th key={x} className="p-3">{x}</th>)}</tr></thead><tbody>{visible.map(b=><tr key={b.id} className="border-t border-[#F0ECE1]"><td className="p-3"><b>{b.title}</b><div className="text-[#6B7280]">{b.vendor||'—'}{b.invoice_reference?' · '+b.invoice_reference:''}</div></td><td className="p-3">{b.category}{b.payable_type==='fixed'&&<div className="text-[10px] text-[#C5A059]">Fixed cost</div>}</td><td className="p-3">{b.due_date||'—'}</td><td className="p-3">{money(b.total_amount)}</td><td className="p-3">{money(paidById[b.id])}</td><td className="p-3 font-bold">{money(outstanding(b))}</td><td className="p-3"><span className={status(b)==='Overdue'?'text-rose-600 font-bold':status(b)==='Paid'?'text-emerald-700':'text-[#946F2E]'}>{status(b)}</span></td><td className="p-3">{outstanding(b)>0.009&&<button onClick={()=>openPayment(b)} className="border border-[#C5A059] text-[#946F2E] rounded-lg px-2 py-1.5 font-bold">Record payment</button>}</td></tr>)}</tbody></table></div>}
    </div>
    <div className="bg-white border border-[#E8DFD1] rounded-2xl overflow-hidden">
      <div className="p-4"><h3 className="font-bold">Recurring Fixed Costs</h3><p className="text-xs text-[#6B7280] mt-1">Due bills are generated automatically when an admin opens or refreshes this page. An entry is created once per due date.</p></div>
      {templates.length===0?<p className="px-4 pb-6 text-sm text-[#6B7280]">Add rent, electricity, internet or other recurring costs above.</p>:<div className="overflow-x-auto"><table className="w-full min-w-[600px] text-xs"><thead className="bg-[#FAF7F2]"><tr>{['Expense','Amount','Frequency','Next Due','Status'].map(x=><th key={x} className="text-left p-3">{x}</th>)}</tr></thead><tbody>{templates.map(t=><tr key={t.id} className="border-t"><td className="p-3"><b>{t.title}</b><div className="text-[#6B7280]">{t.vendor||t.category}</div></td><td className="p-3">{money(t.amount)}</td><td className="p-3 capitalize">{t.frequency}</td><td className="p-3">{t.next_due_on}</td><td className="p-3"><button className="text-[#946F2E] underline" onClick={()=>toggleRecurring(t)}>{t.active?'Active · Pause':'Paused · Resume'}</button></td></tr>)}</tbody></table></div>}
    </div>
    <div className="bg-white border border-[#E8DFD1] rounded-2xl overflow-hidden">
      <h3 className="font-bold p-4">Payment History</h3>
      {payments.length===0?<p className="px-4 pb-6 text-sm text-[#6B7280]">No supplier or bill payments recorded.</p>:<div className="overflow-x-auto"><table className="w-full min-w-[580px] text-xs"><thead className="bg-[#FAF7F2]"><tr>{['Date','Payable','Method','Reference','Amount'].map(x=><th key={x} className="text-left p-3">{x}</th>)}</tr></thead><tbody>{payments.map(p=><tr key={p.id} className="border-t"><td className="p-3">{p.payment_date}</td><td className="p-3">{bills.find(b=>b.id===p.payable_id)?.title||'—'}</td><td className="p-3">{p.method}</td><td className="p-3">{p.reference||'—'}</td><td className="p-3 font-semibold">{money(p.amount)}</td></tr>)}</tbody></table></div>}
    </div>
    {(show||selected)&&<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-3"><div className="bg-white w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-2xl p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between"><h3 className="font-serif-luxury text-xl font-bold">{selected?'Record Payable Payment':show==='bill'?'Add Purchase / Payable':'Add Recurring Fixed Cost'}</h3><button onClick={()=>{setShow('');setSelected(null);setError('');}} aria-label="Close"><X size={19}/></button></div>
      {error&&<div className="text-sm text-rose-700 bg-rose-50 p-2 rounded-lg">{error}</div>}
      {selected?<form onSubmit={recordPayment} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <p className="sm:col-span-2 text-sm">Remaining balance: <b>{money(outstanding(selected))}</b></p>
        <label>Amount (Rs.)<input className={input} type="number" step="0.01" min="0.01" max={outstanding(selected)} required value={payment.amount} onChange={e=>setPayment({...payment,amount:e.target.value})}/></label>
        <label>Payment date<input className={input} type="date" required value={payment.payment_date} onChange={e=>setPayment({...payment,payment_date:e.target.value})}/></label>
        <label>Method<select className={input} value={payment.method} onChange={e=>setPayment({...payment,method:e.target.value})}>{['Cash','Card','Bank Transfer','Online','Cheque','Other'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Reference<input className={input} value={payment.reference} onChange={e=>setPayment({...payment,reference:e.target.value})}/></label>
        <label className="sm:col-span-2">Note<textarea className={input} value={payment.note} onChange={e=>setPayment({...payment,note:e.target.value})}/></label>
        <button disabled={busy} className="sm:col-span-2 gold-gradient-bg text-white p-3 rounded-xl font-bold">Save Payment</button>
      </form>:show==='bill'?<form onSubmit={saveBill} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <label className="sm:col-span-2">Purchase / bill title *<input required className={input} value={bill.title} onChange={e=>setBill({...bill,title:e.target.value})}/></label>
        <label>Supplier / payee<input className={input} value={bill.vendor} onChange={e=>setBill({...bill,vendor:e.target.value})}/></label>
        <label>Category<select className={input} value={bill.category} onChange={e=>setBill({...bill,category:e.target.value})}>{categories.map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Type<select className={input} value={bill.payable_type} onChange={e=>setBill({...bill,payable_type:e.target.value})}><option value="purchase">Purchase</option><option value="fixed">Fixed Cost</option><option value="other">Other Payable</option></select></label>
        <label>Total amount (Rs.) *<input required type="number" min="0.01" step="0.01" className={input} value={bill.total_amount} onChange={e=>setBill({...bill,total_amount:e.target.value})}/></label>
        <label>Bill date<input type="date" required className={input} value={bill.bill_date} onChange={e=>setBill({...bill,bill_date:e.target.value})}/></label>
        <label>Due date<input type="date" className={input} value={bill.due_date} onChange={e=>setBill({...bill,due_date:e.target.value})}/></label>
        <label className="sm:col-span-2">Invoice / receipt reference<input className={input} value={bill.invoice_reference} onChange={e=>setBill({...bill,invoice_reference:e.target.value})}/></label>
        <label className="sm:col-span-2">Description<textarea className={input} value={bill.description} onChange={e=>setBill({...bill,description:e.target.value})}/></label>
        <button disabled={busy} className="sm:col-span-2 gold-gradient-bg text-white p-3 rounded-xl font-bold">Save Payable</button>
      </form>:<form onSubmit={saveRecurring} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <label className="sm:col-span-2">Fixed cost name *<input required className={input} value={recurring.title} onChange={e=>setRecurring({...recurring,title:e.target.value})}/></label>
        <label>Payee<input className={input} value={recurring.vendor} onChange={e=>setRecurring({...recurring,vendor:e.target.value})}/></label>
        <label>Category<select className={input} value={recurring.category} onChange={e=>setRecurring({...recurring,category:e.target.value})}>{categories.map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Amount (Rs.) *<input required type="number" min="0.01" step="0.01" className={input} value={recurring.amount} onChange={e=>setRecurring({...recurring,amount:e.target.value})}/></label>
        <label>Frequency<select className={input} value={recurring.frequency} onChange={e=>setRecurring({...recurring,frequency:e.target.value})}><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="yearly">Yearly</option></select></label>
        <label className="sm:col-span-2">First / next due date *<input required type="date" className={input} value={recurring.next_due_on} onChange={e=>setRecurring({...recurring,next_due_on:e.target.value})}/></label>
        <label className="sm:col-span-2">Notes<textarea className={input} value={recurring.description} onChange={e=>setRecurring({...recurring,description:e.target.value})}/></label>
        <button disabled={busy} className="sm:col-span-2 gold-gradient-bg text-white p-3 rounded-xl font-bold">Save Recurring Cost</button>
      </form>}
    </div></div>}
  </div>;
}
