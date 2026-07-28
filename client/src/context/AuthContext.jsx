import { createContext, useEffect, useState } from "react";
import {
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const data = await getProfile();

      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    const data = await registerUser(formData);

    setUser(data.user);

    return data;
  };

  const login = async (formData) => {
    const data = await loginUser(formData);

    setUser(data.user);

    return data;
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;