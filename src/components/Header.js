// src/components/Header.js
import React from "react";

export default function Header({ onHelp }) {
  return (
    <header className="header">
      <div className="brand">
        <span className="mark">HM</span>
        <span>Hangman</span>
      </div>
      <div className="help" onClick={onHelp} role="button" tabIndex={0}>
        Help / Rules
      </div>
    </header>
  );
}
