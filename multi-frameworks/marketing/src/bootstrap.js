import React from 'react';
import { createRoot } from 'react-dom/client';
import { createMemoryHistory } from 'history';

import App from './App';

let root = null;

const mount = (el, { onNavigate }) => {
  const history = createMemoryHistory();

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
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.getElementById('_app-marketing-root');
  if (devRoot) {
    mount(devRoot, {});
  }
}

export { mount, unmount };
