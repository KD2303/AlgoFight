import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchLeaderboard } from "../../services/api";
import "./Leaderboard.css";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboard()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch leaderboard:", err);
        setError("Could not load leaderboard. Is the server running?");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="leaderboard-root">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="coming-title"
        >
          Leaderboard
        </motion.h1>
        <div className="coming-box">
          <span className="neon-text">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-root">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="coming-title"
        >
          Leaderboard
        </motion.h1>
        <div className="coming-box">
          <span className="neon-text" style={{ color: "#f66" }}>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard-root">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="coming-title"
      >
        Leaderboard
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {data.length === 0 ? (
          <div style={{ textAlign: "center", color: "#aaa", padding: "3rem 1rem" }}>
            <p style={{ fontSize: "1.2rem" }}>No players on the leaderboard yet.</p>
            <p>Play a battle to appear here!</p>
          </div>
        ) : (
        <table style={{ width: "100%", maxWidth: 700, margin: "2rem auto", borderCollapse: "collapse", color: "#fff" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #444" }}>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Rank</th>
              <th style={{ padding: "0.75rem", textAlign: "left" }}>Player</th>
              <th style={{ padding: "0.75rem", textAlign: "right" }}>Rating</th>
              <th style={{ padding: "0.75rem", textAlign: "right" }}>Win Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #333" }}>
                <td style={{ padding: "0.75rem" }}>{entry.rank}</td>
                <td style={{ padding: "0.75rem" }}>{entry.user}</td>
                <td style={{ padding: "0.75rem", textAlign: "right" }}>{entry.score}</td>
                <td style={{ padding: "0.75rem", textAlign: "right" }}>{entry.winRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </motion.div>
    </div>
  );
}
