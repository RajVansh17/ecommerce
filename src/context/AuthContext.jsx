import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { clearToken, setToken } from "../services/api";
import * as authService from "../services/auth";

const AuthContext = createContext(null);
const USER_KEY = "techkraft-user";

const loadStoredUser = () => {
  try {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadStoredUser);
  const [loading, setLoading] = useState(true);

  const persistUser = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  };

  const refreshUser = useCallback(async () => {
    try {
      const profile = await authService.getMe();
      persistUser(profile);
      return profile;
    } catch {
      persistUser(null);
      clearToken();
      return null;
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("techkraft-token");
      if (token) {
        await refreshUser();
      }
      setLoading(false);
    };
    init();
  }, [refreshUser]);

  const login = async (email, password) => {
    const { token, user: userData } = await authService.login(email, password);
    setToken(token);
    persistUser(userData);
    return userData;
  };

  const register = async (firstName, lastName, email, password) => {
    const { token, user: userData } = await authService.register(
      firstName,
      lastName,
      email,
      password
    );
    setToken(token);
    persistUser(userData);
    return userData;
  };

  const logout = () => {
    clearToken();
    persistUser(null);
  };

  const updateProfile = async (data) => {
    const updated = await authService.updateProfile(data);
    persistUser(updated);
    return updated;
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
