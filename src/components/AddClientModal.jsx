import React, { useState } from 'react';
import { X, UserPlus, Sparkles, Crown } from 'lucide-react';

export default function AddClientModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredCategory, setPreferredCategory] = useState('Aesthetic');
  const [preferredStaff, setPreferredStaff] = useState('Maya Lin');
  const [isVip, setIsVip] = useState(false);
  const [initialNote, setInitialNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSave({
      id: `c-${Date.now()}`,
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: phone.trim() || '(555) 000-0000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      isVip,
      lastVisit: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      preferredCategory,
      preferredStaff,
      notes: initialNote ? [{
        id: `n-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        author: 'Front Desk',
        text: initialNote.trim()
      }] : [],
      history: []
    });

    onClose();
    setName('');
    setEmail('');
    setPhone('');
    setInitialNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white border border-[#E8DFD1] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-slide-in">
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center text-[#C5A059]">
              <UserPlus size={18} />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#1F2937]">
                Register New Client
              </h3>
              <p className="text-[11px] text-[#6B7280]">Add client profile to Gloss Studio CRM</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#9CA3AF] hover:text-[#1F2937]">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-[#1F2937] mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Charlotte Dupont"
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#1F2937] mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#1F2937] mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="charlotte@example.com"
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#1F2937] mb-1">Preferred Suite</label>
              <select
                value={preferredCategory}
                onChange={(e) => setPreferredCategory(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none font-medium text-[#1F2937]"
              >
                <option value="Hair">Hair</option>
                <option value="Aesthetic">Aesthetic</option>
                <option value="Spa">Spa</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#1F2937] mb-1">Preferred Specialist</label>
              <select
                value={preferredStaff}
                onChange={(e) => setPreferredStaff(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none font-medium text-[#1F2937]"
              >
                <option value="Sarah Jenkins">Sarah Jenkins (Hair)</option>
                <option value="Maya Lin">Maya Lin (Aesthetic)</option>
                <option value="Marcus Vance">Marcus Vance (Spa)</option>
                <option value="Chloe Bennett">Chloe Bennett (Hair)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#1F2937] mb-1">Initial CRM Note / Allergies</label>
            <textarea
              rows="2"
              value={initialNote}
              onChange={(e) => setInitialNote(e.target.value)}
              placeholder="e.g. Sensitive skin, prefers herbal tea..."
              className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
            ></textarea>
          </div>

          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="vipCheck"
              checked={isVip}
              onChange={(e) => setIsVip(e.target.checked)}
              className="rounded text-[#C5A059] focus:ring-[#C5A059]"
            />
            <label htmlFor="vipCheck" className="font-bold text-[#1F2937] flex items-center space-x-1">
              <Crown size={14} className="text-[#C5A059]" />
              <span>Enroll as VIP Member</span>
            </label>
          </div>

          <div className="pt-3 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#FAF7F2] text-[#6B7280] rounded-xl font-bold hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 gold-gradient-bg text-white rounded-xl font-bold hover:brightness-105 shadow-xs"
            >
              Save Client Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
