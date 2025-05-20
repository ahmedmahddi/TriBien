
// Current collector profile
export const currentCollector = {
  id: "c1",
  name: "Ahmed Ibrahim",
  phone: "+201123456789",
  email: "ahmed.ibrahim@example.com",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  rating: 4.8,
  isOnline: true,
  vehicle: {
    type: "Motorcycle",
    licensePlate: "ABC 123",
    model: "Honda CB150R",
    year: 2020,
  },
  workingHours: {
    monday: { start: "09:00", end: "17:00", isWorking: true },
    tuesday: { start: "09:00", end: "17:00", isWorking: true },
    wednesday: { start: "09:00", end: "17:00", isWorking: true },
    thursday: { start: "09:00", end: "17:00", isWorking: true },
    friday: { start: "09:00", end: "15:00", isWorking: true },
    saturday: { start: "10:00", end: "14:00", isWorking: true },
    sunday: { start: "00:00", end: "00:00", isWorking: false },
  },
  joinedDate: "2022-05-15",
};

// Earnings history for current collector
export const earningsHistory = {
  currentBalance: "3,456 EGP",
  pendingPayment: "750 EGP",
  lifetimeEarnings: "28,450 EGP",
  weeklyEarnings: [
    { date: "Mon", amount: 145 },
    { date: "Tue", amount: 165 },
    { date: "Wed", amount: 135 },
    { date: "Thu", amount: 180 },
    { date: "Fri", amount: 120 },
    { date: "Sat", amount: 90 },
    { date: "Sun", amount: 0 },
  ],
  monthlyEarnings: [
    { month: "Jan", amount: 2100 },
    { month: "Feb", amount: 2350 },
    { month: "Mar", amount: 2200 },
    { month: "Apr", amount: 2500 },
    { month: "May", amount: 2400 },
    { month: "Jun", amount: 2600 },
    { month: "Jul", amount: 2450 },
    { month: "Aug", amount: 2700 },
    { month: "Sep", amount: 2300 },
    { month: "Oct", amount: 0 },
    { month: "Nov", amount: 0 },
    { month: "Dec", amount: 0 },
  ],
  recentTransactions: [
    {
      id: "t1",
      date: "2023-09-28",
      type: "deposit",
      amount: "850 EGP",
      description: "Weekly payment",
      status: "completed",
    },
    {
      id: "t2",
      date: "2023-09-21",
      type: "deposit",
      amount: "790 EGP",
      description: "Weekly payment",
      status: "completed",
    },
    {
      id: "t3",
      date: "2023-09-14",
      type: "deposit",
      amount: "910 EGP",
      description: "Weekly payment",
      status: "completed",
    },
    {
      id: "t4",
      date: "2023-09-07",
      type: "deposit",
      amount: "830 EGP",
      description: "Weekly payment",
      status: "completed",
    },
  ],
};

// Performance metrics for current collector
export const performanceMetrics = {
  acceptanceRate: "92%",
  completionRate: "95%",
  averageResponseTime: "3.2 min",
  customerRating: 4.8,
  onTimePerformance: "94%",
  reviewHighlights: [
    {
      id: "r1",
      userName: "Sarah Johnson",
      rating: 5,
      comment:
        "Very professional and on time. Handled the recyclables with care.",
      date: "2023-09-26",
    },
    {
      id: "r2",
      userName: "Mohammed Ali",
      rating: 5,
      comment: "Great service! Ahmed was prompt and courteous.",
      date: "2023-09-22",
    },
    {
      id: "r3",
      userName: "Fatima Hassan",
      rating: 4,
      comment: "Good service overall, arrived a bit later than scheduled.",
      date: "2023-09-18",
    },
    {
      id: "r4",
      userName: "Karim Youssef",
      rating: 5,
      comment: "Very efficient and professional. Will use again!",
      date: "2023-09-15",
    },
  ],
  badges: [
    {
      name: "Punctuality Master",
      description: "Consistently arrives on time",
      earned: "2023-06-12",
    },
    {
      name: "Eco Warrior",
      description: "Collected over 1000kg of waste",
      earned: "2023-04-20",
    },
    {
      name: "Customer Favorite",
      description: "Maintained 4.8+ rating for 3 months",
      earned: "2023-08-01",
    },
    {
      name: "Quick Responder",
      description: "Average response time under 5 minutes",
      earned: "2023-07-15",
    },
  ],
};

