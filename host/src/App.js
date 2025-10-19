import React, { Suspense, lazy, useState } from "react";
import "./App.css";

// Lazy load remote components
const ReactRemoteApp = lazy(() => import("reactRemote/App"));
const VueRemoteApp = lazy(() => import("vueRemote/App"));
const VanillaRemoteApp = lazy(() => import("vanillaRemote/App"));

const App = () => {
  const [activeApp, setActiveApp] = useState("home");

  return (
    <div className="host-container">
      <header className="host-header">
        <h1>🚀 Microfrontend Architecture Demo</h1>
        <p>Multiple Frameworks Working Together</p>
      </header>

      <nav className="host-nav">
        <button
          className={activeApp === "home" ? "active" : ""}
          onClick={() => setActiveApp("home")}
        >
          🏠 Home
        </button>
        <button
          className={activeApp === "react" ? "active" : ""}
          onClick={() => setActiveApp("react")}
        >
          ⚛️ React App
        </button>
        <button
          className={activeApp === "vue" ? "active" : ""}
          onClick={() => setActiveApp("vue")}
        >
          💚 Vue App
        </button>
        <button
          className={activeApp === "vanilla" ? "active" : ""}
          onClick={() => setActiveApp("vanilla")}
        >
          🍦 Vanilla JS App
        </button>
      </nav>

      <main className="host-main">
        <Suspense fallback={<div className="loading">Loading...</div>}>
          {activeApp === "home" && (
            <div className="home-content">
              <h2>Welcome to the Microfrontend Demo!</h2>
              <div className="info-cards">
                <div className="info-card">
                  <h3>🏗️ Architecture</h3>
                  <p>
                    This demo showcases Module Federation (Webpack 5) enabling
                    multiple frameworks to work together seamlessly.
                  </p>
                </div>
                <div className="info-card">
                  <h3>🔧 Technologies</h3>
                  <ul>
                    <li>Host: React 18</li>
                    <li>Remote 1: React 18</li>
                    <li>Remote 2: Vue 3</li>
                    <li>Remote 3: Vanilla JavaScript</li>
                  </ul>
                </div>
                <div className="info-card">
                  <h3>✨ Features</h3>
                  <ul>
                    <li>Independent deployment</li>
                    <li>Framework agnostic</li>
                    <li>Shared dependencies</li>
                    <li>No conflicts between frameworks</li>
                  </ul>
                </div>
              </div>
              <p className="instruction">
                👆 Click on the buttons above to load different remote applications
              </p>
            </div>
          )}
          {activeApp === "react" && <ReactRemoteApp />}
          {activeApp === "vue" && <VueRemoteApp />}
          {activeApp === "vanilla" && <VanillaRemoteApp />}
        </Suspense>
      </main>

      <footer className="host-footer">
        <p>
          Built with Module Federation | Host runs on port 3000 | Remotes on
          3001, 3002, 3003
        </p>
      </footer>
    </div>
  );
};

export default App;
