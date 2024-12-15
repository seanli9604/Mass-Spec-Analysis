import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

interface UserContextType {
  credits: number | null;
  fetchCredits: () => Promise<void>;
  apiToken: string | null;
  fetchApiToken: () => Promise<void>;
  regenApiToken: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session } = useSession();
  const [credits, setCredits] = useState<number | null>(null);
  const [apiToken, setApiToken] = useState<string | null>(null);

  const fetchCredits = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/credits`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session?.id_token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setCredits(data.credits);
      } else {
        setCredits(0);
      }
    } catch (error) {
      console.error('Failed to fetch credits:', error);
      setCredits(0); // fallback in case of error
    }
  };

  const fetchApiToken = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session?.id_token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setApiToken(data.token);
      }
    } catch (error) {
      console.error('Failed to fetch API token:', error);
    }
  };

  const regenApiToken = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session?.id_token}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setApiToken(data.token);
      }
    } catch (error) {
      console.error('Failed to regenerate API token:', error);
    }
  }

  useEffect(() => {
    // Fetch credits and API token on mount
    fetchCredits();
    fetchApiToken();
  }, [fetchCredits, fetchApiToken]);

  return (
    <UserContext.Provider value={{ credits, fetchCredits, apiToken, fetchApiToken, regenApiToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserCredits must be used within a UserContextProvider');
  }
  return context;
};