// Generate daily stats for the past 30 days
export const dailyStats = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD

  // Generate some random but reasonable stats
  const collectionsCount = Math.floor(Math.random() * 6) + 1; // 1-6 collections per day
  const plasticWeight = Math.floor(Math.random() * 20) + 5; // 5-25kg
  const paperWeight = Math.floor(Math.random() * 15) + 3; // 3-18kg
  const glassWeight = Math.floor(Math.random() * 10) + 2; // 2-12kg
  const metalWeight = Math.floor(Math.random() * 8) + 1; // 1-9kg
  const totalWeight = plasticWeight + paperWeight + glassWeight + metalWeight;

  return {
    date: formattedDate,
    collections: collectionsCount,
    weight: `${totalWeight}kg`,
    breakdown: {
      plastic: `${plasticWeight}kg`,
      paper: `${paperWeight}kg`,
      glass: `${glassWeight}kg`,
      metal: `${metalWeight}kg`,
    },
    earnings: `${totalWeight * 7 + collectionsCount * 20} EGP`, // Simple calculation
    customerRating: (Math.random() * (5 - 4) + 4).toFixed(1), // Rating between 4.0-5.0
  };
});

// Collection analytics aggregated data
export const collectionAnalytics = {
  wasteTypeBreakdown: [
    { type: "Plastic", percentage: 35, color: "#2196F3" },
    { type: "Paper", percentage: 25, color: "#FFC107" },
    { type: "Glass", percentage: 15, color: "#4CAF50" },
    { type: "Metal", percentage: 15, color: "#9C27B0" },
    { type: "Electronics", percentage: 5, color: "#F44336" },
    { type: "Other", percentage: 5, color: "#607D8B" },
  ],
  topCollectionAreas: [
    { area: "Downtown Cairo", percentage: 22, collections: 31 },
    { area: "Zamalek", percentage: 18, collections: 25 },
    { area: "Maadi", percentage: 15, collections: 21 },
    { area: "Heliopolis", percentage: 13, collections: 18 },
    { area: "New Cairo", percentage: 12, collections: 17 },
  ],
  collectionsByDay: [
    { day: "Monday", collections: 24 },
    { day: "Tuesday", collections: 28 },
    { day: "Wednesday", collections: 22 },
    { day: "Thursday", collections: 26 },
    { day: "Friday", collections: 18 },
    { day: "Saturday", collections: 12 },
    { day: "Sunday", collections: 0 },
  ],
  collectionsByTime: [
    { timeSlot: "8:00 - 10:00", collections: 18 },
    { timeSlot: "10:00 - 12:00", collections: 32 },
    { timeSlot: "12:00 - 14:00", collections: 24 },
    { timeSlot: "14:00 - 16:00", collections: 38 },
    { timeSlot: "16:00 - 18:00", collections: 18 },
  ],
};

// Other available collectors in the system (for admin view or referral)
export const otherCollectors = [
  {
    id: "c2",
    name: "Omar Hassan",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 4.6,
    isOnline: true,
    area: "Maadi, Cairo",
    vehicleType: "Pickup Truck",
    joinedDate: "2022-03-10",
  },
  {
    id: "c3",
    name: "Mahmoud Saleh",
    avatar: "https://randomuser.me/api/portraits/men/24.jpg",
    rating: 4.9,
    isOnline: false,
    area: "Heliopolis, Cairo",
    vehicleType: "Motorcycle",
    joinedDate: "2021-11-05",
  },
  {
    id: "c4",
    name: "Hossam Magdy",
    avatar: "https://randomuser.me/api/portraits/men/28.jpg",
    rating: 4.7,
    isOnline: true,
    area: "Dokki, Cairo",
    vehicleType: "Van",
    joinedDate: "2022-07-22",
  },
  {
    id: "c5",
    name: "Amir Khalil",
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
    rating: 4.5,
    isOnline: false,
    area: "New Cairo",
    vehicleType: "Motorcycle",
    joinedDate: "2022-09-15",
  },
];

// Settings and preferences for the current collector
export const collectorSettings = {
  notifications: {
    newPickupRequests: true,
    pickupReminders: true,
    paymentReceipts: true,
    appUpdates: false,
    promotions: false,
  },
  preferredAreas: ["Downtown Cairo", "Zamalek", "Garden City", "Maadi"],
  maxDistance: 15, // in kilometers
  preferredWasteTypes: ["Plastic", "Paper", "Metal"],
  accountSettings: {
    language: "English",
    currency: "EGP",
    darkMode: false,
    soundEffects: true,
  },
  bankDetails: {
    accountName: "Ahmed Ibrahim",
    accountNumber: "XXXX-XXXX-XXXX-1234",
    bankName: "Cairo Bank",
    branchCode: "CAI-001",
  },
};
