// src/components/Keyboard.js
import React, { useEffect } from "react";

/**
 * Renders A–Z via Array.map; disables used keys; supports physical keyboard.
 */
const LETTERS = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i)
);

export default function Keyboard({ guessed, onGuess, disabled }) {
  useEffect(() => {
    const onKey = (e) => {
      const ch = String(e.key || "").toLowerCase();
      if (/^[a-z]$/.test(ch) && !disabled) onGuess(ch);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onGuess, disabled]);

  return (
    <div className="keyboard" aria-label="Keyboard">
      {LETTERS.map((ch) => {
        const used = guessed.has(ch) || disabled;
        return (
          <button
            className={`key ${used ? "disabled" : ""}`}
            key={ch}
            onClick={() => onGuess(ch)}
            disabled={used}
            aria-label={`Letter ${ch.toUpperCase()}`}
          >
            {ch.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
