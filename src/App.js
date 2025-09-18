// src/App.js
import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gallows from "./components/Gallows";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";
import Help from "./components/Help";
import { FALLBACK_WORDS } from "./data/words";

/**
 * App (stateful)
 * - Loads a word (from /dictionary.txt if available, otherwise fallback list)
 * - Tracks guesses, wrong count, win/lose status
 * - Renders Hangman UI & lets user restart
 */

const MAX_WRONG = 6;

export default function App() {
  const [wordList, setWordList] = useState([]);
  const [secret, setSecret] = useState("");
  const [guessed, setGuessed] = useState(new Set());
  const [wrong, setWrong] = useState(0);
  const [showHelp, setShowHelp] = useState(false);

  // Load /public/dictionary.txt if present; otherwise fallback
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.PUBLIC_URL + "/dictionary.txt");
        if (!res.ok) throw new Error("no dictionary");
        const text = await res.text();
        const words = text
          .split(/\r?\n/)
          .map((w) => w.trim().toLowerCase())
          .filter((w) => /^[a-z]{4,12}$/.test(w));
        if (words.length) {
          setWordList(words);
          return;
        }
        setWordList(FALLBACK_WORDS);
      } catch {
        setWordList(FALLBACK_WORDS);
      }
    })();
  }, []);

  // Pick a new word
  const newWord = () => {
    const list = wordList.length ? wordList : FALLBACK_WORDS;
    const choice = list[Math.floor(Math.random() * list.length)];
    setSecret(choice);
    setGuessed(new Set());
    setWrong(0);
  };

  // Initialize secret once words are in
  useEffect(() => {
    if (!secret && (wordList.length || FALLBACK_WORDS.length)) newWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordList]);

  const status = useMemo(() => {
    if (!secret) return "loading";
    if (wrong >= MAX_WRONG) return "lost";
    const allRevealed = secret.split("").every((ch) => guessed.has(ch));
    return allRevealed ? "won" : "playing";
  }, [secret, guessed, wrong]);

  const handleGuess = (ch) => {
    if (status !== "playing") return;
    if (guessed.has(ch)) return;
    setGuessed((g) => new Set(g).add(ch));
    if (!secret.includes(ch)) setWrong((w) => w + 1);
  };

  const onRestart = () => newWord();

  return (
    <div className="app">
      <Header onHelp={() => setShowHelp(true)} />
      <main className="container">
        <section className="panel">
          <div className="top-row">
            <Gallows wrong={wrong} max={MAX_WRONG} />
            <div className="game-side">
              <h1 className="title">Hangman</h1>
              <Word secret={secret} guessed={guessed} />
              <div className="status">
                {status === "playing" && (
                  <span>
                    Mistakes: <strong>{wrong}</strong> / {MAX_WRONG}
                  </span>
                )}
                {status === "won" && <span className="win">🎉 You won!</span>}
                {status === "lost" && (
                  <span className="lose">
                    💀 You lost. Word was: <strong>{secret}</strong>
                  </span>
                )}
              </div>

              <div className="actions">
                <button className="btn" onClick={onRestart}>
                  Restart
                </button>
                <button className="btn ghost" onClick={() => setShowHelp(true)}>
                  Help / Rules
                </button>
              </div>
            </div>
          </div>

          <Keyboard
            disabled={status !== "playing"}
            guessed={guessed}
            onGuess={handleGuess}
          />
        </section>
      </main>
      <Footer />
      <Help open={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
}
