import React, { useState } from 'react';
import { Settings as SettingsIcon, Store, Bell, Shield, Sliders, CheckCircle, Sparkles } from 'lucide-react';

export default function Settings() {
  const [salonName, setSalonName] = useState('Gloss Studio');
  const [phone, setPhone] = useState('(555) 900-GLOSS');
  const [address, setAddress] = useState('450 Luxury Lane, Suite 100, Beverly Hills, CA');
  const [autoSms, setAutoSms] = useState(true);
  const [autoEmail, setAutoEmail] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs">
        <div className="flex items-center space-x-3 border-b border-[#F0ECE1] pb-4 mb-6">
          <div className="p-2.5 bg-[#FAF7F2] rounded-xl border border-[#E8DFD1] text-[#C5A059]">
            <Store size={20} />
          </div>
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1F2937]">
              Salon Business Information
            </h3>
            <p className="text-xs text-[#6B7280]">
              Manage public details, address, and client contact info
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center space-x-2 font-bold animate-pulse">
              <CheckCircle size={16} />
              <span>Settings updated successfully!</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#1F2937] mb-1">Salon Name</label>
              <input
                type="text"
                value={salonName}
                onChange={(e) => setSalonName(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1F2937] mb-1">Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#1F2937] mb-1">Salon Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
            />
          </div>

          {/* Operating Hours */}
          <div className="pt-4 border-t border-[#F0ECE1]">
            <h4 className="font-bold text-[#1F2937] text-sm mb-3">Operating Suite Hours</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">
                <span className="font-bold block">Mon - Fri</span>
                <span className="text-[#6B7280]">08:00 AM - 07:00 PM</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">
                <span className="font-bold block">Saturday</span>
                <span className="text-[#6B7280]">09:00 AM - 06:00 PM</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">
                <span className="font-bold block">Sunday</span>
                <span className="text-[#C5A059] font-bold">By Appointment Only</span>
              </div>
            </div>
          </div>

          {/* Notification Automations */}
          <div className="pt-4 border-t border-[#F0ECE1] space-y-3">
            <h4 className="font-bold text-[#1F2937] text-sm">Client Reminder Automations</h4>
            
            <div className="flex items-center justify-between p-3 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">
              <div>
                <span className="font-bold block text-[#1F2937]">SMS Appointment Confirmations</span>
                <span className="text-[#6B7280] text-[11px]">Send automated text reminder 24 hours prior to appointment</span>
              </div>
              <input
                type="checkbox"
                checked={autoSms}
                onChange={(e) => setAutoSms(e.target.checked)}
                className="w-4 h-4 text-[#C5A059] rounded focus:ring-[#C5A059]"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl">
              <div>
                <span className="font-bold block text-[#1F2937]">Email Post-Care Instructions</span>
                <span className="text-[#6B7280] text-[11px]">Automatically email HydraFacial & Hair Care guide post-treatment</span>
              </div>
              <input
                type="checkbox"
                checked={autoEmail}
                onChange={(e) => setAutoEmail(e.target.checked)}
                className="w-4 h-4 text-[#C5A059] rounded focus:ring-[#C5A059]"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="gold-gradient-bg text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md hover:brightness-105"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
