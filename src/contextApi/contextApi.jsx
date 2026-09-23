import { createContext, useContext, useState } from "react";

const contextApi = createContext();

export const ContextProvider = ({ children }) => {
  const getToken = () => {
    try {
      const stored = localStorage.getItem("JWT_TOKEN");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.warn("Failed to parse JWT_TOKEN from localStorage:", e);
      return localStorage.getItem("JWT_TOKEN") || null;
    }
  };

  const [token, setToken] = useState(getToken);

  const logout = () => {
    localStorage.removeItem("JWT_TOKEN");
    setToken(null);
  };

  const sendData = {
    token,
    setToken,
    logout,
  };

  return <contextApi.Provider value={sendData}>{children}</contextApi.Provider>;
};

export const useStoreContext = () => {
  const context = useContext(contextApi);
  return context;
};
