import React, { createContext, useContext, useState, ReactNode } from "react";

export interface User {
  name: string;
  points: number;
  level: number;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProviderComponent: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    name: "Navilera",
    points: 1000,
    level: 1,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export default UserProviderComponent;
export { UserProviderComponent as UserProvider };
