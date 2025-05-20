import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  iconBg: string;
}

interface NotificationContextType {
  notifications: Notification[];
  showNotifications: boolean;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

const NotificationProviderComponent: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "level-up",
      title: "Level Up!",
      message: "Congratulations! You've reached Eco Green level",
      time: "2 hours ago",
      icon: "level-up-alt",
      iconBg: "blue",
    },
    {
      id: 2,
      type: "pickup",
      title: "Pickup Completed",
      message: "Your recyclables have been collected. +50 points added!",
      time: "Yesterday",
      icon: "truck",
      iconBg: "green",
    },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        showNotifications,
        setNotifications,
        setShowNotifications,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  return context;
};

export default NotificationProviderComponent;
export { NotificationProviderComponent as NotificationProvider };
