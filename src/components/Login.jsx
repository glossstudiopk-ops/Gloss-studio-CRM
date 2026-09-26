import React, { useState } from 'react';
import { LockKeyhole, Mail, ShieldCheck } from 'lucide-react';

export default function Login({ accounts, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const account = accounts.find(a =>
      a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    );
    if (!account) {
      setError('Invalid email or password.');
      return;
    }
    setError('');
    onLogin(account);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-[#E8DFD1] rounded-3xl shadow-xl p-8">
        <div className="text-center mb-7">
          <img src="/logo.jpg" alt="Gloss Studio" className="w-20 h-20 object-contain mx-auto rounded-2xl border border-[#E8DFD1] mb-4" />
          <h1 className="font-serif-luxury text-3xl font-bold text-[#1F2937]">Gloss Studio CRM</h1>
          <p className="text-xs text-[#6B7280] mt-2">Sign in with your assigned account.</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-[#1F2937]">Email</label>
            <div className="relative mt-1">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required
                className="w-full pl-9 pr-3 py-3 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:outline-none focus:border-[#C5A059]"
                placeholder="name@glossstudio.pk" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[#1F2937]">Password</label>
            <div className="relative mt-1">
              <LockKeyhole size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required
                className="w-full pl-9 pr-3 py-3 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:outline-none focus:border-[#C5A059]"
                placeholder="Password" />
            </div>
          </div>
          {error && <div className="text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">{error}</div>}
          <button className="w-full gold-gradient-bg text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
            <ShieldCheck size={17}/> Sign In
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#F0ECE1] text-[11px] text-[#6B7280] leading-relaxed">
          Access is role-based: administrators can access all CRM modules, reception can manage customers, bookings, invoices and daily expenses, and staff can access only their profile and assigned work.
        </div>
      </div>
    </div>
  );
}
