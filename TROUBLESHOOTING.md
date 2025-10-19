# Troubleshooting Guide

This guide helps resolve common issues when working with this microfrontend architecture.

## Installation Issues

### Problem: npm install fails

**Symptoms:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete node_modules and package-lock.json:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Use legacy peer deps (if needed):
   ```bash
   npm install --legacy-peer-deps
   ```

### Problem: Port already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**
1. Find and kill the process using the port (macOS/Linux):
   ```bash
   lsof -ti:3000 | xargs kill -9
   ```

2. Find and kill the process (Windows):
   ```bash
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

3. Change the port in webpack.config.js:
   ```javascript
   devServer: {
     port: 3004, // Use a different port
   }
   ```

## Build Issues

### Problem: "Shared module is not available for eager consumption"

**Symptoms:**
```
Uncaught Error: Shared module is not available for eager consumption
```

**Solution:**
This is already fixed in the project using the bootstrap pattern. If you see this error:

1. Ensure index.js only contains:
   ```javascript
   import("./bootstrap");
   ```

2. All other imports should be in bootstrap.js

### Problem: Build fails with module not found

**Symptoms:**
```
Module not found: Error: Can't resolve 'react' in '/path/to/app'
```

**Solutions:**
1. Ensure dependencies are installed:
   ```bash
   npm install
   ```

2. Check package.json has all required dependencies

3. Verify webpack.config.js has correct module rules

## Runtime Issues

### Problem: Remote application not loading

**Symptoms:**
- Blank screen when clicking remote app button
- Console error: "Loading chunk failed"

**Solutions:**
1. Verify all 4 dev servers are running:
   ```bash
   # Check if all ports are active
   curl http://localhost:3000
   curl http://localhost:3001
   curl http://localhost:3002
   curl http://localhost:3003
   ```

2. Check webpack-dev-server output for errors

3. Verify remoteEntry.js is accessible:
   - http://localhost:3001/remoteEntry.js
   - http://localhost:3002/remoteEntry.js
   - http://localhost:3003/remoteEntry.js

4. Check browser console for CORS errors

### Problem: Vue app not rendering

**Symptoms:**
- Vue app slot is empty
- No error in console

**Solutions:**
1. Verify bootstrap.js is properly exporting a React component:
   ```javascript
   export default VueWrapper; // Not: export default () => {...}
   ```

2. Check that Vue is installed:
   ```bash
   cd vue-remote && npm list vue
   ```

3. Look for Vue runtime warnings in console

### Problem: Vanilla JS app not working

**Symptoms:**
- JavaScript functionality doesn't work
- Buttons don't respond

**Solutions:**
1. Check that event listeners are properly attached in useEffect

2. Verify DOM elements exist before attaching listeners:
   ```javascript
   const button = containerRef.current.querySelector("#button");
   if (button) {
     button.addEventListener("click", handler);
   }
   ```

3. Ensure cleanup function removes event listeners

## CORS Issues

### Problem: Cross-Origin Request Blocked

**Symptoms:**
```
Access to fetch at 'http://localhost:3001/remoteEntry.js' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**Solutions:**
1. Verify webpack-dev-server has CORS headers in all remotes:
   ```javascript
   devServer: {
     headers: {
       "Access-Control-Allow-Origin": "*",
     },
   }
   ```

2. Restart all dev servers after config changes

3. Clear browser cache and hard reload (Ctrl+Shift+R)

## Performance Issues

### Problem: Slow initial load

**Symptoms:**
- Application takes long to load
- Blank screen for several seconds

**Solutions:**
1. Check network tab in DevTools for slow resources

2. Verify all remotes are running locally (not fetching from slow network)

3. Consider adding a loading spinner:
   ```javascript
   <Suspense fallback={<div>Loading...</div>}>
     <RemoteApp />
   </Suspense>
   ```

### Problem: Hot reload not working

**Symptoms:**
- Changes don't reflect without manual refresh
- HMR disconnected messages

**Solutions:**
1. Check webpack-dev-server is running properly

2. Verify no errors in terminal

3. Restart the dev server:
   ```bash
   # Stop with Ctrl+C and restart
   npm start
   ```

