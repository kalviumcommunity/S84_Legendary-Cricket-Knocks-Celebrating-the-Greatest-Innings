import React, { useState, useEffect } from "react";
import KnockCard from "../components/knockCard";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Home() {
  const [knocks, setKnocks] = useState([]);
  const [error, setError] = useState("");

  const fetchKnocks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/knocks`);
      if (!response.ok) {
        throw new Error("Failed to fetch knocks");
      }
      const data = await response.json();
      setKnocks(data);
      setError("");
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchKnocks();
  }, []);

  const handleDelete = (id) => {
    setKnocks(knocks.filter((knock) => knock._id !== id));
    fetchKnocks();
  };

  return (
    <div>
      <h1>Greatest Cricket Knocks</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {knocks.length === 0 && !error ? (
        <p>No knocks available yet.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {knocks.map((knock) => (
            <KnockCard key={knock._id} post={knock} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
