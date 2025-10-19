# Architecture Documentation

## Overview

This project demonstrates a production-ready microfrontend architecture using Webpack 5 Module Federation. It showcases how different JavaScript frameworks (React, Vue, Vanilla JS) can coexist and communicate without conflicts.

## Architecture Diagram

```
                    ┌─────────────────────────┐
                    │    Host Application     │
                    │      (React 18)         │
                    │     Port: 3000          │
                    └───────────┬─────────────┘
                                │
                    ┌───────────┴──────────────┐
                    │  Module Federation       │
                    │  Container               │
                    └───────────┬──────────────┘
                                │
            ┌───────────────────┼───────────────────┐
            │                   │                   │
    ┌───────▼────────┐  ┌──────▼────────┐  ┌──────▼────────┐
    │  React Remote  │  │  Vue Remote   │  │Vanilla Remote │
    │   Port: 3001   │  │  Port: 3002   │  │  Port: 3003   │
    └────────────────┘  └───────────────┘  └───────────────┘
```

## How Module Federation Works

### 1. Host Configuration

The host application exposes no modules but consumes remote modules:

```javascript
new ModuleFederationPlugin({
  name: "host",
  remotes: {
    reactRemote: "reactRemote@http://localhost:3001/remoteEntry.js",
    vueRemote: "vueRemote@http://localhost:3002/remoteEntry.js",
    vanillaRemote: "vanillaRemote@http://localhost:3003/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
  },
})
```

### 2. Remote Configuration

Each remote application exposes its main component:

```javascript
new ModuleFederationPlugin({
  name: "reactRemote",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/App",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
  },
})
```

### 3. Dynamic Import

The host loads remotes dynamically using React.lazy:

```javascript
const ReactRemoteApp = lazy(() => import("reactRemote/App"));
const VueRemoteApp = lazy(() => import("vueRemote/App"));
const VanillaRemoteApp = lazy(() => import("vanillaRemote/App"));
```

## Key Concepts

### Singleton Pattern

React and React-DOM are marked as `singleton: true` to ensure only one instance exists across all microfrontends. This prevents:
- Multiple React versions running simultaneously
- Context/state conflicts
- Increased bundle size

### Bootstrap Pattern

To avoid "Shared module is not available for eager consumption" errors, we use the bootstrap pattern:

**index.js:**
```javascript
import("./bootstrap");
```

**bootstrap.js:**
```javascript
// All imports and app initialization
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// ... rest of the code
```

This ensures shared dependencies are loaded before the application code runs.

### Framework Integration

#### Vue in React Host

Vue components are wrapped in a React component using useEffect:

```javascript
const VueWrapper = () => {
  const ref = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (ref.current && !appRef.current) {
      appRef.current = createApp(App);
      appRef.current.mount(ref.current);
    }
    return () => {
      if (appRef.current) {
        appRef.current.unmount();
        appRef.current = null;
      }
    };
  }, []);

  return React.createElement("div", { ref });
};
```

#### Vanilla JS in React Host

Vanilla JavaScript is also wrapped similarly:

```javascript
const VanillaWrapper = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create DOM structure
    containerRef.current.innerHTML = appHTML;
    
    // Attach event listeners
    // ... initialization code
    
    return () => {
      // Cleanup
    };
  }, []);

  return React.createElement("div", { ref: containerRef });
};
```

## Benefits

### Independent Development
- Each team can work on their microfrontend independently
- Different release cycles
- Technology freedom (React, Vue, Angular, etc.)

### Shared Dependencies
- Avoid duplication with singleton pattern
- Smaller overall bundle size
- Consistent versions across apps

### Dynamic Loading
- Load microfrontends on-demand
- Reduce initial load time
- Better performance

### Isolated Testing
- Test each microfrontend in isolation
- Independent CI/CD pipelines
- Faster feedback loops

## Deployment Strategy

### Development
All applications run on localhost with different ports:
- Host: 3000
- React Remote: 3001
- Vue Remote: 3002
- Vanilla Remote: 3003

### Production
Each microfrontend can be:
1. Built separately: `npm run build`
2. Deployed to different CDNs or servers
3. Referenced by absolute URLs in the host configuration

Example production configuration:
```javascript
remotes: {
  reactRemote: "reactRemote@https://react-mf.example.com/remoteEntry.js",
  vueRemote: "vueRemote@https://vue-mf.example.com/remoteEntry.js",
  vanillaRemote: "vanillaRemote@https://vanilla-mf.example.com/remoteEntry.js",
}
```

## Performance Considerations

### Code Splitting
Module Federation automatically handles code splitting:
- Shared dependencies are loaded once
- Remote modules are loaded on-demand
- Webpack optimizes chunk sizes

### Caching
- Each remote has its own `remoteEntry.js`
- Application chunks can be cached independently
- Updates to one microfrontend don't invalidate others

### Network Requests
- Remote modules are fetched in parallel
- Browser caching reduces subsequent loads
- CDN distribution improves global performance

## Security

### CORS Configuration
Development servers include CORS headers:
```javascript
headers: {
  "Access-Control-Allow-Origin": "*",
}
```

In production, configure proper CORS policies based on your deployment domains.

### Content Security Policy
Consider CSP headers when deploying:
```
script-src 'self' https://react-mf.example.com https://vue-mf.example.com;
```

## Troubleshooting

### Common Issues

1. **"Shared module is not available for eager consumption"**
   - Solution: Use bootstrap pattern

2. **Remote not loading**
   - Ensure all remote servers are running
   - Check CORS configuration
   - Verify URLs in Module Federation config

3. **Multiple React instances**
   - Ensure React is marked as singleton
   - Check that all remotes share the same React version

4. **Vue/Vanilla apps not rendering**
   - Verify wrapper components are properly implemented
   - Check useEffect cleanup functions
   - Ensure DOM references are valid

## Future Enhancements

Potential improvements for this architecture:

1. **Routing**: Implement react-router for better navigation
2. **State Management**: Add shared state with Redux/Zustand
3. **Communication**: Implement event bus for cross-app messaging
4. **Error Boundaries**: Add error handling for remote failures
5. **Loading States**: Improve loading indicators
6. **TypeScript**: Add type safety across microfrontends
7. **Testing**: Add integration tests for module federation
8. **Monitoring**: Implement observability for remote modules

## References

- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontends](https://martinfowler.com/articles/micro-frontends.html)
- [Module Federation Examples](https://github.com/module-federation/module-federation-examples)

---

**Note**: This is a demonstration project. Production implementations should consider additional factors like security, monitoring, error handling, and infrastructure requirements.
