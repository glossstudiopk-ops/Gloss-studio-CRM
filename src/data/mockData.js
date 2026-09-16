export const INITIAL_KPIS = {
  todayAppointments: 18,
  completedAppointments: 6,
  todayRevenue: 3420,
  revenueChange: "+14% vs avg",
  newClientsThisWeek: 14,
  newClientsToday: 3,
  totalActiveClients: 1248,
  vipClientsCount: 184
};

export const INITIAL_STAFF = [
  {
    id: "staff-1",
    name: "Sarah Jenkins",
    role: "Master Hair Stylist & Colorist",
    category: "Hair",
    status: "In Session",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    appointmentsToday: 5,
    revenueToday: 1150,
    rating: 4.9,
    bio: "Specializing in luxury balayage, precision cuts, and bridal hair design with 10+ years experience."
  },
  {
    id: "staff-2",
    name: "Maya Lin",
    role: "Lead Aesthetician & Skincare Specialist",
    category: "Aesthetic",
    status: "Available",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    appointmentsToday: 4,
    revenueToday: 1280,
    rating: 5.0,
    bio: "Certified in HydraFacials, collagen revival therapies, and advanced anti-aging skin protocols."
  },
  {
    id: "staff-3",
    name: "Marcus Vance",
    role: "Senior Spa & Massage Therapist",
    category: "Spa",
    status: "In Session",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    appointmentsToday: 5,
    revenueToday: 790,
    rating: 4.8,
    bio: "Master of hot stone therapy, deep tissue muscular release, and holistic aromatherapy."
  },
  {
    id: "staff-4",
    name: "Chloe Bennett",
    role: "Hair Specialist & Blowout Expert",
    category: "Hair",
    status: "On Break",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    appointmentsToday: 4,
    revenueToday: 620,
    rating: 4.9,
    bio: "Expert in luxury hair glossing, scalp treatments, and effortless red-carpet blowouts."
  }
];

export const INITIAL_SERVICES = [
  {
    id: "srv-1",
    name: "Signature Balayage & Gloss",
    category: "Hair",
    duration: 120,
    price: 320,
    description: "Custom hand-painted highlights with nourishing gloss finish and signature blowout.",
    popular: true
  },
  {
    id: "srv-2",
    name: "HydraFacial Glow & Lift",
    category: "Aesthetic",
    duration: 75,
    price: 280,
    description: "Deep cleansing, pore extraction, LED light therapy, and hyaluronic acid infusion.",
    popular: true
  },
  {
    id: "srv-3",
    name: "Luxury Aromatherapy Spa Ritual",
    category: "Spa",
    duration: 90,
    price: 220,
    description: "Full-body hot stone massage infused with custom essential oils and organic scalp treatment.",
    popular: true
  },
  {
    id: "srv-4",
    name: "Sculptural Haircut & Blowout",
    category: "Hair",
    duration: 60,
    price: 140,
    description: "Tailored haircut customized to face shape followed by botanical conditioning mask.",
    popular: false
  },
  {
    id: "srv-5",
    name: "Collagen Microneedling Therapy",
    category: "Aesthetic",
    duration: 90,
    price: 450,
    description: "Advanced skin remodeling targeting fine lines, texture, and radiance boost.",
    popular: false
  },
  {
    id: "srv-6",
    name: "Deep Tissue & Muscular Release",
    category: "Spa",
    duration: 60,
    price: 160,
    description: "Targeted therapeutic massage releasing chronic tension and restoring energy.",
    popular: false
  }
];

