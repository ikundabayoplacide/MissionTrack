import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";

type User = {
  id: string;
  fullName: string;
  email: string;
  role: "manager" | "employee" | string;
  companyId?: string;
  department?: string;
  phoneNumber?: string;
  profilePhoto?: string;
  token: string;
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (
    email: string,
    password: string
  ) => Promise<{ token: string; user: User }>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/users/login`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = response.data; // Axios returns data directly
    if (response.status !== 200) { // Check status for non-2xx responses
      throw new Error(data.message || "Invalid email or password");
    }

    const decoded: User = jwtDecode(data.data.token);

    const newUser: User = {
      id: decoded.id,
      fullName: decoded.fullName,
      email: decoded.email,
      role: decoded.role,
      companyId: decoded.companyId,
      department: decoded.department,
      phoneNumber: decoded.phoneNumber,
      token: data.data.token,
      profilePhoto: decoded.profilePhoto || "",
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return { token: newUser.token, user: newUser };
  };

  const logout = async () => {
    if (user?.token) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/users/logout`,
          {}, // Axios post expects data as second arg, even if empty
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              Accept: "application/json",
            },
          }
        );
      } catch (err) {
        console.warn("Logout request failed:", err);
      }
    }

    // Clear local state + storage regardless
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
