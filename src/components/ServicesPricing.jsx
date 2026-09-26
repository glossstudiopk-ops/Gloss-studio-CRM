import React, { useState } from 'react';
import { Sparkles, Clock, DollarSign, Plus, Scissors, Flower2, Search, Check } from 'lucide-react';

export default function ServicesPricing({ services, onAddService }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newService, setNewService] = useState({
    name: '',
    category: 'Aesthetic',
    duration: 60,
    price: 0,
    description: '',
    popular: false
  });

  const categories = ['All', 'Aesthetic'];

  const filteredServices = services.filter(s => {
    if (activeCategory !== 'All' && s.category !== activeCategory) return false;
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newService.name.trim()) return;

    onAddService({
      ...newService,
      id: `srv-${Date.now()}`
    });

    setShowAddModal(false);
    setNewService({
      name: '',
      category: 'Hair',
      duration: 60,
      price: 150,
      description: '',
      popular: false
    });
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Hair': return Scissors;
      case 'Aesthetic': return Sparkles;
      case 'Spa': return Flower2;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-white border border-[#E8DFD1] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center space-x-1.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl p-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#C5A059] text-white shadow-2xs'
                  : 'text-[#6B7280] hover:text-[#1F2937]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Add CTA */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatment name..."
              className="pl-9 pr-4 py-1.5 text-xs bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:outline-none focus:border-[#C5A059] text-[#1F2937]"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="gold-gradient-bg text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-xs hover:brightness-105 transition-all flex items-center space-x-1"
          >
            <Plus size={16} />
            <span>Add Service</span>
          </button>
        </div>
      </div>

      {/* Services Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredServices.map((service) => {
          const CategoryIcon = getCategoryIcon(service.category);
          return (
            <div 
              key={service.id}
              className="bg-white border border-[#E8DFD1] rounded-2xl p-5 subtle-hover flex flex-col justify-between relative overflow-hidden"
            >
              {service.popular && (
                <span className="absolute top-4 right-4 bg-[#C5A059] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                  Popular
                </span>
              )}

              <div>
                <div className="flex items-center space-x-2 text-xs text-[#C5A059] font-bold mb-2">
                  <CategoryIcon size={14} />
                  <span>{service.subcategory || `${service.category} Suite`}</span>
                </div>

                <h3 className="font-serif-luxury text-xl font-bold text-[#1F2937]">
                  {service.name}
                </h3>

                <p className="text-xs text-[#6B7280] mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#F0ECE1] flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-xs text-[#6B7280]">
                  <Clock size={14} className="text-[#C5A059]" />
                  <span className="font-semibold">{service.duration ? `${service.duration} mins` : 'Duration not set'}</span>
                </div>

                <div className="text-right">
                  <span className="font-serif-luxury text-2xl font-bold text-[#1F2937]">
                    {service.priceLabel || `Rs. ${service.price}`}
                  </span>
                  {service.unitRate && (
                    <span className="block text-[10px] font-semibold text-[#6B7280] mt-1">
                      Flat Rate: Rs. {service.unitRate.toLocaleString()} per unit
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E8DFD1] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
              <h3 className="font-serif-luxury text-xl font-bold text-[#1F2937]">
                Add New Service
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-[#9CA3AF] hover:text-[#1F2937]"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateService} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1F2937] mb-1">Service Title</label>
                <input
                  type="text"
                  required
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  placeholder="e.g. Aesthetic treatment name"
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1F2937] mb-1">Suite Category</label>
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
                  >
                    <option value="Aesthetic">Aesthetic</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#1F2937] mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    required
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1F2937] mb-1">Base Price (Rs.)</label>
                <input
                  type="number"
                  required
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1F2937] mb-1">Description</label>
                <textarea
                  rows="3"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Describe treatment details..."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#E8DFD1] rounded-xl focus:border-[#C5A059] focus:outline-none"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="popular"
                  checked={newService.popular}
                  onChange={(e) => setNewService({ ...newService, popular: e.target.checked })}
                  className="rounded text-[#C5A059] focus:ring-[#C5A059]"
                />
                <label htmlFor="popular" className="font-semibold text-[#1F2937]">Mark as Popular Service</label>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-[#FAF7F2] text-[#6B7280] rounded-xl font-bold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 gold-gradient-bg text-white rounded-xl font-bold hover:brightness-105 shadow-xs"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
