import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null,
  );
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem("refreshToken") || null,
  );

  const login = (newAccessToken, newRefreshToken) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) return null;
    try {
      const response = await fetch("/api/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (response.ok) {
        const data = await response.json();
        setAccessToken(data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        return data.accessToken;
      }
    } catch (error) {
      console.error("Refresh failed", error);
    }
    return null;
  };

  const isAuthenticated = !!accessToken;

  useEffect(() => {
    // Optionally, verify token on mount or refresh if expired
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        login,
        logout,
        refreshAccessToken,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
