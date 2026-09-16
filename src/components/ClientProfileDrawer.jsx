import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  Plus, 
  Clock, 
  Sparkles, 
  FileText, 
  UserCheck, 
  CheckCircle,
  Heart,
  AlertTriangle,
  History
} from 'lucide-react';

export default function ClientProfileDrawer({ 
  client, 
  onClose, 
  onAddNote, 
  onOpenAddAppointment 
}) {
  const [newNoteText, setNewNoteText] = useState('');
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' or 'history' or 'preferences'

  if (!client) return null;

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    onAddNote(client.id, {
      id: `n-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      author: 'Sophia Hayes (Manager)',
      text: newNoteText.trim()
    });

    setNewNoteText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Slide-over Drawer Panel */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-slide-in border-l border-[#E8DFD1]">
        
        {/* Header */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#E8DFD1] flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={client.avatar} 
                alt={client.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-[#C5A059] shadow-sm"
              />
              {client.isVip && (
                <span className="absolute -bottom-1 -right-1 bg-[#C5A059] text-white p-1 rounded-full shadow-xs" title="VIP Member">
                  <Crown size={12} />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif-luxury text-2xl font-bold text-[#1F2937]">
                  {client.name}
                </h3>
                {client.isVip && (
                  <span className="text-[10px] bg-[#C5A059] text-white px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                    VIP Member
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-[#6B7280] mt-1">
                <span className="flex items-center space-x-1">
                  <Phone size={12} className="text-[#C5A059]" />
                  <span>{client.phone}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Mail size={12} className="text-[#C5A059]" />
                  <span>{client.email}</span>
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-[#9CA3AF] hover:text-[#1F2937] hover:bg-white rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-3 bg-white border-b border-[#E8DFD1] p-4 text-center">
          <div className="border-r border-[#F0ECE1]">
            <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-semibold">Total Spent</span>
            <span className="text-lg font-bold font-serif-luxury text-[#1F2937]">
              ${client.totalSpent.toLocaleString()}
            </span>
          </div>
          <div className="border-r border-[#F0ECE1]">
            <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-semibold">Fav Category</span>
            <span className="text-xs font-bold text-[#C5A059] mt-1 block">
              {client.preferredCategory}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-semibold">Last Visit</span>
            <span className="text-xs font-semibold text-[#1F2937] mt-1 block">
              {client.lastVisit}
            </span>
          </div>
        </div>

        {/* Navigation Tabs inside Drawer */}
        <div className="flex border-b border-[#E8DFD1] bg-[#FAF7F2] text-xs font-bold">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-3 border-b-2 text-center flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'notes' 
                ? 'border-[#C5A059] text-[#C5A059] bg-white' 
                : 'border-transparent text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            <FileText size={14} />
            <span>CRM Notes ({client.notes ? client.notes.length : 0})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 border-b-2 text-center flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'history' 
                ? 'border-[#C5A059] text-[#C5A059] bg-white' 
                : 'border-transparent text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            <History size={14} />
            <span>Past History ({client.history ? client.history.length : 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('preferences')}
            className={`flex-1 py-3 border-b-2 text-center flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'preferences' 
                ? 'border-[#C5A059] text-[#C5A059] bg-white' 
                : 'border-transparent text-[#6B7280] hover:text-[#1F2937]'
            }`}
          >
            <Heart size={14} />
            <span>Preferences</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">

          {/* TAB 1: CRM NOTES */}
          {activeTab === 'notes' && (
            <div className="space-y-5">
              {/* Form to add new note */}
              <form onSubmit={handleNoteSubmit} className="bg-[#FAF7F2] border border-[#E8DFD1] p-4 rounded-2xl">
                <label className="block text-xs font-bold text-[#1F2937] mb-2 flex items-center space-x-1.5">
                  <Plus size={14} className="text-[#C5A059]" />
                  <span>Add Salon Note / Allergy Alert</span>
                </label>
                <textarea
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  placeholder="e.g., 'Allergic to lavender', 'Prefers stylist Sarah', 'Brought champagne for birthday visit'..."
                  rows="3"
                  className="w-full p-3 text-xs bg-white border border-[#E8DFD1] rounded-xl focus:outline-none focus:border-[#C5A059] text-[#1F2937]"
                ></textarea>
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={!newNoteText.trim()}
                    className="gold-gradient-bg text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-xs hover:brightness-105 disabled:opacity-50"
                  >
                    Save Note
                  </button>
                </div>
              </form>

              {/* Notes List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                  Client Notes Log
                </h4>
                {client.notes && client.notes.length > 0 ? (
                  client.notes.map((n) => (
                    <div 
                      key={n.id} 
                      className="p-3.5 rounded-xl bg-white border border-[#E8DFD1] shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#C5A059] flex items-center space-x-1">
                          <UserCheck size={12} />
                          <span>{n.author}</span>
                        </span>
                        <span className="text-[10px] text-[#9CA3AF]">{n.date}</span>
                      </div>
                      <p className="text-xs text-[#1F2937] leading-relaxed">
                        {n.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#9CA3AF] italic text-center py-6">
                    No notes recorded for this client yet.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: APPOINTMENT HISTORY TIMELINE */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                Past Visits & Treatments
              </h4>

              {client.history && client.history.length > 0 ? (
                <div className="relative border-l-2 border-[#E8DFD1] ml-3 pl-5 space-y-5">
                  {client.history.map((h) => (
                    <div key={h.id} className="relative">
                      {/* Circle icon */}
                      <span className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[#C5A059] ring-4 ring-white"></span>
                      
                      <div className="p-3.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#1F2937] text-sm">{h.service}</span>
                          <span className="font-serif-luxury font-bold text-sm text-[#1F2937]">${h.amount}</span>
                        </div>
                        <div className="flex items-center justify-between text-[#6B7280] text-[11px] pt-1">
                          <span>Specialist: <strong>{h.staff}</strong></span>
                          <span>{h.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#9CA3AF] italic text-center py-6">
                  No previous treatment history available.
                </p>
              )}
            </div>
          )}

          {/* TAB 3: SERVICE PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
                Personalized Service Preferences
              </h4>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD1] space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-2">
                  <span className="text-[#6B7280]">Preferred Specialist:</span>
                  <span className="font-bold text-[#1F2937]">{client.preferredStaff}</span>
                </div>

                <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-2">
                  <span className="text-[#6B7280]">Primary Category:</span>
                  <span className="font-bold text-[#C5A059]">{client.preferredCategory}</span>
                </div>

                <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-2">
                  <span className="text-[#6B7280]">Complimentary Beverage:</span>
                  <span className="font-bold text-[#1F2937]">Sparkling Mint Water / Espresso</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280]">Aromatherapy Preference:</span>
                  <span className="font-bold text-[#1F2937]">Organic Eucalyptus & Chamomile</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DFD1] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenAddAppointment({ clientId: client.id });
            }}
            className="w-full py-2.5 gold-gradient-bg text-white font-bold rounded-xl text-xs shadow-md hover:brightness-105 transition-all flex items-center justify-center space-x-2"
          >
            <Calendar size={16} />
            <span>Book New Appointment for {client.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
