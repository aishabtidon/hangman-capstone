// src/components/Word.js
import React from "react";

export default function Word({ secret, guessed }) {
  const letters = secret ? secret.split("") : [];
  return (
    <div className="word" aria-label="Secret word">
      {letters.map((ch, idx) => {
        const show = guessed.has(ch);
        return (
          <div
            key={`${ch}-${idx}`}
            className={`letter ${show ? "" : "empty"}`}
            aria-hidden={show ? "false" : "true"}
          >
            {show ? ch.toUpperCase() : ""}
          </div>
        );
      })}
    </div>
  );
}
