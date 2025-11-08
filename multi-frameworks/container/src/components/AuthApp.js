import { mount, unmount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();
  const isMountedRef = useRef(false);

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onSignIn: () => {
        console.log('User signed in from AuthApp');
        if (onSignIn) {
          onSignIn();
        }
      }
    });

    isMountedRef.current = true;

    const unlisten = history.listen((location) => {
      onParentNavigate({ pathname: location.pathname });
      console.log('Container app navigated to:', location.pathname);
    });

    // Cleanup function to unmount when component is removed
    return () => {
      unlisten();
      // Use queueMicrotask for cleaner async unmount
      if (isMountedRef.current) {
        isMountedRef.current = false;
        queueMicrotask(() => {
          unmount();
        });
      }
    };
  }, []);

  return <div ref={ref} />;
};
