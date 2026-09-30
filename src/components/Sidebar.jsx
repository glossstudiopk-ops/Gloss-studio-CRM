import React from 'react';
import { LayoutDashboard, CalendarDays, Users, Sparkles, UserCheck, Settings, LogOut, ChevronLeft, ChevronRight, Plus, FileText, Receipt, UserRound, X, BarChart3, Wallet, Send } from 'lucide-react';

export default function Sidebar({activeTab,setActiveTab,collapsed,setCollapsed,mobileOpen,setMobileOpen,onOpenAddAppointment,role,currentUser,onLogout,counts}) {
  const all=[
    {id:'dashboard',label:'Overview',icon:LayoutDashboard,roles:['admin','reception']},
    {id:'calendar',label:'Appointments',icon:CalendarDays,roles:['admin','reception']},
    {id:'clients',label:'Customers',icon:Users,roles:['admin','reception']},
    {id:'services',label:'Services & Pricing',icon:Sparkles,roles:['admin','reception']},
    {id:'staff',label:'Staff & Accounts',icon:UserCheck,roles:['admin']},
    {id:'invoices',label:'Invoices',icon:FileText,roles:['admin','reception']},
    {id:'expenses',label:'Daily Expenses',icon:Receipt,roles:['admin','reception']},
    {id:'payables',label:'Payables & Purchases',icon:Wallet,roles:['admin']},
    {id:'reports',label:'Business Reports',icon:BarChart3,roles:['admin']},
    {id:'messaging',label:'Messaging Setup',icon:Send,roles:['admin']},
    {id:'settings',label:'Settings',icon:Settings,roles:['admin']},
    {id:'my-work',label:'My Profile & Work',icon:UserRound,roles:['staff']}
  ];
  const items=all.filter(i=>i.roles.includes(role));
  const selectTab=(id)=>{setActiveTab(id);setMobileOpen(false);};
  const openBooking=()=>{setMobileOpen(false);onOpenAddAppointment();};

  return <>
    {mobileOpen&&<button aria-label="Close menu overlay" onClick={()=>setMobileOpen(false)} className="fixed inset-0 z-30 bg-black/35 lg:hidden"/>}
    <aside className={`fixed top-0 left-0 h-screen bg-white border-r border-[#E8DFD1] z-40 flex flex-col justify-between transition-all duration-300 w-72 ${mobileOpen?'translate-x-0':'-translate-x-full'} lg:translate-x-0 ${collapsed?'lg:w-20':'lg:w-64'}`}>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="p-4 border-b border-[#F0ECE1] relative flex items-center justify-between">
          <div className="flex items-center gap-3 lg:hidden"><img src="/logo.jpg" alt="Gloss Studio" className="w-11 h-11 object-contain rounded-xl border border-[#E8DFD1]"/><div><div className="font-serif-luxury font-bold">GLOSS STUDIO</div><div className="text-[10px] uppercase tracking-widest text-[#C5A059]">CRM</div></div></div>
          <div className="hidden lg:block">
            {!collapsed?<div className="flex items-center gap-3"><img src="/logo.jpg" alt="Gloss Studio" className="w-11 h-11 object-contain rounded-xl border border-[#E8DFD1]"/><div><div className="font-serif-luxury font-bold">GLOSS STUDIO</div><div className="text-[10px] uppercase tracking-widest text-[#C5A059]">CRM</div></div></div>:<img src="/logo.jpg" alt="Gloss Studio" className="w-10 h-10 object-contain rounded-lg"/>}
          </div>
          <button onClick={()=>setMobileOpen(false)} className="lg:hidden p-2 text-[#6B7280]"><X size={20}/></button>
          <button onClick={()=>setCollapsed(!collapsed)} className="hidden lg:block absolute -right-3 top-6 bg-white border border-[#E8DFD1] rounded-full p-1 text-[#6B7280]">{collapsed?<ChevronRight size={14}/>:<ChevronLeft size={14}/>}</button>
        </div>

        {(role==='admin'||role==='reception')&&<div className="p-3"><button onClick={openBooking} className="w-full py-2.5 gold-gradient-bg text-white rounded-xl font-bold flex items-center justify-center gap-2"><Plus size={17}/><span className={collapsed?'lg:hidden':''}>New Booking</span></button></div>}

        <nav className="p-2 space-y-1">{items.map(item=>{
          const I=item.icon;const active=activeTab===item.id;
          let badge='';if(item.id==='clients')badge=counts.clients;if(item.id==='staff')badge=counts.staff;if(item.id==='calendar')badge=counts.appointments;
          return <button key={item.id} onClick={()=>selectTab(item.id)} className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm ${active?'bg-[#F7F3EC] text-[#C5A059] border border-[#E8DFD1] font-bold':'text-[#6B7280] hover:bg-[#FAF7F2]'}`}>
            <div className="flex items-center gap-3"><I size={19}/><span className={collapsed?'lg:hidden':''}>{item.label}</span></div>
            {badge!==''&&<span className={`text-[10px] bg-[#F3F4F6] px-2 py-0.5 rounded-full ${collapsed?'lg:hidden':''}`}>{badge}</span>}
          </button>
        })}</nav>
      </div>
      <div className="p-3 border-t border-[#F0ECE1] bg-[#FAF7F2]/50">
        <div className={`flex items-center ${collapsed?'lg:justify-center':'justify-between'}`}>
          <div className={collapsed?'lg:hidden':''}><div className="text-xs font-bold truncate max-w-[180px]">{currentUser.name}</div><div className="text-[10px] uppercase text-[#C5A059] font-bold">{currentUser.role}</div></div>
          <button onClick={onLogout} className="p-2 text-[#9CA3AF] hover:text-rose-600"><LogOut size={16}/></button>
        </div>
      </div>
    </aside>
  </>;
}
