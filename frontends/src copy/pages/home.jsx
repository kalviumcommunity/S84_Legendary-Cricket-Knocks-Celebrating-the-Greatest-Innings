import React, { useState, useEffect } from "react";
import KnockCard from "../components/KnockCard";

const API_BASE_URL = "http://localhost:3000";

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
      setError(
        err.message.includes("fetch")
          ? "Failed to connect to the backend. Ensure it’s running on http://localhost:3000 and CORS allows http://localhost:5173."
          : err.message
      );
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchKnocks();
  }, []); // Runs on mount

  const handleDelete = (id) => {
    setKnocks(knocks.filter((knock) => knock._id !== id)); // Remove deleted knock locally
    fetchKnocks(); // Re-fetch to ensure sync with server
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