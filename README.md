# 🚀 Microfrontend Multi-Framework Architecture Demo

A complete example of Microfrontend architecture that demonstrates how to connect multiple different frameworks (React, Vue, Vanilla JS) as remote applications without conflicts using Webpack Module Federation.

## 🎯 Overview

This project showcases a modern microfrontend architecture pattern where:
- **Host Application** (React) orchestrates and loads remote applications
- **React Remote** - A counter and todo app built with React 18
- **Vue Remote** - A color picker and message form built with Vue 3
- **Vanilla Remote** - A score tracker and timer built with pure JavaScript

All applications run independently on different ports and can be developed, tested, and deployed separately without affecting each other.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│              Host Application (React)                │
│                   Port: 3000                         │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │         Module Federation Container          │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
│         ↓              ↓              ↓             │
└─────────┼──────────────┼──────────────┼─────────────┘
          │              │              │
    ┌─────▼─────┐  ┌────▼─────┐  ┌────▼─────┐
    │  React    │  │   Vue    │  │ Vanilla  │
    │  Remote   │  │  Remote  │  │  Remote  │
    │  :3001    │  │  :3002   │  │  :3003   │
    └───────────┘  └──────────┘  └──────────┘
```

## ✨ Features

### Architecture Benefits
- **🔧 Framework Agnostic** - Each microfrontend can use any framework
- **🚀 Independent Deployment** - Deploy each app separately
- **📦 Shared Dependencies** - Avoid duplication with singleton sharing
- **⚡ Dynamic Loading** - Load remote apps on-demand
- **🛡️ Isolated Development** - No conflicts between frameworks
- **🔄 Live Reloading** - Hot reload for all applications

### Technical Highlights
- Webpack 5 Module Federation
- React 18 with Hooks
- Vue 3 with Composition API
- Pure Vanilla JavaScript ES6+
- Independent build systems
- CORS-enabled dev servers

## 🚦 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Basic understanding of React, Vue, or JavaScript

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/krzvcho/mfa-multi-framework.git
   cd mfa-multi-framework
   ```

2. **Install dependencies for all applications**
   ```bash
   # Install host dependencies
   cd host && npm install && cd ..
   
   # Install React remote dependencies
   cd react-remote && npm install && cd ..
   
   # Install Vue remote dependencies
   cd vue-remote && npm install && cd ..
   
   # Install Vanilla remote dependencies
   cd vanilla-remote && npm install && cd ..
   ```

### Running the Applications

You need to run all applications simultaneously. Open **4 separate terminal windows**:

**Terminal 1 - Host Application:**
```bash
cd host
npm start
```
The host will start on http://localhost:3000

**Terminal 2 - React Remote:**
```bash
cd react-remote
npm start
```
The React remote will start on http://localhost:3001

**Terminal 3 - Vue Remote:**
```bash
cd vue-remote
npm start
```
The Vue remote will start on http://localhost:3002

**Terminal 4 - Vanilla Remote:**
```bash
cd vanilla-remote
npm start
```
The Vanilla remote will start on http://localhost:3003

### Accessing the Application

Once all applications are running, open your browser and navigate to:
```
http://localhost:3000
```

You'll see the host application with navigation buttons to switch between different remote applications.

## 📁 Project Structure

```
mfa-multi-framework/
├── host/                      # Host application (React)
│   ├── src/
│   │   ├── App.js            # Main host component
│   │   ├── App.css           # Host styles
│   │   └── index.js          # Entry point
│   ├── public/
│   │   └── index.html
│   ├── webpack.config.js     # Module Federation config
│   └── package.json
│
├── react-remote/              # React remote application
│   ├── src/
│   │   ├── App.js            # React component (counter, todos)
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   ├── webpack.config.js     # Exposes React component
│   └── package.json
│
├── vue-remote/                # Vue remote application
│   ├── src/
│   │   ├── App.vue           # Vue component (color picker, form)
│   │   ├── bootstrap.js      # React wrapper
│   │   └── index.js
│   ├── public/
│   ├── webpack.config.js     # Exposes Vue component
│   └── package.json
│
├── vanilla-remote/            # Vanilla JS remote application
│   ├── src/
│   │   ├── App.js            # Pure JS component (score, timer)
│   │   ├── App.css
│   │   └── index.js
│   ├── public/
│   ├── webpack.config.js     # Exposes vanilla component
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔧 How Module Federation Works

### Host Configuration (webpack.config.js)
```javascript
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    reactRemote: "reactRemote@http://localhost:3001/remoteEntry.js",
    vueRemote: "vueRemote@http://localhost:3002/remoteEntry.js",
    vanillaRemote: "vanillaRemote@http://localhost:3003/remoteEntry.js",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
})
```

### Remote Configuration (webpack.config.js)
```javascript
new ModuleFederationPlugin({
  name: "reactRemote",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/App",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
})
```

### Loading Remote in Host (App.js)
```javascript
const ReactRemoteApp = lazy(() => import("reactRemote/App"));

// Use it like any component
<ReactRemoteApp />
```

## 🎨 Remote Applications

### React Remote (Port 3001)
- **Counter** - Increment/decrement/reset functionality
- **Todo List** - Interactive todo items with completion toggle
- Built with React Hooks (useState)

### Vue Remote (Port 3002)
- **Color Picker** - Select from predefined colors
- **Message Form** - Add and remove messages
- Built with Vue 3 Composition API

### Vanilla Remote (Port 3003)
- **Score Tracker** - Add/subtract points
- **Timer** - Start/stop/reset stopwatch
- Pure JavaScript with native DOM APIs

## 🔒 Key Concepts

### Singleton Dependencies
React and React-DOM are shared as singletons to ensure only one instance exists across all microfrontends, preventing version conflicts.

### Dynamic Loading
Remote applications are loaded dynamically using React.lazy() and Suspense, reducing initial bundle size.

### CORS Headers
Dev servers include CORS headers to allow cross-origin requests between different ports.

### Independent Builds
Each application has its own webpack configuration and can be built independently.

## 🚀 Production Build

To build all applications for production:

```bash
# Build host
cd host && npm run build

# Build React remote
cd ../react-remote && npm run build

# Build Vue remote
cd ../vue-remote && npm run build

# Build Vanilla remote
cd ../vanilla-remote && npm run build
```

Build outputs will be in each application's `dist/` directory.

## 📚 Learn More

### Resources
- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontends](https://micro-frontends.org/)
- [React Documentation](https://react.dev/)
- [Vue Documentation](https://vuejs.org/)

### Use Cases
- Large-scale enterprise applications
- Multi-team development
- Gradual framework migration
- Independent feature deployment
- A/B testing different implementations

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more remote applications
- Implement different frameworks (Angular, Svelte, etc.)
- Improve the UI/UX
- Add more examples and use cases

## 📝 License

This project is open source and available for educational purposes.

## 🎓 What You'll Learn

By exploring this project, you'll understand:
1. How to set up Module Federation in Webpack 5
2. How to share dependencies between microfrontends
3. How to integrate different frameworks in one application
4. How to structure a scalable microfrontend architecture
5. How to avoid common pitfalls and conflicts

---

**Made with ❤️ to demonstrate Microfrontend Architecture**