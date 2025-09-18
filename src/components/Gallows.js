// src/components/Gallows.js
import React from "react";

/**
 * Simple SVG gallows showing up to `max` wrong parts.
 */
export default function Gallows({ wrong, max = 6 }) {
  const show = (n) => (wrong >= n ? "visible" : "hidden");
  return (
    <div className="gallows" aria-label={`Wrong guesses: ${wrong}/${max}`}>
      <svg viewBox="0 0 200 220">
        {/* frame */}
        <line x1="10" y1="210" x2="150" y2="210" stroke="#334155" strokeWidth="8"/>
        <line x1="40" y1="210" x2="40" y2="20" stroke="#334155" strokeWidth="8"/>
        <line x1="37" y1="20" x2="120" y2="20" stroke="#334155" strokeWidth="8"/>
        <line x1="120" y1="20" x2="120" y2="50" stroke="#334155" strokeWidth="6"/>
        {/* parts */}
        <circle cx="120" cy="70" r="16" stroke="#e5e7eb" strokeWidth="4" fill="none" style={{visibility:show(1)}}/>
        <line x1="120" y1="86" x2="120" y2="130" stroke="#e5e7eb" strokeWidth="4" style={{visibility:show(2)}}/>
        <line x1="120" y1="95" x2="100" y2="115" stroke="#e5e7eb" strokeWidth="4" style={{visibility:show(3)}}/>
        <line x1="120" y1="95" x2="140" y2="115" stroke="#e5e7eb" strokeWidth="4" style={{visibility:show(4)}}/>
        <line x1="120" y1="130" x2="100" y2="165" stroke="#e5e7eb" strokeWidth="4" style={{visibility:show(5)}}/>
        <line x1="120" y1="130" x2="140" y2="165" stroke="#e5e7eb" strokeWidth="4" style={{visibility:show(6)}}/>
      </svg>
    </div>
  );
}
