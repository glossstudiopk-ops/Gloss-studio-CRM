import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import AppointmentsCalendar from './components/AppointmentsCalendar';
import ClientDatabase from './components/ClientDatabase';
import ClientProfileDrawer from './components/ClientProfileDrawer';
import ServicesPricing from './components/ServicesPricing';
import StaffManagement from './components/StaffManagement';
import Settings from './components/Settings';
import AddAppointmentModal from './components/AddAppointmentModal';
import AddClientModal from './components/AddClientModal';
import Login from './components/Login';
import Invoices from './components/Invoices';
import Expenses from './components/Expenses';
import StaffPortal from './components/StaffPortal';

import {
  INITIAL_STAFF,
  INITIAL_SERVICES,
  INITIAL_CLIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_ACTIVITIES,
  INITIAL_INVOICES,
  INITIAL_EXPENSES,
  INITIAL_ACCOUNTS
} from './data/mockData';

const load=(key,fallback)=>{
  try { const raw=localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }
  catch { return fallback; }
};

export default function App() {
  const [currentUser,setCurrentUser]=useState(()=>load('gloss_session',null));
  const [activeTab,setActiveTab]=useState('dashboard');
  const [sidebarCollapsed,setSidebarCollapsed]=useState(false);
  const [searchQuery,setSearchQuery]=useState('');

  const [accounts,setAccounts]=useState(()=>load('gloss_accounts',INITIAL_ACCOUNTS));
  const [staff,setStaff]=useState(()=>load('gloss_staff',INITIAL_STAFF));
  const [services,setServices]=useState(INITIAL_SERVICES);
  const [clients,setClients]=useState(()=>load('gloss_clients',INITIAL_CLIENTS));
  const [appointments,setAppointments]=useState(()=>load('gloss_appointments',INITIAL_APPOINTMENTS));
  const [activities,setActivities]=useState(()=>load('gloss_activities',INITIAL_ACTIVITIES));
  const [invoices,setInvoices]=useState(()=>load('gloss_invoices',INITIAL_INVOICES));
  const [expenses,setExpenses]=useState(()=>load('gloss_expenses',INITIAL_EXPENSES));

  const [selectedClient,setSelectedClient]=useState(null);
  const [isAddAppointmentOpen,setIsAddAppointmentOpen]=useState(false);
  const [addAppointmentInitialData,setAddAppointmentInitialData]=useState({});
  const [isAddClientOpen,setIsAddClientOpen]=useState(false);

  useEffect(()=>localStorage.setItem('gloss_accounts',JSON.stringify(accounts)),[accounts]);
  useEffect(()=>localStorage.setItem('gloss_staff',JSON.stringify(staff)),[staff]);
  useEffect(()=>localStorage.setItem('gloss_clients',JSON.stringify(clients)),[clients]);
  useEffect(()=>localStorage.setItem('gloss_appointments',JSON.stringify(appointments)),[appointments]);
  useEffect(()=>localStorage.setItem('gloss_activities',JSON.stringify(activities)),[activities]);
  useEffect(()=>localStorage.setItem('gloss_invoices',JSON.stringify(invoices)),[invoices]);
  useEffect(()=>localStorage.setItem('gloss_expenses',JSON.stringify(expenses)),[expenses]);

  const role=currentUser?.role;
  const allowedTabs=role==='admin'
    ? ['dashboard','calendar','clients','services','staff','invoices','expenses','settings']
    : role==='reception'
      ? ['dashboard','calendar','clients','services','invoices','expenses']
      : ['my-work'];

  useEffect(()=>{
    if(currentUser && !allowedTabs.includes(activeTab)) setActiveTab(allowedTabs[0]);
  },[currentUser,activeTab]);

  const kpis=useMemo(()=>{
    const today=new Date().toISOString().slice(0,10);
    const todayA=appointments.filter(a=>a.date===today);
    const todayI=invoices.filter(i=>i.date===today);
    const todayE=expenses.filter(e=>e.date===today);
    return {
      todayAppointments: todayA.length,
      completedAppointments: todayA.filter(a=>a.status==='Completed').length,
      todayRevenue: todayI.reduce((s,i)=>s+Number(i.amount||0),0),
      todayExpenses: todayE.reduce((s,e)=>s+Number(e.amount||0),0),
      totalActiveClients: clients.length,
      vipClientsCount: clients.filter(c=>c.isVip).length
    };
  },[appointments,invoices,expenses,clients]);

  const login=(account)=>{ setCurrentUser(account); localStorage.setItem('gloss_session',JSON.stringify(account)); setActiveTab(account.role==='staff'?'my-work':'dashboard'); };
  const logout=()=>{ setCurrentUser(null); localStorage.removeItem('gloss_session'); setSelectedClient(null); };

  const openAppointment=(preset={})=>{setAddAppointmentInitialData(preset);setIsAddAppointmentOpen(true);};

  const saveClient=(client)=>{
    setClients(prev=>[client,...prev]);
    setActivities(prev=>[{id:`act-${Date.now()}`,time:'Just now',text:`Customer added: ${client.name}`,category:'Aesthetic',type:'new_client'},...prev]);
  };

  const saveAppointment=(apt)=>{
    setAppointments(prev=>[apt,...prev]);
    setActivities(prev=>[{id:`act-${Date.now()}`,time:'Just now',text:`Booking created for ${apt.clientName}: ${apt.serviceName}`,category:'Aesthetic',type:'booking'},...prev]);
  };

  const createInvoice=(invoice)=>{
    setInvoices(prev=>[invoice,...prev]);
    setClients(prev=>prev.map(c=>c.id===invoice.clientId?{
      ...c,
      totalSpent:Number(c.totalSpent||0)+invoice.amount,
      lastVisit:invoice.date,
      history:[{id:'history-'+Date.now(),date:invoice.date,service:invoice.serviceName,staff:'',amount:invoice.amount,status:'Completed'},...(c.history||[])]
    }:c));
    setActivities(prev=>[{id:`act-${Date.now()}`,time:'Just now',text:`Invoice ${invoice.number} generated for ${invoice.clientName} — Rs. ${invoice.amount.toLocaleString()}`,category:'Aesthetic',type:'invoice'},...prev]);
  };

  const addExpense=(expense)=>setExpenses(prev=>[expense,...prev]);

  const addStaff=(member,account)=>{
    setStaff(prev=>[member,...prev]);
    setAccounts(prev=>[...prev,account]);
  };

  const addService=(service)=>setServices(prev=>[service,...prev]);

  if(!currentUser) return <Login accounts={accounts} onLogin={login}/>;

  const titles={dashboard:'Dashboard',calendar:'Appointments',clients:'Customers',services:'Services & Pricing',staff:'Staff & Accounts',invoices:'Invoices',expenses:'Daily Expenses',settings:'Settings','my-work':'My Profile & Work'};
  const myStaff=staff.find(s=>s.id===currentUser.staffId);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2937] flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed}
        onOpenAddAppointment={()=>openAppointment()} role={role} currentUser={currentUser} onLogout={logout}
        counts={{clients:clients.length,staff:staff.length,appointments:kpis.todayAppointments}} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed?'ml-20':'ml-64'}`}>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} onOpenAddAppointment={()=>openAppointment()}
          activeTabTitle={titles[activeTab]} role={role} />
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {activeTab==='dashboard'&&<DashboardOverview kpis={kpis} appointments={appointments} activities={activities} clients={clients} invoices={invoices} expenses={expenses} onOpenAddAppointment={()=>openAppointment()} setActiveTab={setActiveTab} role={role}/>}
          {activeTab==='calendar'&&<AppointmentsCalendar appointments={appointments} staff={staff} clients={clients} onOpenAddAppointment={openAppointment}/>}
          {activeTab==='clients'&&<ClientDatabase clients={clients} onSelectClient={setSelectedClient} onOpenAddClient={()=>setIsAddClientOpen(true)} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}
          {activeTab==='services'&&<ServicesPricing services={services} onAddService={addService} canEdit={role==='admin'}/>}
          {activeTab==='staff'&&role==='admin'&&<StaffManagement staff={staff} appointments={appointments} accounts={accounts} onAddStaff={addStaff}/>}
          {activeTab==='invoices'&&<Invoices invoices={invoices} clients={clients} services={services} onCreateInvoice={createInvoice} canCreate={role==='admin'||role==='reception'}/>}
          {activeTab==='expenses'&&<Expenses expenses={expenses} onAddExpense={addExpense} canCreate={role==='admin'||role==='reception'}/>}
          {activeTab==='settings'&&role==='admin'&&<Settings/>}
          {activeTab==='my-work'&&role==='staff'&&<StaffPortal account={currentUser} staffMember={myStaff} appointments={appointments}/>}
        </main>
      </div>

      {selectedClient&&<ClientProfileDrawer client={selectedClient} onClose={()=>setSelectedClient(null)} onAddNote={(clientId,note)=>setClients(prev=>prev.map(c=>c.id===clientId?{...c,notes:[note,...(c.notes||[])]}:c))} onOpenAddAppointment={openAppointment}/>}
      {(role==='admin'||role==='reception')&&<AddAppointmentModal isOpen={isAddAppointmentOpen} onClose={()=>setIsAddAppointmentOpen(false)} clients={clients} services={services} staff={staff} onSave={saveAppointment} initialData={addAppointmentInitialData}/>}
      {(role==='admin'||role==='reception')&&<AddClientModal isOpen={isAddClientOpen} onClose={()=>setIsAddClientOpen(false)} onSave={saveClient} staff={staff}/>}
    </div>
  );
}