## Framework-Specific Issues

### React Issues

**Problem: Hooks error**
```
Invalid hook call. Hooks can only be called inside the body of a function component.
```

**Solution:**
- Ensure only one React instance exists
- Verify React is marked as singleton in Module Federation config
- Check that all apps use the same React version

### Vue Issues

**Problem: Vue warn messages**
```
[Vue warn]: Failed to resolve component
```

**Solutions:**
1. Verify component is properly registered

2. Check imports in App.vue:
   ```javascript
   import { createApp } from "vue";
   ```

3. Ensure vue-loader is configured correctly

### Vanilla JS Issues

**Problem: Event listeners not working after navigation**

**Solutions:**
1. Ensure cleanup function is called:
   ```javascript
   return () => {
     // Remove all event listeners
     // Clear all intervals/timeouts
   };
   ```

2. Re-attach listeners when component mounts

## Browser-Specific Issues

### Chrome/Edge

**Problem: DevTools showing warnings**

**Solutions:**
- Install React DevTools extension
- Ignore Vue feature flag warnings (they're informational)

### Firefox

**Problem: Module Federation not working**

**Solutions:**
1. Clear browser cache

2. Check if Firefox Enhanced Tracking Prevention is blocking requests:
   - Click shield icon in address bar
   - Disable tracking protection for localhost

### Safari

**Problem: Remotes not loading**

**Solutions:**
1. Enable Develop menu (Preferences → Advanced)

2. Check Web Inspector console for errors

3. Verify CORS headers are properly set

## Production Issues

### Problem: remoteEntry.js 404 in production

**Solutions:**
1. Verify build output includes remoteEntry.js:
   ```bash
   ls dist/remoteEntry.js
   ```

2. Check publicPath in webpack.config.js:
   ```javascript
   output: {
     publicPath: "auto", // or specific URL
   }
   ```

3. Verify CDN/server is serving the file correctly

### Problem: Different behavior in production vs development

**Solutions:**
1. Test production build locally:
   ```bash
   npm run build
   npx serve -s dist -p 3000
   ```

2. Check for hardcoded URLs (should be relative or configurable)

3. Verify environment variables are set correctly

## Debugging Tips

### Enable Verbose Logging

Add to webpack.config.js:
```javascript
stats: {
  logging: "verbose",
}
```

### Check Module Federation Status

In browser console:
```javascript
// Check if remote is loaded
console.log(__webpack_modules__);

// Check shared modules
console.log(__webpack_require__.S);
```

### Network Analysis

1. Open DevTools Network tab
2. Filter by "JS" 
3. Check:
   - remoteEntry.js loads (200 status)
   - Chunk files load correctly
   - No CORS errors

### React DevTools

1. Install React DevTools extension
2. Inspect component tree
3. Check:
   - Suspense boundaries
   - Component props
   - State updates

## Getting Help

If you're still experiencing issues:

1. **Check existing issues** on GitHub
2. **Search Stack Overflow** for similar problems
3. **Create a new issue** with:
   - Description of the problem
   - Steps to reproduce
   - Error messages/screenshots
   - Environment details (OS, Node version, browser)

## Useful Commands

```bash
# Check Node and npm versions
node -v
npm -v

# List all Node processes
ps aux | grep node

# Check what's running on a port (macOS/Linux)
lsof -i :3000

# Check what's running on a port (Windows)
netstat -ano | findstr :3000

# Clear all npm caches
npm cache clean --force

# Reinstall all dependencies
rm -rf node_modules package-lock.json && npm install

# Build all apps
npm run build:all

# Check webpack version
npx webpack --version
```

## Preventive Measures

1. **Use consistent Node version**: Consider using nvm or .nvmrc
2. **Lock dependency versions**: Commit package-lock.json
3. **Test builds regularly**: Don't only rely on dev server
4. **Monitor bundle sizes**: Use webpack-bundle-analyzer
5. **Keep dependencies updated**: Run npm audit regularly

---

Still having issues? Check the [ARCHITECTURE.md](./ARCHITECTURE.md) for more details about how the system works.
