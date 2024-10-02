import { createContext, useContext, useLayoutEffect, useState } from "react";
import { sendRequest } from "../utility/sendRequest";

interface AuthContextProps {
  user: any;
  token: string | null;
  fetching: boolean;
  login: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken") || null,
  );
  const [fetching, setFetching] = useState(true);

  console.log(user)

  // Fetch the user data using the token
  const fetchUser = async (token: string | null) => {
    if (!token) return setFetching(false);

    try {
      setFetching(true);
      const res = await sendRequest("/profile", "GET", null);
      setUser(res.data);
    } catch (error: any) {
      console.error("Failed to fetch user:", error.message);
      logout();
    } finally {
      setFetching(false);
    }
  };

  // Login and store token in localStorage
  const login = async (userData: any) => {
    const { token, user } = userData;

    if (token) {
      setToken(token);
      localStorage.setItem("authToken", token);
      setUser(user);

      if (!user) {
        await fetchUser(token);
      }
    } else {
      console.error("Login failed: No token received");
    }
  };

  // Logout and remove the token from localStorage
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    setFetching(false);
  };

  // Check token in localStorage on page load/refresh and fetch user
  useLayoutEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setFetching(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        fetching,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export const contextData = useAuthContext;
