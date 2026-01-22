import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Protected = () => {
  const { accessToken, logout, refreshAccessToken } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const fetchProtected = async (token) => {
    const res = await fetch("/api/protected", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setData(data);
    } else if (res.status === 400) {
      // Token expired, try refresh
      const refreshedToken = await refreshAccessToken();
      if (refreshedToken) {
        // Retry with new token
        await fetchProtected(refreshedToken);
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchProtected(accessToken);
  }, [accessToken, navigate]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Protected Page</h2>
      <p>Welcome! This is dummy protected content.</p>
      <p>{data.message}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Protected;