export const INITIAL_CLIENTS = [
  {
    id: "c-101",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "(555) 234-8901",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    isVip: true,
    lastVisit: "2026-09-10",
    totalSpent: 2450,
    preferredCategory: "Spa",
    preferredStaff: "Marcus Vance",
    notes: [
      { id: "n-1", date: "2026-09-10", author: "Marcus V.", text: "Prefers extra pressure on shoulders. Loves sparkling water with mint." },
      { id: "n-2", date: "2026-08-14", author: "Front Desk", text: "Sensitive to lavender aromas. Always use eucalyptus or chamomile oils." }
    ],
    history: [
      { id: "h-1", date: "2026-09-10", service: "Luxury Aromatherapy Spa Ritual", staff: "Marcus Vance", amount: 220, status: "Completed" },
      { id: "h-2", date: "2026-08-14", service: "HydraFacial Glow & Lift", staff: "Maya Lin", amount: 280, status: "Completed" },
      { id: "h-3", date: "2026-07-02", service: "Signature Balayage & Gloss", staff: "Sarah Jenkins", amount: 320, status: "Completed" }
    ]
  },
  {
    id: "c-102",
    name: "Elena Rostova",
    email: "elena.r@luxurymail.com",
    phone: "(555) 876-1234",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isVip: true,
    lastVisit: "2026-09-12",
    totalSpent: 4100,
    preferredCategory: "Aesthetic",
    preferredStaff: "Maya Lin",
    notes: [
      { id: "n-3", date: "2026-09-12", author: "Maya L.", text: "Allergic to glycolic acid. Responds remarkably well to hyaluronic hydration." },
      { id: "n-4", date: "2026-08-20", author: "Sarah J.", text: "Purchased full size Gloss Gold Serum ($185)." }
    ],
    history: [
      { id: "h-4", date: "2026-09-12", service: "Collagen Microneedling Therapy", staff: "Maya Lin", amount: 450, status: "Completed" },
      { id: "h-5", date: "2026-08-20", service: "HydraFacial Glow & Lift", staff: "Maya Lin", amount: 280, status: "Completed" }
    ]
  },
  {
    id: "c-103",
    name: "Sophia Martinez",
    email: "sophia.m@designs.com",
    phone: "(555) 432-9876",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    isVip: false,
    lastVisit: "2026-09-01",
    totalSpent: 980,
    preferredCategory: "Hair",
    preferredStaff: "Sarah Jenkins",
    notes: [
      { id: "n-5", date: "2026-09-01", author: "Sarah J.", text: "Prefers warm champagne blonde toner, no cool ash tones." }
    ],
    history: [
      { id: "h-6", date: "2026-09-01", service: "Signature Balayage & Gloss", staff: "Sarah Jenkins", amount: 320, status: "Completed" }
    ]
  },
  {
    id: "c-104",
    name: "Victoria Sterling",
    email: "v.sterling@investments.com",
    phone: "(555) 998-2211",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
    isVip: true,
    lastVisit: "2026-09-08",
    totalSpent: 3650,
    preferredCategory: "Aesthetic",
    preferredStaff: "Maya Lin",
    notes: [
      { id: "n-6", date: "2026-09-08", author: "Front Desk", text: "Books standing bi-weekly appointment on Tuesdays at 10 AM." }
    ],
    history: [
      { id: "h-7", date: "2026-09-08", service: "HydraFacial Glow & Lift", staff: "Maya Lin", amount: 280, status: "Completed" }
    ]
  },
  {
    id: "c-105",
    name: "Amanda Chen",
    email: "amanda.chen@techcorp.io",
    phone: "(555) 667-4433",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&auto=format&fit=crop&q=80",
    isVip: false,
    lastVisit: "2026-08-28",
    totalSpent: 640,
    preferredCategory: "Hair",
    preferredStaff: "Chloe Bennett",
    notes: [
      { id: "n-7", date: "2026-08-28", author: "Chloe B.", text: "Loves sleek volume blowout before major tech keynotes." }
    ],
    history: [
      { id: "h-8", date: "2026-08-28", service: "Sculptural Haircut & Blowout", staff: "Chloe Bennett", amount: 140, status: "Completed" }
    ]
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "apt-1",
    clientId: "c-101",
    clientName: "Jane Doe",
    clientPhone: "(555) 234-8901",
    serviceId: "srv-3",
    serviceName: "Luxury Aromatherapy Spa Ritual",
    category: "Spa",
    staffId: "staff-3",
    staffName: "Marcus Vance",
    time: "09:00 AM",
    date: "2026-09-14",
    duration: 90,
    price: 220,
    status: "Completed",
    notes: "Client requested warm herbal tea on arrival."
  },
  {
    id: "apt-2",
    clientId: "c-102",
    clientName: "Elena Rostova",
    clientPhone: "(555) 876-1234",
    serviceId: "srv-2",
    serviceName: "HydraFacial Glow & Lift",
    category: "Aesthetic",
    staffId: "staff-2",
    staffName: "Maya Lin",
    time: "10:30 AM",
    date: "2026-09-14",
    duration: 75,
    price: 280,
    status: "In Progress",
    notes: "Glycolic acid allergy flag checked."
  },
  {
    id: "apt-3",
    clientId: "c-103",
    clientName: "Sophia Martinez",
    clientPhone: "(555) 432-9876",
    serviceId: "srv-1",
    serviceName: "Signature Balayage & Gloss",
    category: "Hair",
    staffId: "staff-1",
    staffName: "Sarah Jenkins",
    time: "11:00 AM",
    date: "2026-09-14",
    duration: 120,
    price: 320,
    status: "Upcoming",
    notes: "Warm champagne tone requested."
  },
  {
    id: "apt-4",
    clientId: "c-104",
    clientName: "Victoria Sterling",
    clientPhone: "(555) 998-2211",
    serviceId: "srv-5",
    serviceName: "Collagen Microneedling Therapy",
    category: "Aesthetic",
    staffId: "staff-2",
    staffName: "Maya Lin",
    time: "02:00 PM",
    date: "2026-09-14",
    duration: 90,
    price: 450,
    status: "Upcoming",
    notes: "VIP standing appointment."
  },
  {
    id: "apt-5",
    clientId: "c-105",
    clientName: "Amanda Chen",
    clientPhone: "(555) 667-4433",
    serviceId: "srv-4",
    serviceName: "Sculptural Haircut & Blowout",
    category: "Hair",
    staffId: "staff-4",
    staffName: "Chloe Bennett",
    time: "03:30 PM",
    date: "2026-09-14",
    duration: 60,
    price: 140,
    status: "Upcoming",
    notes: "Sleek blowout requested."
  },
  {
    id: "apt-6",
    clientId: "c-101",
    clientName: "Jane Doe",
    clientPhone: "(555) 234-8901",
    serviceId: "srv-3",
    serviceName: "Luxury Aromatherapy Spa Ritual",
    category: "Spa",
    staffId: "staff-3",
    staffName: "Marcus Vance",
    time: "05:00 PM",
    date: "2026-09-14",
    duration: 90,
    price: 220,
    status: "Upcoming",
    notes: "Follow-up relaxation session."
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: "act-1",
    time: "10 mins ago",
    text: "Jane Doe completed Luxury Aromatherapy Spa Ritual with Marcus Vance ($220)",
    category: "Spa",
    type: "completed"
  },
  {
    id: "act-2",
    time: "25 mins ago",
    text: "Elena Rostova checked in for HydraFacial Glow & Lift with Maya Lin",
    category: "Aesthetic",
    type: "checkin"
  },
  {
    id: "act-3",
    time: "1 hour ago",
    text: "Sophia Martinez booked Signature Balayage for today at 11:00 AM",
    category: "Hair",
    type: "booking"
  },
  {
    id: "act-4",
    time: "2 hours ago",
    text: "Sarah Jenkins added note to Elena Rostova: 'Purchased Gloss Gold Serum'",
    category: "Aesthetic",
    type: "note"
  },
  {
    id: "act-5",
    time: "3 hours ago",
    text: "New client Amanda Chen booked Sculptural Haircut & Blowout",
    category: "Hair",
    type: "new_client"
  }
];
