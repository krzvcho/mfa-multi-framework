import { mount, unmount } from 'dashboard/DashboardApp';
import React, { useRef, useEffect } from 'react';

export default () => {
  const ref = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    mount(ref.current);
    isMountedRef.current = true;
    return () => {
      // Use queueMicrotask for cleaner async unmount
      if (isMountedRef.current) {
        isMountedRef.current = false;
      }
    };
  }, []);
  return <div ref={ref} />;
};
