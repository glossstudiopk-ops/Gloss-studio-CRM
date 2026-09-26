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
    id: "srv-6",
    name: "Deep Tissue & Muscular Release",
    category: "Spa",
    duration: 60,
    price: 160,
    description: "Targeted therapeutic massage releasing chronic tension and restoring energy.",
    popular: false
  },
  {
    id: "srv-2",
    name: "PDO cog Thread Lift",
    category: "Aesthetic",
    subcategory: "Threads Lift & Collagen",
    duration: 60,
    price: 20000,
    priceLabel: "Rs. 20,000 / pair",
    description: "Threads Lift & Collagen",
    popular: false
  },
  {
    id: "srv-5",
    name: "PCL cog Thread Lift",
    category: "Aesthetic",
    subcategory: "Threads Lift & Collagen",
    duration: 60,
    price: 25000,
    priceLabel: "Rs. 25,000 / pair",
    description: "Threads Lift & Collagen",
    popular: false
  },
  {
    id: "aesth-003",
    name: "PDO Mono Thread",
    category: "Aesthetic",
    subcategory: "Threads Lift & Collagen",
    duration: 60,
    price: 1500,
    priceLabel: "Rs. 1,500 / thread",
    description: "Threads Lift & Collagen",
    popular: false
  },
  {
    id: "aesth-004",
    name: "PCL Mono Thread",
    category: "Aesthetic",
    subcategory: "Threads Lift & Collagen",
    duration: 60,
    price: 2000,
    priceLabel: "Rs. 2,000 / thread",
    description: "Threads Lift & Collagen",
    popular: false
  },
  {
    id: "aesth-005",
    name: "Korean Fillers",
    category: "Aesthetic",
    subcategory: "Fillers (Hyaluronic & Natural)",
    duration: 60,
    price: 20000,
    priceLabel: "Rs. 20,000 / ml",
    description: "Fillers (Hyaluronic & Natural)",
    popular: true
  },
  {
    id: "aesth-006",
    name: "Italian / German Fine & Deep",
    category: "Aesthetic",
    subcategory: "Fillers (Hyaluronic & Natural)",
    duration: 60,
    price: 45000,
    priceLabel: "Rs. 45,000 / ml",
    description: "Fillers (Hyaluronic & Natural)",
    popular: false
  },
  {
    id: "aesth-007",
    name: "Italian / German Volume",
    category: "Aesthetic",
    subcategory: "Fillers (Hyaluronic & Natural)",
    duration: 60,
    price: 50000,
    priceLabel: "Rs. 50,000 / ml",
    description: "Fillers (Hyaluronic & Natural)",
    popular: false
  },
  {
    id: "aesth-008",
    name: "Bio Filler (10ml)",
    category: "Aesthetic",
    subcategory: "Fillers (Hyaluronic & Natural)",
    duration: 60,
    price: 20000,
    priceLabel: "Rs. 20,000",
    description: "Fillers (Hyaluronic & Natural)",
    popular: false
  },
  {
    id: "aesth-009",
    name: "Bio Filler (20ml)",
    category: "Aesthetic",
    subcategory: "Fillers (Hyaluronic & Natural)",
    duration: 60,
    price: 25000,
    priceLabel: "Rs. 25,000",
    description: "Fillers (Hyaluronic & Natural)",
    popular: false
  },
  {
    id: "aesth-010",
    name: "Forehead horizontal lines",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 8000,
    priceLabel: "8–10 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-011",
    name: "Frown / glabellar lines",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 6000,
    priceLabel: "6–8 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-012",
    name: "Brow lift",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 4000,
    priceLabel: "4 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-013",
    name: "Crow's feet",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 10000,
    priceLabel: "10–12 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-014",
    name: "Under eye lines",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 4000,
    priceLabel: "4–6 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-015",
    name: "Bunny lines",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 2000,
    priceLabel: "2–4 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-016",
    name: "Nasal flaring / Gummy Smile",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 4000,
    priceLabel: "4–8 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-017",
    name: "Nasolabial Folds / Marionette",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 2000,
    priceLabel: "2–4 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-018",
    name: "Masseter",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 24000,
    priceLabel: "24 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-019",
    name: "Dimpled chin",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 4000,
    priceLabel: "4–8 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-020",
    name: "Neck bands / Platysma",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 10000,
    priceLabel: "10–30 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-021",
    name: "Hyperhidrosis (Sweating)",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 100000,
    priceLabel: "100 units × Rs. 1,000/unit",
    description: "Botox Treatments",
    popular: false
  },
  {
    id: "aesth-022",
    name: "Baby Botox Full Face",
    category: "Aesthetic",
    subcategory: "Botox Treatments",
    duration: 60,
    price: 50000,
    priceLabel: "Rs. 50,000",
    description: "Botox Treatments",
    popular: true
  },
  {
    id: "aesth-023",
    name: "Full Cheeks",
    category: "Aesthetic",
    subcategory: "HIFU 9D New Doublo",
    duration: 60,
    price: 10000,
    priceLabel: "Rs. 10,000",
    description: "HIFU 9D New Doublo",
    popular: false
  },
  {
    id: "aesth-024",
    name: "Jawline",
    category: "Aesthetic",
    subcategory: "HIFU 9D New Doublo",
    duration: 60,
    price: 15000,
    priceLabel: "Rs. 15,000",
    description: "HIFU 9D New Doublo",
    popular: false
  },
  {
    id: "aesth-025",
    name: "Eyebrow lift",
    category: "Aesthetic",
    subcategory: "HIFU 9D New Doublo",
    duration: 60,
    price: 7000,
    priceLabel: "Rs. 7,000",
    description: "HIFU 9D New Doublo",
    popular: false
  },
  {
    id: "aesth-026",
    name: "Half Neck / Full Neck",
    category: "Aesthetic",
    subcategory: "HIFU 9D New Doublo",
    duration: 60,
    price: 7000,
    priceLabel: "Rs. 7k - 10k",
    description: "HIFU 9D New Doublo",
    popular: false
  },
  {
    id: "aesth-027",
    name: "Full Face",
    category: "Aesthetic",
    subcategory: "HIFU 9D New Doublo",
    duration: 60,
    price: 30000,
    priceLabel: "Rs. 30,000",
    description: "HIFU 9D New Doublo",
    popular: true
  },
  {
    id: "aesth-028",
    name: "Full Face + Chin + Neck",
    category: "Aesthetic",
    subcategory: "HIFU 9D New Doublo",
    duration: 60,
    price: 40000,
    priceLabel: "Rs. 40,000",
    description: "HIFU 9D New Doublo",
    popular: false
  },
  {
    id: "aesth-029",
    name: "Full Face",
    category: "Aesthetic",
    subcategory: "MFU (RF Cyclone)",
    duration: 60,
    price: 10000,
    priceLabel: "Rs. 10,000",
    description: "MFU (RF Cyclone)",
    popular: true
  },
  {
    id: "aesth-030",
    name: "Cheeks / Jawline / Neck",
    category: "Aesthetic",
    subcategory: "MFU (RF Cyclone)",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000 / ea",
    description: "MFU (RF Cyclone)",
    popular: false
  },
  {
    id: "aesth-031",
    name: "Chin",
    category: "Aesthetic",
    subcategory: "MFU (RF Cyclone)",
    duration: 60,
    price: 4000,
    priceLabel: "Rs. 4,000",
    description: "MFU (RF Cyclone)",
    popular: false
  },
  {
    id: "aesth-032",
    name: "Nasolabial Fold / Laugh Line",
    category: "Aesthetic",
    subcategory: "MFU (RF Cyclone)",
    duration: 60,
    price: 3000,
    priceLabel: "Rs. 3,000",
    description: "MFU (RF Cyclone)",
    popular: false
  },
  {
    id: "aesth-033",
    name: "Marionette Lines",
    category: "Aesthetic",
    subcategory: "MFU (RF Cyclone)",
    duration: 60,
    price: 2000,
    priceLabel: "Rs. 2,000",
    description: "MFU (RF Cyclone)",
    popular: false
  },
  {
    id: "aesth-034",
    name: "Abdomen Cavitation",
    category: "Aesthetic",
    subcategory: "Cavitation Packages & RFMN",
    duration: 60,
    price: 20000,
    priceLabel: "Rs. 20k - 50k / ses",
    description: "Cavitation Packages & RFMN",
    popular: false
  },
  {
    id: "aesth-035",
    name: "Thighs Cavitation",
    category: "Aesthetic",
    subcategory: "Cavitation Packages & RFMN",
    duration: 60,
    price: 15000,
    priceLabel: "Rs. 15k - 30k / ses",
    description: "Cavitation Packages & RFMN",
    popular: false
  },
  {
    id: "aesth-036",
    name: "RFMN Full Face",
    category: "Aesthetic",
    subcategory: "Cavitation Packages & RFMN",
    duration: 60,
    price: 4500,
    priceLabel: "Rs. 4.5k + 15k",
    description: "Cavitation Packages & RFMN",
    popular: false
  },
  {
    id: "aesth-037",
    name: "RFMN Full / Half Cheeks",
    category: "Aesthetic",
    subcategory: "Cavitation Packages & RFMN",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5k - 10k proc",
    description: "Cavitation Packages & RFMN",
    popular: false
  },
  {
    id: "aesth-038",
    name: "Lemon Bottle Double Chin",
    category: "Aesthetic",
    subcategory: "Lipolytic Injections",
    duration: 60,
    price: 20000,
    priceLabel: "Rs. 20,000",
    description: "Lipolytic Injections",
    popular: false
  },
  {
    id: "aesth-039",
    name: "Lemon Bottle Body Fats",
    category: "Aesthetic",
    subcategory: "Lipolytic Injections",
    duration: 60,
    price: 70000,
    priceLabel: "Rs. 70k - 100k",
    description: "Lipolytic Injections",
    popular: false
  },
  {
    id: "aesth-040",
    name: "Lipo Lab Double Chin",
    category: "Aesthetic",
    subcategory: "Lipolytic Injections",
    duration: 60,
    price: 15000,
    priceLabel: "Rs. 15,000",
    description: "Lipolytic Injections",
    popular: false
  },
  {
    id: "aesth-041",
    name: "Lipo Lab Body Fats",
    category: "Aesthetic",
    subcategory: "Lipolytic Injections",
    duration: 60,
    price: 50000,
    priceLabel: "Rs. 50k - 70k",
    description: "Lipolytic Injections",
    popular: false
  },
  {
    id: "aesth-042",
    name: "Lips / Under Eye",
    category: "Aesthetic",
    subcategory: "Pico Laser (Pigment Removal)",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000",
    description: "Pico Laser (Pigment Removal)",
    popular: false
  },
  {
    id: "aesth-043",
    name: "Face / Under Arms",
    category: "Aesthetic",
    subcategory: "Pico Laser (Pigment Removal)",
    duration: 60,
    price: 10000,
    priceLabel: "Rs. 10,000",
    description: "Pico Laser (Pigment Removal)",
    popular: false
  },
  {
    id: "aesth-044",
    name: "Cheeks",
    category: "Aesthetic",
    subcategory: "Pico Laser (Pigment Removal)",
    duration: 60,
    price: 6500,
    priceLabel: "Rs. 6,500",
    description: "Pico Laser (Pigment Removal)",
    popular: false
  },
  {
    id: "aesth-045",
    name: "Chin",
    category: "Aesthetic",
    subcategory: "Pico Laser (Pigment Removal)",
    duration: 60,
    price: 3000,
    priceLabel: "Rs. 3,000",
    description: "Pico Laser (Pigment Removal)",
    popular: false
  },
  {
    id: "aesth-046",
    name: "Feet / Knuckles / Knees",
    category: "Aesthetic",
    subcategory: "Pico Laser (Pigment Removal)",
    duration: 60,
    price: 7000,
    priceLabel: "Rs. 7k - 8k",
    description: "Pico Laser (Pigment Removal)",
    popular: false
  },
  {
    id: "aesth-047",
    name: "Hips / Tattoos",
    category: "Aesthetic",
    subcategory: "Pico Laser (Pigment Removal)",
    duration: 60,
    price: 3000,
    priceLabel: "Rs. 15k / 3k+",
    description: "Pico Laser (Pigment Removal)",
    popular: false
  },
  {
    id: "aesth-048",
    name: "Face Carbon Laser Peel",
    category: "Aesthetic",
    subcategory: "Carbon Laser Peel",
    duration: 60,
    price: 7000,
    priceLabel: "Rs. 7,000",
    description: "Carbon Laser Peel",
    popular: false
  },
  {
    id: "aesth-049",
    name: "Under Arms",
    category: "Aesthetic",
    subcategory: "Carbon Laser Peel",
    duration: 60,
    price: 6000,
    priceLabel: "Rs. 6,000",
    description: "Carbon Laser Peel",
    popular: false
  },
  {
    id: "aesth-050",
    name: "Hands / Knees / Feet",
    category: "Aesthetic",
    subcategory: "Carbon Laser Peel",
    duration: 60,
    price: 6000,
    priceLabel: "Rs. 6,000 ea",
    description: "Carbon Laser Peel",
    popular: false
  },
  {
    id: "aesth-051",
    name: "ExoVital",
    category: "Aesthetic",
    subcategory: "Exosomes & Stem Cells — Human Adipose Tissue-Derived",
    duration: 60,
    price: 45000,
    priceLabel: "Rs. 45,000",
    description: "Exosomes & Stem Cells — Human Adipose Tissue-Derived",
    popular: false
  },
  {
    id: "aesth-052",
    name: "ExoGlow",
    category: "Aesthetic",
    subcategory: "Exosomes & Stem Cells — Human Adipose Tissue-Derived",
    duration: 60,
    price: 45000,
    priceLabel: "Rs. 45,000",
    description: "Exosomes & Stem Cells — Human Adipose Tissue-Derived",
    popular: false
  },
  {
    id: "aesth-053",
    name: "ExoCell Hair",
    category: "Aesthetic",
    subcategory: "Exosomes & Stem Cells — Human Adipose Tissue-Derived",
    duration: 60,
    price: 45000,
    priceLabel: "Rs. 45,000",
    description: "Exosomes & Stem Cells — Human Adipose Tissue-Derived",
    popular: false
  },
  {
    id: "aesth-054",
    name: "ExoRev (per ml)",
    category: "Aesthetic",
    subcategory: "Exosomes & Stem Cells — Plant Derived",
    duration: 60,
    price: 7000,
    priceLabel: "Rs. 7,000",
    description: "Exosomes & Stem Cells — Plant Derived",
    popular: false
  },
  {
    id: "aesth-055",
    name: "ExoRev (5ml Bundle)",
    category: "Aesthetic",
    subcategory: "Exosomes & Stem Cells — Plant Derived",
    duration: 60,
    price: 35000,
    priceLabel: "Rs. 35,000",
    description: "Exosomes & Stem Cells — Plant Derived",
    popular: false
  },
  {
    id: "aesth-056",
    name: "Hair PRP / Face PRP",
    category: "Aesthetic",
    subcategory: "PRP & PRF",
    duration: 60,
    price: 10000,
    priceLabel: "Rs. 10,000",
    description: "PRP & PRF",
    popular: false
  },
  {
    id: "aesth-057",
    name: "Under Eyes PRP",
    category: "Aesthetic",
    subcategory: "PRP & PRF",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000",
    description: "PRP & PRF",
    popular: false
  },
  {
    id: "aesth-058",
    name: "Hair PRF / Face PRF",
    category: "Aesthetic",
    subcategory: "PRP & PRF",
    duration: 60,
    price: 15000,
    priceLabel: "Rs. 15,000",
    description: "PRP & PRF",
    popular: false
  },
  {
    id: "aesth-059",
    name: "Under Eyes PRF",
    category: "Aesthetic",
    subcategory: "PRP & PRF",
    duration: 60,
    price: 7000,
    priceLabel: "Rs. 7,000",
    description: "PRP & PRF",
    popular: false
  },
  {
    id: "aesth-060",
    name: "PRGF Hair",
    category: "Aesthetic",
    subcategory: "PRGF (Plasma Rich in Growth Factors)",
    duration: 60,
    price: 25000,
    priceLabel: "Rs. 25,000",
    description: "PRGF (Plasma Rich in Growth Factors)",
    popular: false
  },
  {
    id: "aesth-061",
    name: "PRGF Face (10ml)",
    category: "Aesthetic",
    subcategory: "PRGF (Plasma Rich in Growth Factors)",
    duration: 60,
    price: 25000,
    priceLabel: "Rs. 25,000",
    description: "PRGF (Plasma Rich in Growth Factors)",
    popular: false
  },
  {
    id: "aesth-062",
    name: "PRGF Face (5ml)",
    category: "Aesthetic",
    subcategory: "PRGF (Plasma Rich in Growth Factors)",
    duration: 60,
    price: 15000,
    priceLabel: "Rs. 15,000",
    description: "PRGF (Plasma Rich in Growth Factors)",
    popular: false
  },
  {
    id: "aesth-063",
    name: "Meso Shine",
    category: "Aesthetic",
    subcategory: "Mesotherapy",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000 / ml",
    description: "Melasma, Sun Spots, PIH | Vit C, Kojic Acid, Mulberry Extract",
    popular: false
  },
  {
    id: "aesth-064",
    name: "Meso Clear",
    category: "Aesthetic",
    subcategory: "Mesotherapy",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000 / ml",
    description: "Acne-prone skin, Dilated pores, Post-acne marks | Salicylic, HA, Vit A",
    popular: false
  },
  {
    id: "aesth-065",
    name: "Meso Radiance",
    category: "Aesthetic",
    subcategory: "Mesotherapy",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000 / ml",
    description: "Severe hyperpigmentation, Dark circles, Intimate areas | Tranexamic, Glutathione",
    popular: false
  },
  {
    id: "aesth-066",
    name: "Meso Hair",
    category: "Aesthetic",
    subcategory: "Mesotherapy",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000 / ml",
    description: "Androgenic alopecia, Hair thinning, Telogen effluvium | Stem cells booster, Biotin",
    popular: false
  },
  {
    id: "aesth-067",
    name: "Meso Scar",
    category: "Aesthetic",
    subcategory: "Mesotherapy",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000 / ml",
    description: "Acne Scars, Chicken Pox Scars | Hyaluronic Acid, Rejuline",
    popular: false
  },
  {
    id: "aesth-068",
    name: "Face / Hands / Feet",
    category: "Aesthetic",
    subcategory: "Chemical Peels (with High Frequency)",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000 / ea",
    description: "Chemical Peels (with High Frequency)",
    popular: false
  },
  {
    id: "aesth-069",
    name: "Neck / Back",
    category: "Aesthetic",
    subcategory: "Chemical Peels (with High Frequency)",
    duration: 60,
    price: 3000,
    priceLabel: "Rs. 3,000 / ea",
    description: "Chemical Peels (with High Frequency)",
    popular: false
  },
  {
    id: "aesth-070",
    name: "Underarms / Underlegs",
    category: "Aesthetic",
    subcategory: "Chemical Peels (with High Frequency)",
    duration: 60,
    price: 7000,
    priceLabel: "Rs. 7,000 / ea",
    description: "Chemical Peels (with High Frequency)",
    popular: false
  },
  {
    id: "aesth-071",
    name: "Full Body Peel",
    category: "Aesthetic",
    subcategory: "Chemical Peels (with High Frequency)",
    duration: 60,
    price: 25000,
    priceLabel: "Rs. 25,000",
    description: "Chemical Peels (with High Frequency)",
    popular: false
  },
  {
    id: "aesth-072",
    name: "Manicure + Chemical Peel",
    category: "Aesthetic",
    subcategory: "Handcare & Footcare Packages",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000",
    description: "Handcare & Footcare Packages",
    popular: false
  },
  {
    id: "aesth-073",
    name: "Pedicure + Chemical Peel",
    category: "Aesthetic",
    subcategory: "Handcare & Footcare Packages",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000",
    description: "Handcare & Footcare Packages",
    popular: false
  },
  {
    id: "aesth-074",
    name: "Handcare + Footcare Package",
    category: "Aesthetic",
    subcategory: "Handcare & Footcare Packages",
    duration: 60,
    price: 8000,
    priceLabel: "Rs. 8,000",
    description: "Handcare & Footcare Packages",
    popular: false
  },
  {
    id: "aesth-075",
    name: "Full Face",
    category: "Aesthetic",
    subcategory: "Laser Hair Removal — Face & Upper Body",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000",
    description: "Laser Hair Removal — Face & Upper Body",
    popular: true
  },
  {
    id: "aesth-076",
    name: "Half Face (undereye to chin)",
    category: "Aesthetic",
    subcategory: "Laser Hair Removal — Face & Upper Body",
    duration: 60,
    price: 3000,
    priceLabel: "Rs. 3,000",
    description: "Laser Hair Removal — Face & Upper Body",
    popular: false
  },
  {
    id: "aesth-077",
    name: "Chin / Side Burns / Ears",
    category: "Aesthetic",
    subcategory: "Laser Hair Removal — Face & Upper Body",
    duration: 60,
    price: 1500,
    priceLabel: "Rs. 1.5k - 2k",
    description: "Laser Hair Removal — Face & Upper Body",
    popular: false
  },
  {
    id: "aesth-078",
    name: "Upper Lips",
    category: "Aesthetic",
    subcategory: "Laser Hair Removal — Face & Upper Body",
    duration: 60,
    price: 1000,
    priceLabel: "Rs. 1,000",
    description: "Laser Hair Removal — Face & Upper Body",
    popular: false
  },
  {
    id: "aesth-079",
    name: "Neck (Front + Back)",
    category: "Aesthetic",
    subcategory: "Laser Hair Removal — Face & Upper Body",
    duration: 60,
    price: 4000,
    priceLabel: "Rs. 4,000",
    description: "Laser Hair Removal — Face & Upper Body",
    popular: false
  },
  {
    id: "aesth-080",
    name: "Full Arms / Under Arms",
    category: "Aesthetic",
    subcategory: "Laser Hair Removal — Face & Upper Body",
    duration: 60,
    price: 4000,
    priceLabel: "Rs. 4k - 7k",
    description: "Laser Hair Removal — Face & Upper Body",
    popular: false
  },
  {
    id: "aesth-081",
    name: "Back / Abdomen",
    category: "Aesthetic",
    subcategory: "Laser Hair Removal — Face & Upper Body",
    duration: 60,
    price: 3000,
    priceLabel: "Rs. 3,000 ea",
    description: "Laser Hair Removal — Face & Upper Body",
    popular: false
  },
  {
    id: "aesth-082",
    name: "Full Legs",
    category: "Aesthetic",
    subcategory: "Laser Hair Removal — Lower Body & Full Package",
    duration: 60,
    price: 8000,
    priceLabel: "Rs. 8,000",
    description: "Laser Hair Removal — Lower Body & Full Package",
    popular: false
  },
  {
    id: "aesth-083",
    name: "Half Legs",
    category: "Aesthetic",
    subcategory: "Laser Hair Removal — Lower Body & Full Package",
    duration: 60,
    price: 4000,
    priceLabel: "Rs. 4,000",
    description: "Laser Hair Removal — Lower Body & Full Package",
    popular: false
  },
  {
    id: "aesth-084",
    name: "Pubic Area",
    category: "Aesthetic",
    subcategory: "Laser Hair Removal — Lower Body & Full Package",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000",
    description: "Laser Hair Removal — Lower Body & Full Package",
    popular: false
  },
  {
    id: "aesth-085",
    name: "Full Body Laser Package",
    category: "Aesthetic",
    subcategory: "Laser Hair Removal — Lower Body & Full Package",
    duration: 60,
    price: 20000,
    priceLabel: "Rs. 20,000",
    description: "Laser Hair Removal — Lower Body & Full Package",
    popular: false
  },
  {
    id: "aesth-086",
    name: "Red Carpet Facial",
    category: "Aesthetic",
    subcategory: "Standard Facials",
    duration: 60,
    price: 7000,
    priceLabel: "Rs. 7,000",
    description: "Standard Facials",
    popular: false
  },
  {
    id: "aesth-087",
    name: "Carbon Laser Peel",
    category: "Aesthetic",
    subcategory: "Standard Facials",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000",
    description: "Standard Facials",
    popular: false
  },
  {
    id: "aesth-088",
    name: "Hydrafacial Regular",
    category: "Aesthetic",
    subcategory: "Standard Facials",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000",
    description: "Standard Facials",
    popular: true
  },
  {
    id: "aesth-089",
    name: "Cleansing Facial",
    category: "Aesthetic",
    subcategory: "Standard Facials",
    duration: 60,
    price: 3500,
    priceLabel: "Rs. 3,500",
    description: "Standard Facials",
    popular: false
  },
  {
    id: "aesth-090",
    name: "Dermapen Microneedling",
    category: "Aesthetic",
    subcategory: "Standard Facials",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000",
    description: "Standard Facials",
    popular: false
  },
  {
    id: "aesth-091",
    name: "Dermaplaning Treatment",
    category: "Aesthetic",
    subcategory: "Standard Facials",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000",
    description: "Standard Facials",
    popular: false
  },
  {
    id: "aesth-092",
    name: "Hydrafacial Advance",
    category: "Aesthetic",
    subcategory: "Premium Facials",
    duration: 60,
    price: 8000,
    priceLabel: "Rs. 8,000",
    description: "Premium Facials",
    popular: false
  },
  {
    id: "aesth-093",
    name: "Baby Botox Facial",
    category: "Aesthetic",
    subcategory: "Premium Facials",
    duration: 60,
    price: 15000,
    priceLabel: "Rs. 15,000",
    description: "Premium Facials",
    popular: false
  },
  {
    id: "aesth-094",
    name: "Medical Grade Hydra Facial",
    category: "Aesthetic",
    subcategory: "Premium Facials",
    duration: 60,
    price: 15000,
    priceLabel: "Rs. 15,000",
    description: "Premium Facials",
    popular: false
  },
  {
    id: "aesth-095",
    name: "Salmon DNA Facial (Anti-Aging)",
    category: "Aesthetic",
    subcategory: "Premium Facials",
    duration: 60,
    price: 10000,
    priceLabel: "Rs. 10,000",
    description: "Premium Facials",
    popular: false
  },
  {
    id: "aesth-096",
    name: "NAD+ IV Infusion",
    category: "Aesthetic",
    subcategory: "NAD+ & Gluta Drips",
    duration: 60,
    price: 10000,
    priceLabel: "Rs. 10,000 / drip",
    description: "NAD+ & Gluta Drips",
    popular: false
  },
  {
    id: "aesth-097",
    name: "Glutax Drip",
    category: "Aesthetic",
    subcategory: "NAD+ & Gluta Drips",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000 / drip",
    description: "NAD+ & Gluta Drips",
    popular: false
  },
  {
    id: "aesth-098",
    name: "Miracle White Swiss Drip",
    category: "Aesthetic",
    subcategory: "NAD+ & Gluta Drips",
    duration: 60,
    price: 15000,
    priceLabel: "Rs. 15,000 / drip",
    description: "NAD+ & Gluta Drips",
    popular: false
  },
  {
    id: "aesth-099",
    name: "Biotac Korean Detox Drip",
    category: "Aesthetic",
    subcategory: "NAD+ & Gluta Drips",
    duration: 60,
    price: 20000,
    priceLabel: "Rs. 20,000 / drip",
    description: "NAD+ & Gluta Drips",
    popular: false
  },
  {
    id: "aesth-100",
    name: "Snow White Drip",
    category: "Aesthetic",
    subcategory: "NAD+ & Gluta Drips",
    duration: 60,
    price: 15000,
    priceLabel: "Rs. 15,000 / drip",
    description: "NAD+ & Gluta Drips",
    popular: false
  },
  {
    id: "aesth-101",
    name: "Bio Rae Booster Whitening",
    category: "Aesthetic",
    subcategory: "NAD+ & Gluta Drips",
    duration: 60,
    price: 18000,
    priceLabel: "Rs. 18,000 / drip",
    description: "NAD+ & Gluta Drips",
    popular: false
  },
  {
    id: "aesth-102",
    name: "Vitamin C Drip",
    category: "Aesthetic",
    subcategory: "NAD+ & Gluta Drips",
    duration: 60,
    price: 5000,
    priceLabel: "Rs. 5,000 / drip",
    description: "NAD+ & Gluta Drips",
    popular: false
  },
  {
    id: "aesth-103",
    name: "Slimming Drip",
    category: "Aesthetic",
    subcategory: "Weight Loss Drips",
    duration: 60,
    price: 7000,
    priceLabel: "Rs. 7,000 / drip",
    description: "Weight Loss Drips",
    popular: false
  },
  {
    id: "aesth-104",
    name: "Metabolism Boost for Weight Loss",
    category: "Aesthetic",
    subcategory: "Weight Loss Drips",
    duration: 60,
    price: 15000,
    priceLabel: "Rs. 15,000 / drip",
    description: "Weight Loss Drips",
    popular: false
  },
  {
    id: "aesth-105",
    name: "Nexus Slimming Drip",
    category: "Aesthetic",
    subcategory: "Weight Loss Drips",
    duration: 60,
    price: 13000,
    priceLabel: "Rs. 13,000 / drip",
    description: "Weight Loss Drips",
    popular: false
  },
  {
    id: "aesth-106",
    name: "Stage 1",
    category: "Aesthetic",
    subcategory: "Electric Cautery (Tags, Warts, Milia)",
    duration: 60,
    price: 1900,
    priceLabel: "Rs. 1,900",
    description: "Electric Cautery (Tags, Warts, Milia)",
    popular: false
  },
  {
    id: "aesth-107",
    name: "Stage 2",
    category: "Aesthetic",
    subcategory: "Electric Cautery (Tags, Warts, Milia)",
    duration: 60,
    price: 3500,
    priceLabel: "Rs. 3,500",
    description: "Electric Cautery (Tags, Warts, Milia)",
    popular: false
  },
  {
    id: "aesth-108",
    name: "Stage 3",
    category: "Aesthetic",
    subcategory: "Electric Cautery (Tags, Warts, Milia)",
    duration: 60,
    price: 4800,
    priceLabel: "Rs. 4,800",
    description: "Electric Cautery (Tags, Warts, Milia)",
    popular: false
  },
  {
    id: "aesth-109",
    name: "Stage 4",
    category: "Aesthetic",
    subcategory: "Electric Cautery (Tags, Warts, Milia)",
    duration: 60,
    price: 5800,
    priceLabel: "Rs. 5,800",
    description: "Electric Cautery (Tags, Warts, Milia)",
    popular: false
  },
  {
    id: "aesth-110",
    name: "Xanthelasma Treatment",
    category: "Aesthetic",
    subcategory: "Electric Cautery (Tags, Warts, Milia)",
    duration: 60,
    price: 0,
    priceLabel: "TCA Peel",
    description: "Electric Cautery (Tags, Warts, Milia)",
    popular: false
  },
  {
    id: "aesth-111",
    name: "Keloid, Acne, Alopecia, etc.",
    category: "Aesthetic",
    subcategory: "Intra-Lesional Steroid",
    duration: 60,
    price: 1500,
    priceLabel: "Rs. 1,500 / ml",
    description: "Intra-Lesional Steroid",
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
