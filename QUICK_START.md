# 🚀 Quick Start Guide

Get the microfrontend architecture demo up and running in minutes!

## ⚡ Fastest Way to Start

### Step 1: Install Dependencies
Run from the root directory:
```bash
npm run install:all
```

This will install dependencies for all four applications.

### Step 2: Start All Applications

Open **4 separate terminal windows** and run:

**Terminal 1:**
```bash
npm run start:host
```

**Terminal 2:**
```bash
npm run start:react
```

**Terminal 3:**
```bash
npm run start:vue
```

**Terminal 4:**
```bash
npm run start:vanilla
```

### Step 3: Open Your Browser

Navigate to: **http://localhost:3000**

That's it! You should see the host application with buttons to load different remote applications.

## 🎯 What to Try

1. **Click Home** - See the architecture overview
2. **Click React App** - Interact with counter and todo list
3. **Click Vue App** - Try the color picker and message form
4. **Click Vanilla JS App** - Use the score tracker and timer

## ⚠️ Troubleshooting

### Port Already in Use
If you get a "port already in use" error, make sure no other applications are running on ports 3000-3003.

### Remote Not Loading
Ensure all 4 applications are running. The host needs the remotes to be available at their respective ports.

### Installation Issues
Try clearing npm cache and reinstalling:
```bash
npm cache clean --force
npm run install:all
```

## 📋 Port Reference

- **Host**: http://localhost:3000
- **React Remote**: http://localhost:3001
- **Vue Remote**: http://localhost:3002
- **Vanilla Remote**: http://localhost:3003

## 🏗️ Building for Production

To build all applications:
```bash
npm run build:all
```

Build outputs will be in each application's `dist/` folder.

## 💡 Next Steps

- Read the full README.md for detailed architecture information
- Explore the source code in each application
- Try modifying components and see hot reload in action
- Add your own remote application

---

Happy coding! 🎉
