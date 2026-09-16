import React from 'react';
import { UserCheck, Star, Calendar, DollarSign, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export default function StaffManagement({ staff, appointments }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'In Session':
        return 'bg-[#F7F3EC] text-[#C5A059] border-[#E8DFD1] font-bold';
      case 'Available':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold';
      case 'On Break':
        return 'bg-gray-100 text-gray-700 border-gray-200 font-medium';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E8DFD1] rounded-2xl p-6 shadow-xs flex items-center justify-between">
        <div>
          <h3 className="font-serif-luxury text-2xl font-bold text-[#1F2937]">
            Staff & Specialist Roster
          </h3>
          <p className="text-xs text-[#6B7280] mt-1">
            Monitor real-time suite coverage, daily client throughput, and specialist revenue generation.
          </p>
        </div>

        <div className="hidden sm:flex items-center space-x-3 text-xs">
          <div className="bg-[#FAF7F2] border border-[#E8DFD1] px-4 py-2 rounded-xl text-center">
            <span className="text-[#6B7280] block text-[10px] uppercase font-bold">Active Staff</span>
            <span className="text-base font-bold text-[#1F2937] font-serif-luxury">4 On Duty</span>
          </div>
          <div className="bg-[#FAF7F2] border border-[#E8DFD1] px-4 py-2 rounded-xl text-center">
            <span className="text-[#6B7280] block text-[10px] uppercase font-bold">Total Revenue</span>
            <span className="text-base font-bold text-[#C5A059] font-serif-luxury">$3,840 Today</span>
          </div>
        </div>
      </div>

      {/* Staff Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {staff.map((member) => (
          <div 
            key={member.id}
            className="bg-white border border-[#E8DFD1] rounded-2xl p-5 subtle-hover flex flex-col justify-between"
          >
            <div>
              {/* Header Avatar & Status */}
              <div className="flex items-start justify-between">
                <div className="relative">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C5A059] shadow-sm"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-white border border-[#E8DFD1] p-0.5 rounded-full text-[#C5A059]">
                    <Star size={12} fill="#C5A059" />
                  </span>
                </div>

                <span className={`text-[10px] px-2.5 py-1 rounded-full border ${getStatusStyle(member.status)}`}>
                  {member.status}
                </span>
              </div>

              {/* Name & Role */}
              <div className="mt-4">
                <h4 className="font-serif-luxury text-lg font-bold text-[#1F2937]">
                  {member.name}
                </h4>
                <p className="text-xs text-[#C5A059] font-semibold mt-0.5">
                  {member.role}
                </p>
                <p className="text-[11px] text-[#6B7280] mt-2 line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="mt-5 pt-4 border-t border-[#F0ECE1] grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#F0ECE1]">
                <span className="text-[10px] text-[#6B7280] block font-medium">Bookings Today</span>
                <span className="font-bold text-[#1F2937] text-sm mt-0.5 block">
                  {member.appointmentsToday}
                </span>
              </div>

              <div className="bg-[#FAF7F2] p-2 rounded-xl border border-[#F0ECE1]">
                <span className="text-[10px] text-[#6B7280] block font-medium">Revenue</span>
                <span className="font-bold text-[#C5A059] text-sm mt-0.5 block">
                  ${member.revenueToday}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
