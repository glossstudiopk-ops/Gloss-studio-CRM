import React, { useState } from 'react';
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

import {
  INITIAL_KPIS,
  INITIAL_STAFF,
  INITIAL_SERVICES,
  INITIAL_CLIENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_ACTIVITIES
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Core Data States
  const [kpis, setKpis] = useState(INITIAL_KPIS);
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

  // Modal & Drawer States
  const [selectedClient, setSelectedClient] = useState(null);
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [addAppointmentInitialData, setAddAppointmentInitialData] = useState({});
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  // Tab titles
  const tabTitles = {
    dashboard: 'Executive Dashboard',
    calendar: 'Appointments Calendar',
    clients: 'Client Database',
    services: 'Services & Pricing',
    staff: 'Staff Management',
    settings: 'Salon Settings'
  };

  // Handler: Open Add Appointment modal with preset slot data
  const handleOpenAddAppointment = (presetData = {}) => {
    setAddAppointmentInitialData(presetData);
    setIsAddAppointmentOpen(true);
  };

  // Handler: Save New Appointment
  const handleSaveAppointment = (newApt) => {
    setAppointments(prev => [newApt, ...prev]);

    // Update KPI counters
    setKpis(prev => ({
      ...prev,
      todayAppointments: prev.todayAppointments + 1,
      todayRevenue: prev.todayRevenue + newApt.price
    }));

    // Update Activity feed
    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        time: 'Just now',
        text: `New booking: ${newApt.clientName} booked ${newApt.serviceName} with ${newApt.staffName} ($${newApt.price})`,
        category: newApt.category,
        type: 'booking'
      },
      ...prev
    ]);
  };

  // Handler: Save New Client
  const handleSaveClient = (newClient) => {
    setClients(prev => [newClient, ...prev]);
    setKpis(prev => ({
      ...prev,
      newClientsThisWeek: prev.newClientsThisWeek + 1,
      newClientsToday: prev.newClientsToday + 1,
      totalActiveClients: prev.totalActiveClients + 1
    }));
  };

  // Handler: Add CRM Note to Client
  const handleAddNoteToClient = (clientId, newNote) => {
    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          notes: [newNote, ...(c.notes || [])]
        };
      }
      return c;
    }));

    // Also update selectedClient state if drawer is open
    if (selectedClient && selectedClient.id === clientId) {
      setSelectedClient(prev => ({
        ...prev,
        notes: [newNote, ...(prev.notes || [])]
      }));
    }

    // Add activity log
    setActivities(prev => [
      {
        id: `act-${Date.now()}`,
        time: 'Just now',
        text: `Note added to client profile: "${newNote.text.substring(0, 50)}..."`,
        category: 'Aesthetic',
        type: 'note'
      },
      ...prev
    ]);
  };

  // Handler: Add New Service to Catalog
  const handleAddService = (newService) => {
    setServices(prev => [newService, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1F2937] flex">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onOpenAddAppointment={() => handleOpenAddAppointment()}
      />

      {/* Main Content Workspace */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Top Executive Header */}
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenAddAppointment={() => handleOpenAddAppointment()}
          activeTabTitle={tabTitles[activeTab]}
        />

        {/* View Component Renderer */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              kpis={kpis}
              appointments={appointments}
              activities={activities}
              clients={clients}
              onSelectClient={(client) => setSelectedClient(client)}
              onOpenAddAppointment={() => handleOpenAddAppointment()}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'calendar' && (
            <AppointmentsCalendar 
              appointments={appointments}
              staff={staff}
              clients={clients}
              onOpenAddAppointment={handleOpenAddAppointment}
              onSelectClient={(client) => setSelectedClient(client)}
            />
          )}

          {activeTab === 'clients' && (
            <ClientDatabase 
              clients={clients}
              onSelectClient={(client) => setSelectedClient(client)}
              onOpenAddClient={() => setIsAddClientOpen(true)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {activeTab === 'services' && (
            <ServicesPricing 
              services={services}
              onAddService={handleAddService}
            />
          )}

          {activeTab === 'staff' && (
            <StaffManagement 
              staff={staff}
              appointments={appointments}
            />
          )}

          {activeTab === 'settings' && (
            <Settings />
          )}
        </main>
      </div>

      {/* Client Profile Side-Drawer */}
      {selectedClient && (
        <ClientProfileDrawer 
          client={selectedClient}
          onClose={() => setSelectedClient(null)}
          onAddNote={handleAddNoteToClient}
          onOpenAddAppointment={handleOpenAddAppointment}
        />
      )}

      {/* Add Appointment Modal */}
      <AddAppointmentModal 
        isOpen={isAddAppointmentOpen}
        onClose={() => setIsAddAppointmentOpen(false)}
        clients={clients}
        services={services}
        staff={staff}
        onSave={handleSaveAppointment}
        initialData={addAppointmentInitialData}
      />

      {/* Add Client Modal */}
      <AddClientModal 
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSave={handleSaveClient}
      />
    </div>
  );
}
