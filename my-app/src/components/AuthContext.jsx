import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/axiosInstance"

let accessTokenCache = null;

export const setAccessTokenGlobal = (token) => {
  accessTokenCache = token;
};

export const getAccessToken = () => accessTokenCache;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
      setAccessTokenGlobal(accessToken);
    }, [accessToken]);

    const login = async (credentials) => {
        const res = await api.post("/auth/login", credentials, { withCredentials: true });
        const token = res.data.accessToken;
        setAccessToken(token);
        console.log(`Access token sucessfully recieved: ${token}`)
      };

      const logout = async () => {
        await api.post("/auth/logout", {}, { withCredentials: true });
        setAccessToken(null);
        console.log(`Logout successful!`)
      };

      return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, login, logout }}>
          {children}
        </AuthContext.Provider>
      );
};

export const useAuth = () => useContext(AuthContext);