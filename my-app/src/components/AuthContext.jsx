import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/axiosInstance"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    const login = async (credentials) => {
        const res = await api.post("http://localhost:3000/api/auth/login", credentials, { withCredentials: true });
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