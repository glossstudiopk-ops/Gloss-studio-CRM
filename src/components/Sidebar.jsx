import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  Sparkles, 
  UserCheck, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  collapsed, 
  setCollapsed,
  onOpenAddAppointment 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'calendar', label: 'Appointments Calendar', icon: CalendarDays, badge: '18 Today' },
    { id: 'clients', label: 'Client Database', icon: Users, badge: '1,248' },
    { id: 'services', label: 'Services & Pricing', icon: Sparkles, badge: null },
    { id: 'staff', label: 'Staff Management', icon: UserCheck, badge: '4 Active' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null }
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-white border-r border-[#E8DFD1] transition-all duration-300 z-30 flex flex-col justify-between ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header Logo */}
      <div>
        <div className="p-4 border-b border-[#F0ECE1] flex items-center justify-between relative">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm border border-[#E8DFD1] bg-[#FAF7F2] p-1 flex items-center justify-center">
                <img 
                  src="/logo.jpg" 
                  alt="Gloss Studio Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif-luxury text-lg font-bold text-[#1F2937] leading-tight tracking-wider">
                  GLOSS STUDIO
                </h1>
                <p className="text-[10px] tracking-widest uppercase text-[#C5A059] font-medium">
                  Aesthetic | Hair | Spa
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <img 
                src="/logo.jpg" 
                alt="Gloss Studio Logo" 
                className="w-10 h-10 object-contain rounded-lg border border-[#E8DFD1]"
              />
            </div>
          )}

          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 bg-white border border-[#E8DFD1] rounded-full p-1 text-[#6B7280] hover:text-[#C5A059] hover:border-[#C5A059] shadow-sm transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Quick Add Appointment Button */}
        <div className="p-3">
          <button
            onClick={onOpenAddAppointment}
            className={`w-full py-2.5 px-3 gold-gradient-bg text-white rounded-xl font-medium shadow-md hover:brightness-105 transition-all flex items-center justify-center space-x-2 ${
              collapsed ? 'px-2' : ''
            }`}
          >
            <Plus size={18} />
            {!collapsed && <span className="text-sm font-semibold tracking-wide">New Booking</span>}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#F7F3EC] text-[#C5A059] border border-[#E8DFD1] font-semibold' 
                    : 'text-[#6B7280] hover:bg-[#FAF7F2] hover:text-[#1F2937]'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={20} className={isActive ? 'text-[#C5A059]' : 'text-[#9CA3AF]'} />
                  {!collapsed && <span>{item.label}</span>}
                </div>
                {!collapsed && item.badge && (
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive 
                      ? 'bg-[#C5A059] text-white' 
                      : 'bg-[#F3F4F6] text-[#6B7280]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile / Logout */}
      <div className="p-3 border-t border-[#F0ECE1] bg-[#FAF7F2]/50">
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
                  alt="Salon Manager" 
                  className="w-9 h-9 rounded-full object-cover border-2 border-[#C5A059]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-[#1F2937] leading-none">Sophia Hayes</p>
                <p className="text-[11px] text-[#C5A059] font-medium mt-0.5">Salon Manager</p>
              </div>
            </div>
            <button className="text-[#9CA3AF] hover:text-rose-600 transition-colors p-1" title="Log Out">
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80" 
              alt="Salon Manager" 
              className="w-9 h-9 rounded-full object-cover border-2 border-[#C5A059]"
            />
          </div>
        )}
      </div>
    </aside>
  );
}
