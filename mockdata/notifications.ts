// app/mockdata/notifications.ts

// Types of notifications for collectors
export type NotificationType =
  | "new_request"
  | "pickup_reminder"
  | "payment"
  | "rating"
  | "system"
  | "promotion";

// Notification data structure
export interface CollectorNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  data?: {
    pickupId?: string;
    userId?: string;
    amount?: string;
    rating?: number;
    linkTo?: string;
  };
}

// Mock notifications for collectors
export const collectorNotifications: CollectorNotification[] = [
  {
    id: "n1",
    type: "new_request",
    title: "New Pickup Request",
    message:
      "Sarah Johnson has requested a plastic waste pickup for today at 16:00.",
    timestamp: "2023-09-30T08:15:00",
    isRead: true,
    data: {
      pickupId: "1",
      userId: "u1",
      linkTo: "/(collector)",
    },
  },
  {
    id: "n2",
    type: "new_request",
    title: "New Pickup Request",
    message:
      "Mohammed Ali has requested a paper waste pickup for today at 13:00.",
    timestamp: "2023-09-30T07:45:00",
    isRead: true,
    data: {
      pickupId: "2",
      userId: "u2",
      linkTo: "/(collector)",
    },
  },
  {
    id: "n3",
    type: "pickup_reminder",
    title: "Upcoming Pickup",
    message:
      "Reminder: You have a glass waste pickup with Fatima Hassan scheduled in 2 hours.",
    timestamp: "2023-09-30T13:30:00",
    isRead: false,
    data: {
      pickupId: "3",
      userId: "u3",
      linkTo: "/(collector)/tasks",
    },
  },
  {
    id: "n4",
    type: "pickup_reminder",
    title: "Upcoming Pickup",
    message:
      "Reminder: You have a metal waste pickup with Ahmed Mahmoud scheduled in 1 hour.",
    timestamp: "2023-09-30T10:15:00",
    isRead: true,
    data: {
      pickupId: "4",
      userId: "u4",
      linkTo: "/(collector)/tasks",
    },
  },
  {
    id: "n5",
    type: "payment",
    title: "Payment Received",
    message:
      "You've received your weekly payment of 850 EGP. Tap to view details.",
    timestamp: "2023-09-28T09:30:00",
    isRead: true,
    data: {
      amount: "850 EGP",
      linkTo: "/(collector)/earnings",
    },
  },
  {
    id: "n6",
    type: "rating",
    title: "New Rating",
    message: "Noura Salem gave you a 5-star rating for your recent pickup.",
    timestamp: "2023-09-29T15:10:00",
    isRead: false,
    data: {
      pickupId: "5",
      userId: "u5",
      rating: 5,
      linkTo: "/(collector)/profile",
    },
  },
  {
    id: "n7",
    type: "rating",
    title: "New Rating",
    message: "Karim Youssef gave you a 5-star rating for your recent pickup.",
    timestamp: "2023-09-29T12:00:00",
    isRead: false,
    data: {
      pickupId: "6",
      userId: "u6",
      rating: 5,
      linkTo: "/(collector)/profile",
    },
  },
  {
    id: "n8",
    type: "system",
    title: "System Maintenance",
    message:
      "The system will undergo maintenance tonight from 02:00 to 04:00 AM.",
    timestamp: "2023-09-30T09:00:00",
    isRead: true,
  },
  {
    id: "n9",
    type: "promotion",
    title: "Bonus Opportunity",
    message: "Complete 5 pickups this weekend to earn a 200 EGP bonus!",
    timestamp: "2023-09-29T18:30:00",
    isRead: false,
    data: {
      linkTo: "/(collector)/earnings",
    },
  },
  {
    id: "n10",
    type: "system",
    title: "App Update Available",
    message:
      "A new version of the app is available with improved features. Please update when convenient.",
    timestamp: "2023-09-28T14:45:00",
    isRead: true,
  },
  {
    id: "n11",
    type: "payment",
    title: "Payment Schedule",
    message: "Your next payment is scheduled for October 5th, 2023.",
    timestamp: "2023-09-28T09:35:00",
    isRead: true,
    data: {
      linkTo: "/(collector)/earnings",
    },
  },
  {
    id: "n12",
    type: "system",
    title: "Account Verification",
    message: "Your account details have been successfully verified.",
    timestamp: "2023-09-27T11:20:00",
    isRead: true,
  },
  {
    id: "n13",
    type: "pickup_reminder",
    title: "Pickup Completed",
    message: "Thank you for completing the pickup for Layla Mahmoud.",
    timestamp: "2023-09-28T13:25:00",
    isRead: true,
    data: {
      pickupId: "7",
      userId: "u7",
      linkTo: "/(collector)/tasks",
    },
  },
  {
    id: "n14",
    type: "promotion",
    title: "New Badge Earned",
    message:
      "Congratulations! You've earned the 'Customer Favorite' badge for your excellent service.",
    timestamp: "2023-09-27T16:00:00",
    isRead: true,
    data: {
      linkTo: "/(collector)/profile",
    },
  },
  {
    id: "n15",
    type: "system",
    title: "Profile Update Reminder",
    message: "Please update your vehicle information in your profile settings.",
    timestamp: "2023-09-26T10:00:00",
    isRead: true,
    data: {
      linkTo: "/(collector)/profile",
    },
  },
];
