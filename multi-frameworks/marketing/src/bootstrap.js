import React from 'react';
import { createRoot } from 'react-dom/client';
import { createMemoryHistory, createBrowserHistory  } from 'history';

import App from './App';

let root = null;
let history = null; // Store history outside the mount function

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
  // Only create history once
  if (!history) {
    history =
      defaultHistory ||
      createMemoryHistory({
        initialEntries: [initialPath],
      });
  }

  // Listen for navigation events and notify the container, listener is internal method of history
  history.listen((location) => {
    if (onNavigate) {
      onNavigate(location);
    }
  });

  if (!root) {
    root = createRoot(el);
  }
  root.render(<App history={history} />);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  };
};

const unmount = () => {
  if (root) {
    root.unmount();
    root = null;
  }
  // Reset history so it can be recreated on next mount
  history = null;
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_app-marketing-root');
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

export { mount, unmount };
