"use client";
import React, { useState, useEffect } from "react";
import HangmanDrawing from "./HangmanDrawing";


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

  return (
    <div>
      <h1>Jogo da Forca</h1>
      <p>{displayWord()}</p>
      <p>Tentativas restantes: {maxWrongGuesses - wrongGuesses}</p>
      {gameStatus === "won" && <p>🎉 Você venceu!</p>}
      {gameStatus === "lost" && <p>💀 Você perdeu! A palavra era: {currentWord}</p>}
      {gameStatus !== "playing" && (
        <button onClick={startNewGame}>Jogar Novamente</button>
        
      )}
      <HangmanDrawing wrongCount={wrongGuesses} />
    </div>
  );
};

export default HangmanGame;
