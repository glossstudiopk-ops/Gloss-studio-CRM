import React, { useState } from 'react';
import { Search, Bell, Plus, Calendar, Sparkles, CheckCircle, Clock } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onOpenAddAppointment,
  activeTabTitle 
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'VIP Client Arrival', desc: 'Elena Rostova checked in for HydraFacial Glow & Lift', time: '10 mins ago', unread: true },
    { id: 2, title: 'New Online Booking', desc: 'Amanda Chen booked Haircut & Blowout with Chloe', time: '45 mins ago', unread: true },
    { id: 3, title: 'Note Added', desc: 'Sarah Jenkins updated allergen profile for Jane Doe', time: '2 hours ago', unread: false }
  ];

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="h-16 bg-white border-b border-[#E8DFD1] px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left Title & Search */}
      <div className="flex items-center space-x-6">
        <div>
          <h2 className="font-serif-luxury text-xl font-bold text-[#1F2937]">
            {activeTabTitle}
          </h2>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-72 hidden md:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clients, phone, staff, services..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:outline-none focus:border-[#C5A059] focus:bg-white transition-all text-[#1F2937]"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF] hover:text-[#1F2937]"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Date Display Badge */}
        <div className="hidden lg:flex items-center space-x-2 bg-[#FAF7F2] border border-[#E8DFD1] px-3 py-1.5 rounded-xl text-xs font-medium text-[#6B7280]">
          <Calendar size={14} className="text-[#C5A059]" />
          <span>{currentDateFormatted}</span>
        </div>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-[#6B7280] hover:text-[#C5A059] hover:bg-[#FAF7F2] rounded-xl relative transition-colors"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C5A059] rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E8DFD1] rounded-2xl shadow-xl p-4 z-50 animate-slide-in">
              <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles size={16} className="text-[#C5A059]" />
                  <h4 className="font-bold text-sm text-[#1F2937]">Salon Notifications</h4>
                </div>
                <span className="text-[10px] bg-[#FAF7F2] text-[#C5A059] px-2 py-0.5 rounded-full font-semibold border border-[#E8DFD1]">
                  2 New
                </span>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className={`p-2.5 rounded-xl text-xs border ${
                    item.unread ? 'bg-[#F7F3EC]/70 border-[#E8DFD1]' : 'bg-white border-transparent hover:bg-[#FAF7F2]'
                  }`}>
                    <div className="flex justify-between font-semibold text-[#1F2937]">
                      <span>{item.title}</span>
                      <span className="text-[10px] text-[#9CA3AF] font-normal">{item.time}</span>
                    </div>
                    <p className="text-[#6B7280] mt-1 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Button */}
        <button
          onClick={onOpenAddAppointment}
          className="gold-gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:brightness-105 transition-all flex items-center space-x-1.5"
        >
          <Plus size={16} />
          <span>Book Appointment</span>
        </button>
      </div>
    </header>
  );
}
