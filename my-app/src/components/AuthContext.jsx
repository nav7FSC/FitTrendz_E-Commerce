import { createContext, useContext, useState, useEffect, useMemo } from "react";
import api from "../services/axiosInstance"

let accessTokenCache = null;

export const setAccessTokenGlobal = (token) => {
  accessTokenCache = token;
};

export const getAccessToken = () => accessTokenCache;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);
    //const isAuthenticated = !!accessToken;

    useEffect(() => {
      setAccessTokenGlobal(accessToken);
      console.log(`current access token ${accessToken}`)
    }, [accessToken]);

    const login = async (credentials) => {
        const res = await api.post("/auth/login", credentials, { withCredentials: true });
        const token = res.data.accessToken;
        setAccessToken(token);
        console.log(`Access token sucessfully recieved: ${token}`)
      };

      const logout = async () => {
        try{
          await api.post("/auth/logout", {}, { withCredentials: true });
          setAccessToken(null);
          console.log(`Logout successful!`)
        } catch (e) {
          console.error("Logout failed", e)
        }
      };
      const value = useMemo(() => ({
        accessToken,
        setAccessToken,
        login,
        logout,
      }), [accessToken]);
      return (
        <AuthContext.Provider value={value}>
          {children}
        </AuthContext.Provider>
      );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };