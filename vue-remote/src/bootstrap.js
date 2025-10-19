import React, { useEffect, useRef } from "react";
import { createApp } from "vue";
import App from "./App.vue";

// React wrapper component for Vue app
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

export default VueWrapper;
