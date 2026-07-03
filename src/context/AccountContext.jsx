import React, { createContext, useContext, useState, useCallback } from "react";
import { authAPI } from "../api/api.js";

export const AccountContext = createContext(null);

export function AccountProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("azaratti_user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });

  const save = (u, token) => {
    setUser(u);
    if (u) {
      localStorage.setItem("azaratti_user", JSON.stringify(u));
      localStorage.setItem("azaratti_token", token);
    } else {
      localStorage.removeItem("azaratti_user");
      localStorage.removeItem("azaratti_token");
    }
  };

  const signup = useCallback(async (name, email, password) => {
    const { data } = await authAPI.signup({ name, email, password });
    save(data.user, data.token);
    return data;
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await authAPI.login({ email, password });
    save(data.user, data.token);
    return data;
  }, []);

  const logout = useCallback(() => {
    save(null, null);
  }, []);

  return (
    <AccountContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  return useContext(AccountContext);
}
