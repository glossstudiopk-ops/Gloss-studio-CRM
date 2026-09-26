import React from 'react';
import { LayoutDashboard, CalendarDays, Users, Sparkles, UserCheck, Settings, LogOut, ChevronLeft, ChevronRight, Plus, FileText, Receipt, UserRound } from 'lucide-react';

export default function Sidebar({activeTab,setActiveTab,collapsed,setCollapsed,onOpenAddAppointment,role,currentUser,onLogout,counts}) {
  const all=[
    {id:'dashboard',label:'Overview',icon:LayoutDashboard,roles:['admin','reception']},
    {id:'calendar',label:'Appointments',icon:CalendarDays,roles:['admin','reception']},
    {id:'clients',label:'Customers',icon:Users,roles:['admin','reception']},
    {id:'services',label:'Services & Pricing',icon:Sparkles,roles:['admin','reception']},
    {id:'staff',label:'Staff & Accounts',icon:UserCheck,roles:['admin']},
    {id:'invoices',label:'Invoices',icon:FileText,roles:['admin','reception']},
    {id:'expenses',label:'Daily Expenses',icon:Receipt,roles:['admin','reception']},
    {id:'settings',label:'Settings',icon:Settings,roles:['admin']},
    {id:'my-work',label:'My Profile & Work',icon:UserRound,roles:['staff']}
  ];
  const items=all.filter(i=>i.roles.includes(role));
  return <aside className={`fixed top-0 left-0 h-screen bg-white border-r border-[#E8DFD1] z-30 flex flex-col justify-between transition-all ${collapsed?'w-20':'w-64'}`}>
    <div>
      <div className="p-4 border-b border-[#F0ECE1] relative flex items-center justify-between">
        {!collapsed?<div className="flex items-center gap-3"><img src="/logo.jpg" className="w-11 h-11 object-contain rounded-xl border border-[#E8DFD1]"/><div><div className="font-serif-luxury font-bold">GLOSS STUDIO</div><div className="text-[10px] uppercase tracking-widest text-[#C5A059]">CRM</div></div></div>:<img src="/logo.jpg" className="w-10 h-10 object-contain rounded-lg"/>}
        <button onClick={()=>setCollapsed(!collapsed)} className="absolute -right-3 top-6 bg-white border border-[#E8DFD1] rounded-full p-1 text-[#6B7280]">{collapsed?<ChevronRight size={14}/>:<ChevronLeft size={14}/>}</button>
      </div>
      {(role==='admin'||role==='reception')&&<div className="p-3"><button onClick={onOpenAddAppointment} className="w-full py-2.5 gold-gradient-bg text-white rounded-xl font-bold flex items-center justify-center gap-2"><Plus size={17}/>{!collapsed&&'New Booking'}</button></div>}
      <nav className="p-2 space-y-1">{items.map(item=>{const I=item.icon;const active=activeTab===item.id;let badge='';if(item.id==='clients')badge=counts.clients;if(item.id==='staff')badge=counts.staff;if(item.id==='calendar')badge=counts.appointments;return <button key={item.id} onClick={()=>setActiveTab(item.id)} className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm ${active?'bg-[#F7F3EC] text-[#C5A059] border border-[#E8DFD1] font-bold':'text-[#6B7280] hover:bg-[#FAF7F2]'}`}><div className="flex items-center gap-3"><I size={19}/>{!collapsed&&item.label}</div>{!collapsed&&badge!==''&&<span className="text-[10px] bg-[#F3F4F6] px-2 py-0.5 rounded-full">{badge}</span>}</button>})}</nav>
    </div>
    <div className="p-3 border-t border-[#F0ECE1] bg-[#FAF7F2]/50">{!collapsed?<div className="flex items-center justify-between"><div><div className="text-xs font-bold">{currentUser.name}</div><div className="text-[10px] uppercase text-[#C5A059] font-bold">{currentUser.role}</div></div><button onClick={onLogout} className="p-2 text-[#9CA3AF] hover:text-rose-600"><LogOut size={16}/></button></div>:<button onClick={onLogout} className="w-full flex justify-center text-[#9CA3AF]"><LogOut size={18}/></button>}</div>
  </aside>
}
