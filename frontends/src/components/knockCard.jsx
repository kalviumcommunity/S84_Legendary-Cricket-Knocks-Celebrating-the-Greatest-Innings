import React from "react";
import { useNavigate } from "react-router-dom";
import "./knockCard.css";

const API_BASE_URL = "http://localhost:3000";

export default function KnockCard({ post, onDelete }) {
  const navigate = useNavigate();

  if (!post) {
    return <div>No knock data available</div>;
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this knock?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/knocks/${post._id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete knock");
        }
        alert("Knock deleted successfully!");
        onDelete(post._id);
      } catch (err) {
        console.error("Delete error:", err);
        alert(err.message);
      }
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu.be\/)([\w-]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = getEmbedUrl(post.videoUrl);

  return (
    <div className="post-card">
      <h2>{post.playerName}</h2>
      <p>Runs: {post.runs}</p>
      <p>Balls: {post.balls}</p>
      <strong>
        {post.country} vs {post.opponent}
      </strong>

      {embedUrl && (
        <div className="video-container" style={{ marginTop: "10px" }}>
          <iframe
            width="100%"
            height="315"
            src={embedUrl}
            title="Knock Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => navigate(`/update-knock/${post._id}`)}
          style={{ marginRight: "10px", backgroundColor: "blue", color: "white" }}
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}