import { createApp } from "vue";
import App from "./App.vue";

// Export a function that can be called from React
export default () => {
  // Create a wrapper component that works with React
  return {
    default: {
      mounted() {
        const app = createApp(App);
        app.mount(this.$el);
      },
      template: "<div></div>",
    },
  };
};
