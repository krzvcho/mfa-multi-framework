import React, { useEffect, useRef } from "react";
import "./App.css";

// Vanilla JavaScript Component wrapped for React
const VanillaWrapper = () => {
  const containerRef = useRef(null);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // State management with plain JS
    let score = 0;
    let timer = 0;
    let timerInterval = null;

    // Create the app structure
    const appHTML = `
      <div class="vanilla-remote-app">
        <div class="app-header">
          <h2>🍦 Vanilla JavaScript Remote Application</h2>
          <p class="framework-badge vanilla-badge">Pure JavaScript ES6+</p>
        </div>

        <div class="content-grid">
          <div class="card">
            <h3>🎮 Score Tracker</h3>
            <div class="score-section">
              <div class="score-display" id="score-display">${score}</div>
              <div class="score-buttons">
                <button id="score-minus" class="btn btn-danger">-10 Points</button>
                <button id="score-reset" class="btn btn-secondary">Reset</button>
                <button id="score-plus" class="btn btn-success">+10 Points</button>
              </div>
            </div>
          </div>

          <div class="card">
            <h3>⏱️ Timer</h3>
            <div class="timer-section">
              <div class="timer-display" id="timer-display">00:00</div>
              <div class="timer-buttons">
                <button id="timer-start" class="btn btn-primary">Start</button>
                <button id="timer-stop" class="btn btn-warning">Stop</button>
                <button id="timer-reset" class="btn btn-secondary">Reset</button>
              </div>
            </div>
          </div>
        </div>

        <div class="info-section">
          <h3>🔧 Technical Details</h3>
          <ul>
            <li>Framework: Pure Vanilla JavaScript (ES6+)</li>
            <li>DOM Manipulation: Native APIs only</li>
            <li>Bundler: Webpack 5 with Module Federation</li>
            <li>Port: 3003</li>
            <li>Exposed Module: ./App</li>
          </ul>
        </div>

        <div class="features">
          <div class="feature-badge">📦 No Dependencies</div>
          <div class="feature-badge">⚡ Native Performance</div>
          <div class="feature-badge">🔧 Module Federation</div>
          <div class="feature-badge">🎯 Pure JavaScript</div>
        </div>
      </div>
    `;

    containerRef.current.innerHTML = appHTML;

    // Get references to DOM elements
    const scoreDisplay = containerRef.current.querySelector("#score-display");
    const scoreMinus = containerRef.current.querySelector("#score-minus");
    const scoreReset = containerRef.current.querySelector("#score-reset");
    const scorePlus = containerRef.current.querySelector("#score-plus");

    const timerDisplay = containerRef.current.querySelector("#timer-display");
    const timerStart = containerRef.current.querySelector("#timer-start");
    const timerStop = containerRef.current.querySelector("#timer-stop");
    const timerReset = containerRef.current.querySelector("#timer-reset");

    // Score functions
    const updateScore = (amount) => {
      score += amount;
      scoreDisplay.textContent = score;
      scoreDisplay.style.transform = "scale(1.2)";
      setTimeout(() => {
        scoreDisplay.style.transform = "scale(1)";
      }, 200);
    };

    const resetScore = () => {
      score = 0;
      scoreDisplay.textContent = score;
    };

    // Timer functions
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    };

    const updateTimer = () => {
      timer++;
      timerDisplay.textContent = formatTime(timer);
    };

    const startTimer = () => {
      if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
        timerStart.disabled = true;
        timerStop.disabled = false;
      }
    };

    const stopTimer = () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        timerStart.disabled = false;
        timerStop.disabled = true;
      }
    };

    const resetTimer = () => {
      stopTimer();
      timer = 0;
      timerDisplay.textContent = formatTime(timer);
      timerStart.disabled = false;
      timerStop.disabled = true;
    };

    // Event listeners
    scoreMinus.addEventListener("click", () => updateScore(-10));
    scoreReset.addEventListener("click", resetScore);
    scorePlus.addEventListener("click", () => updateScore(10));

    timerStart.addEventListener("click", startTimer);
    timerStop.addEventListener("click", stopTimer);
    timerReset.addEventListener("click", resetTimer);

    // Initial state
    timerStop.disabled = true;

    // Cleanup function
    cleanupRef.current = () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  return React.createElement("div", { ref: containerRef });
};

export default VanillaWrapper;
