import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCurrentUser } from "@/lib/supabaseFunctions";
import { User } from "@supabase/supabase-js";

// Define the type for your global context
type GlobalContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
};

// Create context with a proper default value
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

// Custom hook for consuming the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        const response: User | null = await getCurrentUser();
        if (response) {
          setUser(response);
          setIsLoggedIn(true);
          // Optionally store user info in AsyncStorage for persistence
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Failed to fetch current user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Provide context value to children
  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
