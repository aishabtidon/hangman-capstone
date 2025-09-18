// src/components/Help.js
import React from "react";

export default function Help({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="close-row">
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
        <h2>How to Play Hangman</h2>
        <ol>
          <li>We pick a random word (4–12 letters).</li>
          <li>Guess letters by clicking the on-screen keys or using your keyboard.</li>
          <li>Each wrong guess draws a new part of the gallows figure.</li>
          <li>You lose after <strong>6</strong> wrong guesses.</li>
          <li>Reveal all letters to win. Use <em>Restart</em> anytime.</li>
        </ol>
        <p style={{color:"#94a3b8",marginTop:10}}>
          Sources: rules inspired by traditional Hangman; word list from your
          <code> dictionary.txt</code> or a small fallback set in the app.
        </p>
      </div>
    </div>
  );
}
