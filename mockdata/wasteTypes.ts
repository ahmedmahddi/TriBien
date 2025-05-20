// app/mockdata/wasteTypes.ts

// Waste type details
export interface WasteType {
  id: string;
  name: string;
  description: string;
  icon: string; // FontAwesome icon name or image URL
  color: string;
  pointsPerKg: number;
  pricePerKg: number; // in EGP
  acceptanceGuidelines: string[];
  rejectionCriteria: string[];
}

// Mock waste types data
export const wasteTypes: WasteType[] = [
  {
    id: "wt1",
    name: "Plastic",
    description: "Clean plastic bottles, containers, and packaging",
    icon: "bottle-water",
    color: "#2196F3", // Blue
    pointsPerKg: 50,
    pricePerKg: 7,
    acceptanceGuidelines: [
      "Clean and empty containers",
      "Remove all labels when possible",
      "Separate by plastic type (PET, HDPE, etc.)",
      "Remove caps and place them separately",
    ],
    rejectionCriteria: [
      "Containers with food residue",
      "Plastic bags with food waste",
      "Plastic materials with chemical residue",
      "Medical waste plastic",
    ],
  },
  {
    id: "wt2",
    name: "Paper",
    description: "Newspapers, magazines, cardboard, and office paper",
    icon: "newspaper",
    color: "#FFC107", // Amber
    pointsPerKg: 30,
    pricePerKg: 5,
    acceptanceGuidelines: [
      "Clean and dry paper",
      "Flattened cardboard boxes",
      "Neatly stacked newspapers",
      "Books with covers removed",
    ],
    rejectionCriteria: [
      "Wet or soiled paper",
      "Tissues or paper towels",
      "Paper with food residue",
      "Waxed or laminated paper",
    ],
  },
  {
    id: "wt3",
    name: "Glass",
    description: "Glass bottles and jars",
    icon: "wine-bottle",
    color: "#4CAF50", // Green
    pointsPerKg: 40,
    pricePerKg: 6,
    acceptanceGuidelines: [
      "Clean and empty bottles",
      "Separated by color (clear, green, brown)",
      "Remove all caps and lids",
      "No broken glass",
    ],
    rejectionCriteria: [
      "Broken glass",
      "Ceramics or porcelain",
      "Light bulbs or fluorescent tubes",
      "Window glass or mirrors",
    ],
  },
  {
    id: "wt4",
    name: "Metal",
    description: "Aluminum cans, steel containers, and small metal items",
    icon: "can-food",
    color: "#9C27B0", // Purple
    pointsPerKg: 60,
    pricePerKg: 10,
    acceptanceGuidelines: [
      "Clean and empty cans",
      "Flattened when possible",
      "Remove paper labels",
      "Small metal items only",
    ],
    rejectionCriteria: [
      "Containers with food residue",
      "Paint cans with residue",
      "Hazardous material containers",
      "Large metal objects",
    ],
  },
  {
    id: "wt5",
    name: "Electronics",
    description: "Small electronic devices, phones, and accessories",
    icon: "laptop",
    color: "#F44336", // Red
    pointsPerKg: 80,
    pricePerKg: 15,
    acceptanceGuidelines: [
      "Intact devices (not disassembled)",
      "Batteries removed when possible",
      "Personal data wiped from devices",
      "Include chargers and accessories",
    ],
    rejectionCriteria: [
      "Large appliances",
      "Devices with leaked batteries",
      "CRT monitors or TVs",
      "Devices with broken glass components",
    ],
  },
  {
    id: "wt6",
    name: "Organic",
    description: "Food waste, plant trimmings, and biodegradable materials",
    icon: "apple-whole",
    color: "#8BC34A", // Light Green
    pointsPerKg: 20,
    pricePerKg: 3,
    acceptanceGuidelines: [
      "Fruit and vegetable scraps",
      "Coffee grounds and tea bags",
      "Plant trimmings and leaves",
      "Eggshells and nutshells",
    ],
    rejectionCriteria: [
      "Meat or dairy products",
      "Oily or greasy food waste",
      "Pet waste",
      "Diseased plants",
    ],
  },
  {
    id: "wt7",
    name: "Textile",
    description: "Clothing, linens, and fabric scraps",
    icon: "shirt",
    color: "#FF9800", // Orange
    pointsPerKg: 45,
    pricePerKg: 8,
    acceptanceGuidelines: [
      "Clean, dry clothing",
      "Sorted by type (cotton, wool, etc.)",
      "Paired shoes and accessories",
      "Neatly folded items",
    ],
    rejectionCriteria: [
      "Wet or moldy textiles",
      "Heavily soiled or stained items",
      "Items with chemical odors",
      "Fabric with attached metal or plastic",
    ],
  },
  {
    id: "wt8",
    name: "Mixed",
    description: "Combination of multiple recyclable materials",
    icon: "recycle",
    color: "#607D8B", // Blue Grey
    pointsPerKg: 35,
    pricePerKg: 6,
    acceptanceGuidelines: [
      "Clean recyclable items",
      "Separated by type when possible",
      "No food waste mixed in",
      "No hazardous materials",
    ],
    rejectionCriteria: [
      "Contaminated materials",
      "Non-recyclable items mixed in",
      "Hazardous waste",
      "Medical waste",
    ],
  },
];

// Waste pricing tiers (for volume discounts)
export const wastePricingTiers = [
  {
    id: "tier1",
    name: "Standard",
    minimumWeight: 0, // in kg
    maximumWeight: 10, // in kg
    multiplier: 1.0, // Standard rate
  },
  {
    id: "tier2",
    name: "Bronze",
    minimumWeight: 10,
    maximumWeight: 25,
    multiplier: 1.1, // 10% bonus
  },
  {
    id: "tier3",
    name: "Silver",
    minimumWeight: 25,
    maximumWeight: 50,
    multiplier: 1.2, // 20% bonus
  },
  {
    id: "tier4",
    name: "Gold",
    minimumWeight: 50,
    maximumWeight: 100,
    multiplier: 1.35, // 35% bonus
  },
  {
    id: "tier5",
    name: "Platinum",
    minimumWeight: 100,
    maximumWeight: Infinity,
    multiplier: 1.5, // 50% bonus
  },
];

// Special campaigns or promotions for waste collection
export const wastePromotions = [
  {
    id: "promo1",
    title: "E-Waste Drive",
    description: "Double points for all electronics recycling",
    wasteTypeId: "wt5",
    multiplier: 2.0,
    startDate: "2023-10-01",
    endDate: "2023-10-15",
  },
  {
    id: "promo2",
    title: "Plastic Challenge",
    description: "Earn 20% more for plastic recycling this month",
    wasteTypeId: "wt1",
    multiplier: 1.2,
    startDate: "2023-10-01",
    endDate: "2023-10-31",
  },
  {
    id: "promo3",
    title: "Weekend Warrior",
    description: "25% bonus points for all collections on weekends",
    wasteTypeId: "all",
    multiplier: 1.25,
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    conditions: "Only valid for Saturday and Sunday collections",
  },
];
