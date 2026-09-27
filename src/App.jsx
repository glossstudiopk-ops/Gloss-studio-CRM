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
import { supabase } from './lib/supabase';

const statusToUi=(v)=>({upcoming:'Upcoming',in_progress:'In Progress',completed:'Completed',cancelled:'Cancelled'}[v]||v);
const statusToDb=(v)=>({Upcoming:'upcoming','In Progress':'in_progress',Completed:'completed',Cancelled:'cancelled'}[v]||'upcoming');
const paymentToDb=(v)=>({Cash:'cash',Card:'card','Bank Transfer':'bank_transfer',Online:'online'}[v]||'cash');

export default function App() {
  const [currentUser,setCurrentUser]=useState(null);
  const [authLoading,setAuthLoading]=useState(true);
  const [activeTab,setActiveTab]=useState('dashboard');
  const [sidebarCollapsed,setSidebarCollapsed]=useState(false);
  const [searchQuery,setSearchQuery]=useState('');
  const [staff,setStaff]=useState([]);
  const [services,setServices]=useState([]);
  const [clients,setClients]=useState([]);
  const [appointments,setAppointments]=useState([]);
  const [invoices,setInvoices]=useState([]);
  const [expenses,setExpenses]=useState([]);
  const [profiles,setProfiles]=useState([]);
  const [activities,setActivities]=useState([]);
  const [selectedClient,setSelectedClient]=useState(null);
  const [isAddAppointmentOpen,setIsAddAppointmentOpen]=useState(false);
  const [addAppointmentInitialData,setAddAppointmentInitialData]=useState({});
  const [isAddClientOpen,setIsAddClientOpen]=useState(false);

  const normalizeProfile=p=>({...p,name:p.full_name});

  const fetchProfile=async(userId)=>{
    const {data,error}=await supabase.from('profiles').select('*').eq('id',userId).single();
    if(error) throw error;
    return normalizeProfile(data);
  };

  useEffect(()=>{
    let mounted=true;
    (async()=>{
      const {data}=await supabase.auth.getSession();
      if(data.session?.user){
        try{
          const profile=await fetchProfile(data.session.user.id);
          if(mounted) setCurrentUser(profile);
        }catch{
          await supabase.auth.signOut();
        }
      }
      if(mounted) setAuthLoading(false);
    })();
    const {data:listener}=supabase.auth.onAuthStateChange(async(event,session)=>{
      if(event==='SIGNED_OUT'){ setCurrentUser(null); return; }
      if(session?.user && event==='SIGNED_IN'){
        try{ setCurrentUser(await fetchProfile(session.user.id)); }catch{}
      }
    });
    return ()=>{mounted=false;listener.subscription.unsubscribe();};
  },[]);

  const role=currentUser?.role;
  const allowedTabs=role==='admin'
    ? ['dashboard','calendar','clients','services','staff','invoices','expenses','settings']
    : role==='reception'
      ? ['dashboard','calendar','clients','services','invoices','expenses']
      : ['my-work'];

  useEffect(()=>{
    if(currentUser&&!allowedTabs.includes(activeTab)) setActiveTab(allowedTabs[0]);
  },[currentUser,activeTab,role]);

  const loadData=async()=>{
    if(!currentUser) return;
    const common=[
      supabase.from('services').select('*').eq('active',true).order('subcategory').order('name'),
      supabase.from('staff').select('*').order('full_name'),
      supabase.from('appointments').select('*, clients(full_name,phone), services(name,subcategory), staff(full_name)').order('appointment_date',{ascending:false}).order('appointment_time',{ascending:false})
    ];
    const [servicesRes,staffRes,apptRes]=await Promise.all(common);
    if(servicesRes.error) throw servicesRes.error;
    if(staffRes.error) throw staffRes.error;
    if(apptRes.error) throw apptRes.error;

    setServices((servicesRes.data||[]).map(s=>({
      id:s.id,name:s.name,category:s.category,subcategory:s.subcategory,duration:s.duration_minutes,
      price:Number(s.base_price||0),priceLabel:s.price_label,unitRate:s.unit_rate?Number(s.unit_rate):null,
      units:s.units_label,description:s.description,popular:false
    })));
    setStaff((staffRes.data||[]).map(s=>({
      id:s.id,name:s.full_name,role:s.job_title,category:s.category,status:s.status,bio:s.bio||'',email:s.email||'',authUserId:s.auth_user_id
    })));
    setAppointments((apptRes.data||[]).map(a=>({
      id:a.id,clientId:a.client_id,clientName:a.clients?.full_name||'',clientPhone:a.clients?.phone||'',
      serviceId:a.service_id,serviceName:a.services?.name||'',category:'Aesthetic',
      staffId:a.staff_id,staffName:a.staff?.full_name||'',time:String(a.appointment_time||'').slice(0,5),
      date:a.appointment_date,duration:null,price:Number(a.final_price||0),status:statusToUi(a.status),notes:a.notes||''
    })));

    if(role==='admin'||role==='reception'){
      const [clientsRes,notesRes,invoicesRes,itemsRes,expensesRes]=await Promise.all([
        supabase.from('clients').select('*').order('created_at',{ascending:false}),
        supabase.from('client_notes').select('*').order('created_at',{ascending:false}),
        supabase.from('invoices').select('*').order('created_at',{ascending:false}),
        supabase.from('invoice_items').select('*'),
        supabase.from('expenses').select('*').order('expense_date',{ascending:false}).order('created_at',{ascending:false})
      ]);
      if(clientsRes.error) throw clientsRes.error;
      if(notesRes.error) throw notesRes.error;
      if(invoicesRes.error) throw invoicesRes.error;
      if(itemsRes.error) throw itemsRes.error;
      if(expensesRes.error) throw expensesRes.error;

      const notesByClient={};
      (notesRes.data||[]).forEach(n=>{
        (notesByClient[n.client_id] ||= []).push({id:n.id,date:String(n.created_at).slice(0,10),author:'CRM User',text:n.note});
      });
      const itemsByInvoice={};
      (itemsRes.data||[]).forEach(i=>{(itemsByInvoice[i.invoice_id] ||= []).push(i);});
      const invoiceList=(invoicesRes.data||[]).map(i=>{
        const item=(itemsByInvoice[i.id]||[])[0];
        const client=(clientsRes.data||[]).find(c=>c.id===i.client_id);
        return {
          id:i.id,number:i.invoice_number,date:i.invoice_date,clientId:i.client_id,clientName:client?.full_name||'',
          serviceId:item?.service_id||'',serviceName:item?.description||'',quantity:Number(item?.quantity||1),
          amount:Number(i.total||0),paymentMethod:String(i.payment_method||'cash').replace('_',' '),createdAt:i.created_at
        };
      });
      setInvoices(invoiceList);

      const historyByClient={};
      (apptRes.data||[]).forEach(a=>{
        (historyByClient[a.client_id] ||= []).push({
          id:'visit-'+a.id,
          date:a.appointment_date,
          time:String(a.appointment_time||'').slice(0,5),
          service:a.services?.name||'Treatment',
          staff:a.staff?.full_name||'',
          amount:Number(a.final_price||0),
          status:statusToUi(a.status),
          notes:a.notes||''
        });
      });
      setClients((clientsRes.data||[]).map(c=>({
        id:c.id,name:c.full_name,phone:c.phone||'',email:c.email||'',isVip:c.is_vip,
        preferredCategory:'Aesthetic',preferredStaff:'',lastVisit:c.last_visit||'',
        totalSpent:Number(c.total_spent||0),notes:notesByClient[c.id]||[],history:historyByClient[c.id]||[]
      })));
      setExpenses((expensesRes.data||[]).map(e=>({
        id:e.id,title:e.title,category:e.category,amount:Number(e.amount||0),date:e.expense_date,note:e.note||'',createdAt:e.created_at
      })));
      setActivities([]);
      if(role==='admin'){
        const {data:profileRows,error:profileError}=await supabase.from('profiles').select('*').order('created_at');
        if(profileError) throw profileError;
        setProfiles((profileRows||[]).map(normalizeProfile));
      }else setProfiles([]);
    }else{
      setClients([]);setInvoices([]);setExpenses([]);setProfiles([]);setActivities([]);
    }
  };

  useEffect(()=>{
    if(!currentUser) return;
    loadData().catch(err=>console.error('CRM load error',err));
  },[currentUser?.id,currentUser?.role]);

  const kpis=useMemo(()=>{
    const today=new Date().toISOString().slice(0,10);
    const todayA=appointments.filter(a=>a.date===today);
    const todayI=invoices.filter(i=>i.date===today);
    const todayE=expenses.filter(e=>e.date===today);
    return {
      todayAppointments:todayA.length,
      completedAppointments:todayA.filter(a=>a.status==='Completed').length,
      todayRevenue:todayI.reduce((s,i)=>s+Number(i.amount||0),0),
      todayExpenses:todayE.reduce((s,e)=>s+Number(e.amount||0),0),
      totalActiveClients:clients.length,
      vipClientsCount:clients.filter(c=>c.isVip).length
    };
  },[appointments,invoices,expenses,clients]);

  const logout=async()=>{await supabase.auth.signOut();setCurrentUser(null);};
  const openAppointment=(preset={})=>{setAddAppointmentInitialData(preset);setIsAddAppointmentOpen(true);};

  const saveClient=async(client)=>{
    const {error}=await supabase.from('clients').insert({
      full_name:client.name,phone:client.phone||null,email:client.email||null,is_vip:client.isVip,
      created_by:currentUser.id
    });
    if(error) return alert(error.message);
    await loadData();
  };

  const saveAppointment=async(apt)=>{
    const {data,error}=await supabase.rpc('create_booking_from_reception',{
      p_customer_name:apt.customerName,
      p_customer_phone:apt.customerPhone||null,
      p_customer_email:apt.customerEmail||null,
      p_service_id:apt.serviceId,
      p_staff_id:apt.staffId,
      p_appointment_date:apt.date,
      p_appointment_time:apt.time,
      p_final_price:Number(apt.price||0),
      p_notes:apt.notes||null
    });
    if(error) return {ok:false,message:error.message};
    await loadData();
    return {ok:true,isNewClient:!!data?.is_new_client,clientId:data?.client_id,appointmentId:data?.appointment_id};
  };

  const createInvoice=async(invoice)=>{
    const {data:row,error}=await supabase.from('invoices').insert({
      invoice_number:invoice.number,client_id:invoice.clientId,invoice_date:invoice.date,
      subtotal:invoice.amount,total:invoice.amount,payment_method:paymentToDb(invoice.paymentMethod),
      created_by:currentUser.id
    }).select('id').single();
    if(error) return alert(error.message);
    const {error:itemError}=await supabase.from('invoice_items').insert({
      invoice_id:row.id,service_id:invoice.serviceId||null,description:invoice.serviceName,
      quantity:invoice.quantity||1,unit_price:Number(invoice.amount)/(Number(invoice.quantity)||1),line_total:invoice.amount
    });
    if(itemError) return alert(itemError.message);
    const client=clients.find(c=>c.id===invoice.clientId);
    if(client){
      await supabase.from('clients').update({
        total_spent:Number(client.totalSpent||0)+Number(invoice.amount||0),
        last_visit:invoice.date
      }).eq('id',client.id);
    }
    await loadData();
  };

  const addExpense=async(expense)=>{
    const {error}=await supabase.from('expenses').insert({
      expense_date:expense.date,title:expense.title,category:expense.category,amount:expense.amount,
      note:expense.note||null,created_by:currentUser.id
    });
    if(error) return alert(error.message);
    await loadData();
  };

  const addStaffOrUser=async(payload)=>{
    const {data,error}=await supabase.functions.invoke('create-crm-user',{body:payload});
    if(error){
      let message=error.message||'Could not create account';
      try{
        const body=await error.context?.json?.();
        if(body?.error) message=body.error;
      }catch{}
      return {ok:false,message};
    }
    if(data?.error) return {ok:false,message:data.error};
    await loadData();
    return {ok:true,message:data?.message||'Account created successfully.',alreadyExists:!!data?.already_exists};
  };

  const addService=async(service)=>{
    const id=service.id||'custom-'+Date.now();
    const {error}=await supabase.from('services').insert({
      id,name:service.name,category:'Aesthetic',subcategory:service.subcategory||'Custom',
      duration_minutes:service.duration||null,base_price:Number(service.price||0),
      price_label:service.priceLabel||('Rs. '+Number(service.price||0).toLocaleString()),
      description:service.description||null,active:true
    });
    if(error) return alert(error.message);
    await loadData();
  };

  const addNote=async(clientId,note)=>{
    const {error}=await supabase.from('client_notes').insert({client_id:clientId,note:note.text,created_by:currentUser.id});
    if(error) return alert(error.message);
    await loadData();
    setSelectedClient(prev=>prev?{...prev,notes:[{...note,author:currentUser.name},...(prev.notes||[])]}:prev);
  };

  if(authLoading) return <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-sm text-[#6B7280]">Loading Gloss Studio CRM...</div>;
  if(!currentUser) return <Login onLogin={setCurrentUser}/>;

  const titles={dashboard:'Dashboard',calendar:'Appointments',clients:'Customers',services:'Services & Pricing',staff:'Staff & Accounts',invoices:'Invoices',expenses:'Daily Expenses',settings:'Settings','my-work':'My Profile & Work'};
  const myStaff=staff.find(s=>s.authUserId===currentUser.id);

  return <div className="min-h-screen bg-[#FAF7F2] text-[#1F2937] flex">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed}
      onOpenAddAppointment={()=>openAppointment()} role={role} currentUser={currentUser} onLogout={logout}
      counts={{clients:clients.length,staff:staff.length,appointments:kpis.todayAppointments}}/>
    <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed?'ml-20':'ml-64'}`}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} onOpenAddAppointment={()=>openAppointment()} activeTabTitle={titles[activeTab]} role={role}/>
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        {activeTab==='dashboard'&&<DashboardOverview kpis={kpis} appointments={appointments} activities={activities} clients={clients} invoices={invoices} expenses={expenses} onOpenAddAppointment={()=>openAppointment()} setActiveTab={setActiveTab} role={role}/>}
        {activeTab==='calendar'&&<AppointmentsCalendar appointments={appointments} staff={staff} clients={clients} onOpenAddAppointment={openAppointment}/>}
        {activeTab==='clients'&&<ClientDatabase clients={clients} onSelectClient={setSelectedClient} onOpenAddClient={()=>setIsAddClientOpen(true)} searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>}
        {activeTab==='services'&&<ServicesPricing services={services} onAddService={addService} canEdit={role==='admin'}/>}
        {activeTab==='staff'&&role==='admin'&&<StaffManagement staff={staff} appointments={appointments} accounts={profiles} onAddStaff={addStaffOrUser}/>}
        {activeTab==='invoices'&&<Invoices invoices={invoices} clients={clients} services={services} onCreateInvoice={createInvoice} canCreate={role==='admin'||role==='reception'}/>}
        {activeTab==='expenses'&&<Expenses expenses={expenses} onAddExpense={addExpense} canCreate={role==='admin'||role==='reception'}/>}
        {activeTab==='settings'&&role==='admin'&&<Settings/>}
        {activeTab==='my-work'&&role==='staff'&&<StaffPortal account={currentUser} staffMember={myStaff} appointments={appointments}/>}
      </main>
    </div>

    {selectedClient&&<ClientProfileDrawer client={selectedClient} onClose={()=>setSelectedClient(null)} onAddNote={addNote} onOpenAddAppointment={openAppointment}/>}
    {(role==='admin'||role==='reception')&&<AddAppointmentModal isOpen={isAddAppointmentOpen} onClose={()=>setIsAddAppointmentOpen(false)} clients={clients} services={services} staff={staff} onSave={saveAppointment} initialData={addAppointmentInitialData}/>}
    {(role==='admin'||role==='reception')&&<AddClientModal isOpen={isAddClientOpen} onClose={()=>setIsAddClientOpen(false)} onSave={saveClient} staff={staff}/>}
  </div>
}
