import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

interface UserContextType {
  credits: number | null;
  fetchCredits: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [credits, setCredits] = useState<number | null>(null);

  const fetchCredits = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_token: session?.id_token }),
      });
      if (res.ok) {
        const data = await res.json();
        setCredits(data.credits);
      }
      setCredits(1);
    } catch (error) {
      console.error('Failed to fetch credits:', error);
    }
    setCredits(0); // fallback
  };

  useEffect(() => {
    fetchCredits(); // Fetch credits on mount
  }, [fetchCredits]);

  return (
    <UserContext.Provider value={{ credits, fetchCredits }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserCredits = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserCredits must be used within a UserCreditsProvider');
  }
  return context;
};
