import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Crown, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  FileText, 
  ChevronRight, 
  UserCheck, 
  Sparkles,
  ArrowUpDown
} from 'lucide-react';

export default function ClientDatabase({ 
  clients, 
  onSelectClient, 
  onOpenAddClient, 
  searchQuery, 
  setSearchQuery 
}) {
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [vipOnlyFilter, setVipOnlyFilter] = useState(false);
  const [sortBy, setSortBy] = useState('totalSpent'); // 'totalSpent' or 'lastVisit' or 'name'

  const filteredClients = clients.filter(client => {
    // Search filter
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // VIP filter
    if (vipOnlyFilter && !client.isVip) return false;

    // Category filter
    if (categoryFilter !== 'All' && client.preferredCategory !== categoryFilter) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'totalSpent') return b.totalSpent - a.totalSpent;
    if (sortBy === 'lastVisit') return new Date(b.lastVisit) - new Date(a.lastVisit);
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-6">
      {/* Control Bar: Search, Category Filter, VIP Toggle, Add Client */}
      <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, email, or phone..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:outline-none focus:border-[#C5A059] focus:bg-white text-[#1F2937]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Category */}
          <div className="flex items-center space-x-1 border border-[#E8DFD1] rounded-xl p-1 bg-[#FAF7F2]">
            {['All', 'Aesthetic', 'Hair', 'Spa'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  categoryFilter === cat
                    ? 'bg-[#C5A059] text-white shadow-2xs font-semibold'
                    : 'text-[#6B7280] hover:text-[#1F2937]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* VIP Toggle */}
          <button
            onClick={() => setVipOnlyFilter(!vipOnlyFilter)}
            className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 font-bold transition-all ${
              vipOnlyFilter 
                ? 'bg-[#C5A059] text-white border-[#C5A059]' 
                : 'bg-[#FAF7F2] text-[#6B7280] border-[#E8DFD1] hover:border-[#C5A059]'
            }`}
          >
            <Crown size={14} className={vipOnlyFilter ? 'text-white' : 'text-[#C5A059]'} />
            <span>VIP Members</span>
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl px-3 py-1.5 text-xs text-[#1F2937] font-semibold focus:outline-none focus:border-[#C5A059]"
          >
            <option value="totalSpent">Sort by Total Spent ($)</option>
            <option value="lastVisit">Sort by Last Visit</option>
            <option value="name">Sort by Name</option>
          </select>

          {/* Add Client CTA */}
          <button
            onClick={onOpenAddClient}
            className="gold-gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:brightness-105 transition-all flex items-center space-x-1.5"
          >
            <Plus size={16} />
            <span>New Client</span>
          </button>
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-white border border-[#E8DFD1] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-[#E8DFD1] text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                <th className="py-3.5 px-6">Client Profile</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Preferred Category</th>
                <th className="py-3.5 px-4">Last Visit</th>
                <th className="py-3.5 px-4 text-right">Lifetime Spend</th>
                <th className="py-3.5 px-4">CRM Notes</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F2EA] text-xs">
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr 
                    key={client.id}
                    onClick={() => onSelectClient(client)}
                    className="hover:bg-[#F7F3EC]/50 transition-colors cursor-pointer group"
                  >
                    {/* Name & Avatar */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img 
                            src={client.avatar} 
                            alt={client.name} 
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#E8DFD1] group-hover:border-[#C5A059] transition-colors"
                          />
                          {client.isVip && (
                            <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white p-0.5 rounded-full shadow-xs" title="VIP Client">
                              <Crown size={10} />
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-[#1F2937] group-hover:text-[#C5A059] text-sm">
                              {client.name}
                            </span>
                            {client.isVip && (
                              <span className="text-[9px] bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 px-1.5 py-0.2 rounded font-bold uppercase tracking-widest">
                                VIP
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#6B7280]">
                            Prefers {client.preferredStaff}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-1.5 text-[#1F2937] font-medium">
                          <Phone size={12} className="text-[#C5A059]" />
                          <span>{client.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-[#6B7280]">
                          <Mail size={12} className="text-[#9CA3AF]" />
                          <span>{client.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Preferred Category */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                        client.preferredCategory === 'Hair' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                        client.preferredCategory === 'Aesthetic' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                        'bg-teal-50 text-teal-800 border-teal-200'
                      }`}>
                        {client.preferredCategory}
                      </span>
                    </td>

                    {/* Last Visit */}
                    <td className="py-4 px-4 text-[#6B7280] font-medium">
                      <div className="flex items-center space-x-1.5">
                        <Calendar size={13} className="text-[#C5A059]" />
                        <span>{client.lastVisit}</span>
                      </div>
                    </td>

                    {/* Total Spend */}
                    <td className="py-4 px-4 text-right">
                      <span className="font-bold text-sm text-[#1F2937] font-serif-luxury">
                        ${client.totalSpent.toLocaleString()}
                      </span>
                    </td>

                    {/* Notes preview */}
                    <td className="py-4 px-4 max-w-xs">
                      {client.notes && client.notes.length > 0 ? (
                        <p className="text-[11px] text-[#6B7280] truncate italic bg-[#FAF7F2] p-1.5 rounded border border-[#E8DFD1]">
                          "{client.notes[0].text}"
                        </p>
                      ) : (
                        <span className="text-[11px] text-[#9CA3AF]">No active notes</span>
                      )}
                    </td>

                    {/* Action button */}
                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => onSelectClient(client)}
                        className="p-1.5 text-[#6B7280] hover:text-[#C5A059] hover:bg-[#FAF7F2] rounded-lg transition-colors"
                        title="View Profile Drawer"
                      >
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-[#6B7280]">
                    <Sparkles size={32} className="mx-auto text-[#C5A059] mb-2" />
                    <p className="font-semibold text-sm">No matching clients found</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">Try adjusting your search query or filters</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
