import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Filter, 
  User, 
  Scissors, 
  Sparkles, 
  Flower2,
  CheckCircle,
  X
} from 'lucide-react';

export default function AppointmentsCalendar({ 
  appointments, 
  staff, 
  clients,
  onOpenAddAppointment,
  onSelectClient 
}) {
  const [viewMode, setViewMode] = useState('Day'); // 'Day' or 'Week'
  const [selectedStaff, setSelectedStaff] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Time slots from 08:00 AM to 06:00 PM
  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const categories = ['All', 'Hair', 'Aesthetic', 'Spa'];

  const filteredStaff = staff.filter(s => {
    if (selectedStaff !== 'All' && s.name !== selectedStaff) return false;
    if (selectedCategory !== 'All' && s.category !== selectedCategory) return false;
    return true;
  });

  const getAppointmentForSlot = (staffName, timeSlot) => {
    return appointments.find(apt => {
      if (apt.staffName !== staffName) return false;
      // Match exact or approx hour
      const aptHour = apt.time.substring(0, 5);
      const slotHour = timeSlot.substring(0, 5);
      return aptHour === slotHour || apt.time === timeSlot;
    });
  };

  const getCategoryCardStyle = (category) => {
    switch (category) {
      case 'Hair':
        return 'bg-amber-100/80 border-amber-300 text-amber-900 hover:bg-amber-200/90';
      case 'Aesthetic':
        return 'bg-purple-100/80 border-purple-300 text-purple-900 hover:bg-purple-200/90';
      case 'Spa':
        return 'bg-teal-100/80 border-teal-300 text-teal-900 hover:bg-teal-200/90';
      default:
        return 'bg-[#F7F3EC] border-[#E8DFD1] text-[#1F2937]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar Bar Controls */}
      <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Date Selector */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 border border-[#E8DFD1] rounded-xl p-1 bg-[#FAF7F2]">
            <button className="p-1.5 text-[#6B7280] hover:text-[#C5A059] transition-colors">
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs font-bold text-[#1F2937] px-2">
              Monday, September 14, 2026
            </span>
            <button className="p-1.5 text-[#6B7280] hover:text-[#C5A059] transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
          <span className="text-xs bg-[#F7F3EC] text-[#C5A059] border border-[#E8DFD1] px-2.5 py-1 rounded-lg font-bold">
            Today
          </span>
        </div>

        {/* Filters & View Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Filter */}
          <div className="flex items-center space-x-1.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl p-1 text-xs">
            <Filter size={12} className="text-[#C5A059] ml-2" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#C5A059] text-white shadow-xs'
                    : 'text-[#6B7280] hover:text-[#1F2937]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Staff Filter */}
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3 py-1.5 text-xs text-[#1F2937] font-medium focus:outline-none focus:border-[#C5A059]"
          >
            <option value="All">All Specialists ({staff.length})</option>
            {staff.map(s => (
              <option key={s.id} value={s.name}>{s.name} ({s.category})</option>
            ))}
          </select>

          {/* Day / Week View Mode */}
          <div className="flex items-center bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl p-1 text-xs">
            {['Day', 'Week'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  viewMode === mode
                    ? 'bg-white text-[#1F2937] shadow-xs border border-[#E8DFD1]'
                    : 'text-[#6B7280] hover:text-[#1F2937]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Add Booking Button */}
          <button
            onClick={() => onOpenAddAppointment()}
            className="gold-gradient-bg text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs hover:brightness-105 transition-all flex items-center space-x-1"
          >
            <Plus size={14} />
            <span>Book Slot</span>
          </button>
        </div>
      </div>

      {/* Interactive Drag & Drop Schedule Grid */}
      <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Header Row: Staff Columns */}
          <div className="grid grid-cols-[100px_repeat(4,1fr)] border-b border-[#E8DFD1] pb-3 mb-2">
            <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex items-center space-x-1">
              <Clock size={14} className="text-[#C5A059]" />
              <span>Time</span>
            </div>
            {filteredStaff.map((member) => (
              <div key={member.id} className="text-center px-2">
                <div className="flex items-center justify-center space-x-2">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-7 h-7 rounded-full object-cover border border-[#C5A059]"
                  />
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#1F2937] block leading-tight">
                      {member.name}
                    </span>
                    <span className="text-[10px] text-[#C5A059] font-medium">
                      {member.role.split('&')[0]}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots Rows */}
          <div className="space-y-2">
            {timeSlots.map((timeSlot) => (
              <div 
                key={timeSlot}
                className="grid grid-cols-[100px_repeat(4,1fr)] min-h-[72px] items-stretch gap-2 border-b border-[#F5F2EA] py-1"
              >
                {/* Time Column */}
                <div className="text-xs font-semibold text-[#6B7280] pt-2 flex items-start">
                  {timeSlot}
                </div>

                {/* Staff Columns for this Time Slot */}
                {filteredStaff.map((member) => {
                  const apt = getAppointmentForSlot(member.name, timeSlot);
                  const matchingClient = apt ? clients.find(c => c.id === apt.clientId || c.name.toLowerCase() === apt.clientName.toLowerCase()) : null;

                  return (
                    <div key={member.id} className="h-full">
                      {apt ? (
                        <div
                          onClick={() => matchingClient && onSelectClient(matchingClient)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all shadow-2xs h-full flex flex-col justify-between ${getCategoryCardStyle(apt.category)}`}
                          title="Click to view client CRM profile"
                        >
                          <div>
                            <div className="flex items-center justify-between font-bold">
                              <span className="truncate">{apt.clientName}</span>
                              <span className="text-[10px] font-semibold opacity-80">{apt.category}</span>
                            </div>
                            <p className="text-[11px] opacity-90 truncate mt-0.5">{apt.serviceName}</p>
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/10 text-[10px]">
                            <span className="font-semibold">${apt.price}</span>
                            <span className="px-1.5 py-0.5 rounded-md bg-white/60 font-medium">
                              {apt.duration}m
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => onOpenAddAppointment({ staffId: member.id, time: timeSlot })}
                          className="h-full rounded-xl border border-dashed border-[#E8DFD1] bg-[#FAF7F2]/40 hover:bg-[#F7F3EC] hover:border-[#C5A059] transition-all flex items-center justify-center cursor-pointer group p-2"
                          title={`Click to book appointment with ${member.name} at ${timeSlot}`}
                        >
                          <span className="text-[11px] text-[#9CA3AF] group-hover:text-[#C5A059] font-medium flex items-center space-x-1">
                            <Plus size={12} />
                            <span className="hidden sm:inline">Book Slot</span>
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
