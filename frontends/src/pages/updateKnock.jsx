import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./addKnock.css";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function UpdateKnock() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    playerName: "",
    runs: "",
    balls: "",
    country: "",
    opponent: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchKnock = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/knocks/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch knock");
        }
        const data = await response.json();
        setFormData({
          playerName: data.playerName,
          runs: data.runs,
          balls: data.balls,
          country: data.country,
          opponent: data.opponent,
        });
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      }
    };
    fetchKnock();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "runs" || name === "balls" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/knocks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update knock");
      }
      setError("");
      alert("Knock updated successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.error("Fetch error:", err);
    }
  };

  return (
    <div className="add-knock-container">
      <h2>Update Knock</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Player Name</label>
          <input
            type="text"
            name="playerName"
            value={formData.playerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Runs</label>
          <input
            type="number"
            name="runs"
            value={formData.runs}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Balls</label>
          <input
            type="number"
            name="balls"
            value={formData.balls}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Opponent</label>
          <input
            type="text"
            name="opponent"
            value={formData.opponent}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Knock</button>
      </form>
    </div>
  );
}
