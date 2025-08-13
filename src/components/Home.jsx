import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);

   useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("t-at");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      setToken(accessToken);
      window.history.replaceState({}, document.title, "/home");
    } else {
      const savedToken = localStorage.getItem("access_token");
      if (savedToken) {
        setToken(savedToken);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:8086/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUserData(res.data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Home Page</h1>
      <p>Token: {token}</p>
      {userData ? (
        <div>
          <h2>User Info</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Home;
