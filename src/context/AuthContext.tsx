import { createContext, useContext, useLayoutEffect, useState } from "react";
import { sendRequest } from "../utility/sendRequest";

interface AuthContextProps {
  user: any;
  profile: any;
  token: string | null;
  fetching: boolean;
  login: (userData: any) => Promise<void>;
  fetchUser: (token: any) => Promise<void>;
  logout: () => void;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
}


const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null); // Separate profile state
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken") || null,
  );
  const [fetching, setFetching] = useState(true);

  console.log(user, profile); // Debugging

  // Fetch the user profile based on accountType and partnerType
  const fetchUserProfile = async (
    accountType: string,
    partnerType?: string,
  ) => {
    try {
      setFetching(true);

      let endpoint = "";
      if (accountType === "partner") {
        // Handle partner profile (doctor, lab, pharmacy, etc.)
        if (partnerType === "doctor") {
          endpoint = "/doctors/profile";
        } else if (partnerType === "lab") {
          endpoint = "/labs/profile";
        } else if (partnerType === "pharmacy") {
          endpoint = "/pharmacy/profile";
        }
      } else if (accountType === "member") {
        // Handle member (patient) profile
        endpoint = "/profile";
      }

      const res = await sendRequest(endpoint, "GET", null);
      setProfile(res.data); // Set profile data
    } catch (error: any) {
      console.error("Failed to fetch profile:", error.message);
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

      // Set the user in state
      setUser(user);

      // Fetch the profile based on accountType and partnerType
      if (user.accountType === "partner" && user.partnerType) {
        await fetchUserProfile(user.accountType, user.partnerType);
      } else if (user.accountType === "member") {
        await fetchUserProfile(user.accountType);
      }
    } else {
      console.error("Login failed: No token received");
    }
  };

  // Logout and remove the token from localStorage
  const logout = () => {
    setUser(null);
    setProfile(null); // Reset profile on logout
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

  // Fetch the user data using the token
  const fetchUser = async (token: string | null) => {
    if (!token) return setFetching(false);

    try {
      setFetching(true);
      const res = await sendRequest("/profile", "GET", null);
      setUser(res.data);

      // Fetch profile based on accountType
      if (res.data.accountType === "partner" && res.data.partnerType) {
        await fetchUserProfile(res.data.accountType, res.data.partnerType);
      } else if (res.data.accountType === "member") {
        await fetchUserProfile(res.data.accountType);
      }
    } catch (error: any) {
      console.error("Failed to fetch user:", error.message);
      logout();
    } finally {
      setFetching(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile, // Provide profile data
        token,
        fetching,
        login,
        logout,
        setProfile,
        fetchUser
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
