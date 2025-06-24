import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addKnock.css";

const API_BASE_URL = "http://localhost:3000";

export default function AddKnock() {
  const [formData, setFormData] = useState({
    playerName: "",
    runs: "",
    balls: "",
    country: "",
    opponent: "",
    videoUrl: "", // Added video URL
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "runs" || name === "balls" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${API_BASE_URL}/knocks`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add knock");
      }
      setFormData({
        playerName: "",
        runs: "",
        balls: "",
        country: "",
        opponent: "",
        videoUrl: "",
      });
      setError("");
      alert("Knock added successfully!");
      navigate("/");
    } catch (err) {
      setError(
        err.message.includes("fetch")
          ? "Failed to connect to the backend. Ensure it’s running on http://localhost:3000 and CORS allows http://localhost:5173."
          : err.message
      );
      console.error("Fetch error:", err);
    }
  };

  return (
    <div className="add-knock-container">
      <h2>Add a New Knock</h2>
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
        <div>
          <label>Video URL (optional)</label>
          <input
            type="text"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            placeholder="https://example.com/video.mp4"
          />
        </div>
        <button type="submit">Add Knock</button>
      </form>
    </div>
  );
}
