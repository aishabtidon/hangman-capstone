// src/components/Footer.js
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      © {year} Hangman — React Capstone
    </footer>
  );
}
