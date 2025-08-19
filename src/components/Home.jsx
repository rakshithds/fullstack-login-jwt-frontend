import React, { useEffect, useState } from "react";
import axios from "axios";
import { DndContext } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";

const Home = () => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");

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

  const [container, setContainer] = useState({
    box1: ["item1", "item2", "item3", "item4"],
    box2: [],
  });

  const handleDargEnd = (event) => {
    debugger;
    const { active, over } = event;
    if (over) {
      setContainer((prev) => {
        const newBox1 = prev.box1.filter((i) => i !== active.id);
        const newBox2 = prev.box2.filter((i) => i !== active.id);
        if (over.id === "box1") {
          return { box1: [...newBox1, active.id], box2: [...prev.box2.filter((i) => i !== active.id)] };
        }
        if (over.id === "box2") {
          return { box1: [...prev.box1.filter((i)=> i!== active.id)], box2: [...newBox2, active.id] };
        }
        return prev;
      });
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to Home Page</h1>
      <p>Token: {token}</p>
      <DndContext onDragEnd={handleDargEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          <Droppable id="box1">
            {container.box1.map((id) => (
              <Draggable key={id} id={id} />
            ))}
          </Droppable>
          <Droppable id="box2">
            {container.box2.map((id) => (
              <Draggable key={id} id={id} />
            ))}
          </Droppable>
        </div>
      </DndContext>
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
