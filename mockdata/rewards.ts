export interface LeaderboardEntry {
  name: string;
  points: number;
  isUser?: boolean; // Optional flag for highlighting the current user
}

export interface DigitalReward {
  id: string;
  name: string;
  points: number;
  imageType: "icon" | "url"; // Added
  imageUrl?: string; // Optional now
  imageIdentifier?: string; // Added, used for icon name
}

export interface ProductReward {
  id: string;
  name: string;
  description: string;
  points: number;
  imageType: "icon" | "url"; // Added
  imageUrl?: string; // Optional now
  imageIdentifier?: string; // Added, used for icon name
}

// Note: Leaderboard data might need dynamic insertion of the actual user's points
export const mockLeaderboard: LeaderboardEntry[] = [
  { name: "Sarah K.", points: 2450 },
  { name: "Michael B.", points: 1890 },
  { name: "Jessica L.", points: 1750 },
  { name: "David R.", points: 1520 },
  { name: "Emily C.", points: 1100 },
];

export const mockDigitalRewards: DigitalReward[] = [
  {
    id: "1",
    name: "2GB Mobile Data",
    points: 500,
    imageType: "icon",
    imageIdentifier: "faWifi",
  },
  {
    id: "2",
    name: "Movie Voucher",
    points: 1000,
    imageType: "icon",
    imageIdentifier: "faTicketAlt",
  },
  {
    id: "5",
    name: "Coffee Shop Coupon",
    points: 750,
    imageType: "icon",
    imageIdentifier: "faCoffee",
  },
  {
    id: "6",
    name: "Music Streaming Credit",
    points: 1200,
    imageType: "icon",
    imageIdentifier: "faMusic",
  },
];

export const mockProductRewards: ProductReward[] = [
  {
    id: "3",
    name: "Eco Water Bottle",
    description: "Stainless steel, 750ml",
    points: 1500,
    imageType: "icon",
    imageIdentifier: "faBottleWater",
  },
  {
    id: "4",
    name: "Eco Shopping Bag",
    description: "Reusable tote bag",
    points: 800,
    imageType: "icon",
    imageIdentifier: "faShoppingBag",
  },
  {
    id: "8",
    name: "Seed Starter Kit",
    description: "Grow your own herbs",
    points: 1000,
    imageType: "icon",
    imageIdentifier: "faSeedling",
  },
];
