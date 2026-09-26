import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Sparkles, Plus, Check } from 'lucide-react';

export default function AddAppointmentModal({ 
  isOpen, 
  onClose, 
  clients, 
  services, 
  staff, 
  onSave, 
  initialData = {} 
}) {
  const [selectedClientId, setSelectedClientId] = useState(initialData.clientId || (clients[0]?.id || ''));
  const [selectedServiceId, setSelectedServiceId] = useState(initialData.serviceId || (services[0]?.id || ''));
  const [selectedStaffId, setSelectedStaffId] = useState(initialData.staffId || (staff[0]?.id || ''));
  const [time, setTime] = useState(initialData.time || '10:00 AM');
  const [date, setDate] = useState('2026-09-14');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialData.clientId) setSelectedClientId(initialData.clientId);
    if (initialData.staffId) setSelectedStaffId(initialData.staffId);
    if (initialData.time) setTime(initialData.time);
  }, [initialData]);

  if (!isOpen) return null;

  const currentService = services.find(s => s.id === selectedServiceId) || services[0];
  const currentClient = clients.find(c => c.id === selectedClientId) || clients[0];
  const currentStaff = staff.find(st => st.id === selectedStaffId) || staff[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentClient || !currentService || !currentStaff) return;

    onSave({
      id: `apt-${Date.now()}`,
      clientId: currentClient.id,
      clientName: currentClient.name,
      clientPhone: currentClient.phone,
      serviceId: currentService.id,
      serviceName: currentService.name,
      category: currentService.category,
      staffId: currentStaff.id,
      staffName: currentStaff.name,
      time,
      date,
      duration: currentService.duration,
      price: currentService.price,
      status: 'Upcoming',
      notes: notes || 'Standard appointment booking.'
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E8DFD1] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-slide-in">
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center text-[#C5A059]">
              <Sparkles size={18} />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#1F2937]">
                New Salon Booking
              </h3>
              <p className="text-[11px] text-[#6B7280]">Select client, treatment suite, specialist & time</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#1F2937] p-1 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Client Select */}
          <div>
            <label className="block font-bold text-[#1F2937] mb-1">Select Client</label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none font-medium text-[#1F2937]"
            >
              {clients.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.isVip ? '(VIP)' : ''} - {c.phone}
                </option>
              ))}
            </select>
          </div>

          {/* Service Select */}
          <div>
            <label className="block font-bold text-[#1F2937] mb-1">Treatment Service</label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none font-medium text-[#1F2937]"
            >
              {services.map(s => (
                <option key={s.id} value={s.id}>
                  [{s.category}] {s.name} - {s.priceLabel || `${s.price}`} ({s.duration} mins)
                </option>
              ))}
            </select>
          </div>

          {/* Staff Select */}
          <div>
            <label className="block font-bold text-[#1F2937] mb-1">Assigned Specialist</label>
            <select
              value={selectedStaffId}
              onChange={(e) => setSelectedStaffId(e.target.value)}
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none font-medium text-[#1F2937]"
            >
              {staff.map(st => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.role})
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#1F2937] mb-1">Booking Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none text-[#1F2937]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1F2937] mb-1">Time Slot</label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none text-[#1F2937]"
              >
                {['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-bold text-[#1F2937] mb-1">Appointment Notes</label>
            <textarea
              rows="2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Requested green tea, allergy warnings..."
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none text-[#1F2937]"
            ></textarea>
          </div>

          {/* Summary Card */}
          {currentService && (
            <div className="p-3 bg-[#F7F3EC] border border-[#E8DFD1] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#6B7280] uppercase font-bold block">Summary</span>
                <span className="font-bold text-[#1F2937]">{currentService.name}</span>
              </div>
              <div className="text-right">
                <span className="font-serif-luxury text-lg font-bold text-[#1F2937]">{currentService.priceLabel || `${currentService.price}`}</span>
                <span className="text-[10px] text-[#6B7280] block">{currentService.duration ? `${currentService.duration} mins` : 'Duration not set'}</span>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#FAF7F2] text-[#6B7280] rounded-xl font-bold hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 gold-gradient-bg text-white rounded-xl font-bold shadow-md hover:brightness-105"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
