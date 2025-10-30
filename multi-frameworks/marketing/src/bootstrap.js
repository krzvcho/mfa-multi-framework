import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

let root = null;

const mount = (el) => {
  if (!root) {
    root = createRoot(el);
  }
  root.render(<App />);
};

const unmount = () => {
  if (root) {
    root.unmount();
    root = null;
  }
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_app-marketing-root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount, unmount };
