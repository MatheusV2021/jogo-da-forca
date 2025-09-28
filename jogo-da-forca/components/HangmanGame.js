"use client";
import React, { useState, useEffect } from "react";
import HangmanDrawing from "./HangmanDrawing";
import styles from "../app/hangman.module.css";


const HangmanGame = () => {
  const words = [
    "REACT", "JAVASCRIPT", "PYTHON", "TYPESCRIPT", "FRONTEND",
    "BACKEND", "JAVA", "IMPERATIVA", "COMPONENTES", "FUNCTION",
    "VARIAVEL", "ALGORITMO", "CLASSE", "DESENVOLVEDOR", "NAVEGADOR",
    "HTML", "CSS", "NODE", "IDE", "MONGODB",
    "FRAMEWORK", "BIBLIOTECA", "PACOTE", "REPOSITORIO", "GITHUB",
    "VERSION", "DEPLOY", "SERVIDOR", "CLIENTE", "API",
    "JSON", "ASYNC", "PROMISE", "CALLBACK", "ARRAY"
  ];

  const [currentWord, setCurrentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const maxWrongGuesses = 6;

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus("playing");
  };

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (currentWord) {
      const wordLetters = new Set(currentWord.split(""));
      const correctGuesses = new Set(
        [...guessedLetters].filter((l) => wordLetters.has(l))
      );
      if (correctGuesses.size === wordLetters.size) {
        setGameStatus("won");
      } else if (wrongGuesses >= maxWrongGuesses) {
        setGameStatus("lost");
      }
    }
  }, [currentWord, guessedLetters, wrongGuesses]);

  const makeGuess = (letter) => {
    if (gameStatus !== "playing" || guessedLetters.has(letter)) return;

    const newGuessedLetters = new Set([...guessedLetters, letter]);
    setGuessedLetters(newGuessedLetters);

    if (!currentWord.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameStatus !== "playing") return;
      const key = event.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) makeGuess(key);
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [gameStatus, guessedLetters, currentWord, wrongGuesses]);

  const displayWord = () =>
    currentWord
      .split("")
      .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
      .join(" ");

  const getLetterStatus = (letter) => {
    if (!guessedLetters.has(letter)) return '';
    return currentWord.includes(letter) ? styles.correct : styles.wrong;
  };

  return (
    <div className={styles.game}>
      <h1>Jogo da Forca</h1>
      <p className={styles.word}>{displayWord()}</p>
      <p>Tentativas restantes: {maxWrongGuesses - wrongGuesses}</p>
      <HangmanDrawing wrongCount={wrongGuesses} />

      {/* Letras utilizadas */}
      <div className={styles.lettersUsed}>
        <span>Letras utilizadas:</span>
        <div>
          {Array.from(guessedLetters).map(letter => (
            <span key={letter} className={currentWord.includes(letter) ? styles.correct : styles.wrong}>
              {letter}{" "}
            </span>
          ))}
        </div>
      </div>
      
      {/* Status do jogo */}
      {gameStatus === "won" && (
        <p className={`${styles.status} ${styles.won}`}>
          🎉 Você venceu!
        </p>
      )}
      {gameStatus === "lost" && (
        <p className={`${styles.status} ${styles.lost}`}>
          💀 Você perdeu! A palavra era: {currentWord}
        </p>
      )}
      
      {/* Teclado virtual */}
      {gameStatus === "playing" && (
        <div className={styles.keyboard}>
          {[
            ['A', 'B', 'C', 'D', 'E', 'F'],
            ['G', 'H', 'I', 'J', 'K', 'L'],
            ['M', 'N', 'O', 'P', 'Q', 'R'],
            ['S', 'T', 'U', 'V', 'W', 'X'],
            ['Y', 'Z', '', '', '', '']
          ].map((row, rowIndex) => (
            <div key={rowIndex} className={styles.keyboardRow}>
              {row.map((letter) => (
                <button
                  key={letter}
                  onClick={() => letter && makeGuess(letter)}
                  disabled={!letter || guessedLetters.has(letter)}
                  className={`${styles.button} ${letter ? getLetterStatus(letter) : styles.hidden}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Botão de reiniciar */}
      {gameStatus !== "playing" && (
        <button onClick={startNewGame} className={styles.button}>
          Jogar Novamente
        </button>
      )}
    </div>
  );
};

export default HangmanGame;
