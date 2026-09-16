import React from 'react';
import { 
  CalendarDays, 
  DollarSign, 
  UserPlus, 
  Users, 
  TrendingUp, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Scissors,
  Flower2,
  Smile
} from 'lucide-react';

export default function DashboardOverview({ 
  kpis, 
  appointments, 
  activities, 
  clients,
  onSelectClient,
  onOpenAddAppointment,
  setActiveTab
}) {
  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Hair':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: Scissors,
          accent: 'border-l-4 border-l-amber-500'
        };
      case 'Aesthetic':
        return {
          bg: 'bg-purple-50 text-purple-700 border-purple-200',
          icon: Sparkles,
          accent: 'border-l-4 border-l-purple-500'
        };
      case 'Spa':
        return {
          bg: 'bg-teal-50 text-teal-700 border-teal-200',
          icon: Flower2,
          accent: 'border-l-4 border-l-teal-500'
        };
      default:
        return {
          bg: 'bg-gray-50 text-gray-700 border-gray-200',
          icon: Sparkles,
          accent: 'border-l-4 border-l-gray-400'
        };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In Progress':
        return 'bg-[#F7F3EC] text-[#C5A059] border-[#E8DFD1] font-semibold animate-pulse';
      case 'Upcoming':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 text-[#C5A059] font-medium text-xs uppercase tracking-widest mb-1">
            <Sparkles size={14} />
            <span>Gloss Studio Executive Overview</span>
          </div>
          <h2 className="font-serif-luxury text-2xl md:text-3xl font-bold text-[#1F2937]">
            Good morning, Sophia
          </h2>
          <p className="text-xs md:text-sm text-[#6B7280] mt-1 max-w-xl">
            You have <strong className="text-[#1F2937] font-semibold">{kpis.todayAppointments} appointments</strong> scheduled today across Hair, Aesthetic & Spa suites.
          </p>
        </div>

        <div className="flex items-center space-x-3 relative z-10">
          <button
            onClick={() => setActiveTab('calendar')}
            className="px-4 py-2.5 bg-[#FAF7F2] border border-[#E8DFD1] text-[#1F2937] text-xs font-semibold rounded-xl hover:bg-[#F7F3EC] transition-colors flex items-center space-x-2"
          >
            <CalendarDays size={16} className="text-[#C5A059]" />
            <span>View Calendar</span>
          </button>

          <button
            onClick={onOpenAddAppointment}
            className="px-4 py-2.5 gold-gradient-bg text-white text-xs font-bold rounded-xl shadow-sm hover:brightness-105 transition-all flex items-center space-x-2"
          >
            <Sparkles size={16} />
            <span>+ Quick Booking</span>
          </button>
        </div>

        {/* Decorative background accent */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#F7F3EC] rounded-full opacity-60 pointer-events-none"></div>
      </div>

      {/* Top Row: 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Today's Appointments */}
        <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 subtle-hover">
          <div className="flex items-center justify-between text-[#6B7280]">
            <span className="text-xs font-medium uppercase tracking-wider">Today's Bookings</span>
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center text-[#C5A059]">
              <CalendarDays size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold font-serif-luxury text-[#1F2937]">
              {kpis.todayAppointments}
            </span>
            <span className="text-xs text-[#6B7280] ml-2">appointments</span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold flex items-center space-x-1">
              <CheckCircle2 size={12} />
              <span>{kpis.completedAppointments} completed</span>
            </span>
            <span className="text-[#6B7280]">
              {kpis.todayAppointments - kpis.completedAppointments} remaining
            </span>
          </div>
        </div>

        {/* KPI 2: Today's Revenue */}
        <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 subtle-hover">
          <div className="flex items-center justify-between text-[#6B7280]">
            <span className="text-xs font-medium uppercase tracking-wider">Today's Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center text-[#C5A059]">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold font-serif-luxury text-[#1F2937]">
              ${kpis.todayRevenue.toLocaleString()}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold flex items-center space-x-1">
              <TrendingUp size={12} />
              <span>{kpis.revenueChange}</span>
            </span>
            <span className="text-[#6B7280]">Avg ticket $190</span>
          </div>
        </div>

        {/* KPI 3: New Clients This Week */}
        <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 subtle-hover">
          <div className="flex items-center justify-between text-[#6B7280]">
            <span className="text-xs font-medium uppercase tracking-wider">New Clients (Week)</span>
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center text-[#C5A059]">
              <UserPlus size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold font-serif-luxury text-[#1F2937]">
              {kpis.newClientsThisWeek}
            </span>
            <span className="text-xs text-emerald-600 font-semibold ml-2">+{kpis.newClientsToday} today</span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs">
            <span className="text-[#C5A059] font-medium">85% retention rate</span>
            <span className="text-[#6B7280]">Target: 15</span>
          </div>
        </div>

        {/* KPI 4: Total Active Clients */}
        <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 subtle-hover">
          <div className="flex items-center justify-between text-[#6B7280]">
            <span className="text-xs font-medium uppercase tracking-wider">Total Active Clients</span>
            <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center text-[#C5A059]">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold font-serif-luxury text-[#1F2937]">
              {kpis.totalActiveClients.toLocaleString()}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs">
            <span className="text-[#C5A059] font-semibold">
              {kpis.vipClientsCount} VIP Members
            </span>
            <span className="text-[#6B7280]">Top tier</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Interactive Today's Schedule (Color Coded) */}
      <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F0ECE1] pb-4 mb-5">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1F2937]">
              Today's Schedule & Suite Workflow
            </h3>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Live schedule view color-coded by service suite (Hair, Aesthetic, Spa)
            </p>
          </div>

          {/* Category Color Legend */}
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-[#6B7280]">Hair</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              <span className="text-[#6B7280]">Aesthetic</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              <span className="text-[#6B7280]">Spa</span>
            </span>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="space-y-3">
          {appointments.map((apt) => {
            const badge = getCategoryBadge(apt.category);
            const CategoryIcon = badge.icon;
            const statusStyle = getStatusBadge(apt.status);
            
            // Find corresponding client for drawer view
            const matchingClient = clients.find(c => c.id === apt.clientId || c.name.toLowerCase() === apt.clientName.toLowerCase());

            return (
              <div 
                key={apt.id}
                onClick={() => matchingClient && onSelectClient(matchingClient)}
                className={`p-4 rounded-xl bg-[#FAF7F2]/60 hover:bg-[#F7F3EC] border border-[#E8DFD1] transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${badge.accent}`}
              >
                {/* Left: Time & Client */}
                <div className="flex items-center space-x-4">
                  <div className="w-24 flex-shrink-0 text-center">
                    <span className="text-sm font-bold text-[#1F2937] block">{apt.time}</span>
                    <span className="text-[10px] text-[#6B7280] flex items-center justify-center space-x-1">
                      <Clock size={10} />
                      <span>{apt.duration} mins</span>
                    </span>
                  </div>

                  <div className="h-8 w-px bg-[#E8DFD1] hidden md:block"></div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-[#1F2937] hover:text-[#C5A059]">
                        {apt.clientName}
                      </h4>
                      {matchingClient?.isVip && (
                        <span className="text-[10px] bg-[#C5A059] text-white px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          VIP
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                      {apt.serviceName}
                    </p>
                  </div>
                </div>

                {/* Right: Staff, Price, Category, Status */}
                <div className="flex items-center justify-between md:justify-end space-x-4">
                  <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex items-center space-x-1 ${badge.bg}`}>
                    <CategoryIcon size={12} />
                    <span>{apt.category}</span>
                  </span>

                  <div className="text-right">
                    <span className="text-xs text-[#6B7280] block">Specialist</span>
                    <span className="text-xs font-semibold text-[#1F2937]">{apt.staffName}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#1F2937]">${apt.price}</span>
                  </div>

                  <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${statusStyle}`}>
                    {apt.status}
                  </span>

                  <ChevronRight size={16} className="text-[#9CA3AF]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Recent Client Activity List */}
      <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-4 mb-4">
          <div>
            <h3 className="font-serif-luxury text-xl font-bold text-[#1F2937]">
              Recent Client Activity
            </h3>
            <p className="text-xs text-[#6B7280]">
              Real-time feed of client bookings, check-ins, and CRM notes
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('clients')}
            className="text-xs text-[#C5A059] font-bold hover:underline flex items-center space-x-1"
          >
            <span>View All Clients</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="space-y-3">
          {activities.map((act) => (
            <div 
              key={act.id}
              className="p-3 rounded-xl bg-[#FAF7F2] border border-[#F0ECE1] flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#F7F3EC] border border-[#E8DFD1] flex items-center justify-center text-[#C5A059] font-bold">
                  {act.type === 'completed' && <CheckCircle2 size={16} className="text-emerald-600" />}
                  {act.type === 'checkin' && <Smile size={16} className="text-[#C5A059]" />}
                  {act.type === 'booking' && <CalendarDays size={16} className="text-blue-600" />}
                  {act.type === 'note' && <FileText size={16} className="text-purple-600" />}
                  {act.type === 'new_client' && <Sparkles size={16} className="text-amber-600" />}
                </div>
                <div>
                  <p className="text-[#1F2937] font-medium">{act.text}</p>
                </div>
              </div>
              <span className="text-[11px] text-[#9CA3AF] font-medium flex-shrink-0 ml-4">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
