import React from "react";

const HangmanDrawing = ({ wrongCount }) => (
  <svg width="200" height="250">
    {/* Base */}
    <line x1="20" y1="230" x2="180" y2="230" stroke="white" strokeWidth="4" />
    <line x1="50" y1="230" x2="50" y2="20" stroke="white" strokeWidth="4" />
    <line x1="50" y1="20" x2="150" y2="20" stroke="white" strokeWidth="4" />
    <line x1="150" y1="20" x2="150" y2="50" stroke="white" strokeWidth="4" />

    {/* Cabeça */}
    {wrongCount >= 1 && (
      <circle cx="150" cy="70" r="20" stroke="white" strokeWidth="4" fill="none" />
    )}
    {/* Corpo */}
    {wrongCount >= 2 && (
      <line x1="150" y1="90" x2="150" y2="150" stroke="white" strokeWidth="4" />
    )}
    {/* Braço esquerdo */}
    {wrongCount >= 3 && (
      <line x1="150" y1="110" x2="120" y2="140" stroke="white" strokeWidth="4" />
    )}
    {/* Braço direito */}
    {wrongCount >= 4 && (
      <line x1="150" y1="110" x2="180" y2="140" stroke="white" strokeWidth="4" />
    )}
    {/* Perna esquerda */}
    {wrongCount >= 5 && (
      <line x1="150" y1="150" x2="120" y2="190" stroke="white" strokeWidth="4" />
    )}
    {/* Perna direita */}
    {wrongCount >= 6 && (
      <line x1="150" y1="150" x2="180" y2="190" stroke="white" strokeWidth="4" />
    )}
  </svg>
);

export default HangmanDrawing;
