<template>
  <div class="vue-remote-app">
    <div class="app-header">
      <h2>💚 Vue Remote Application</h2>
      <p class="framework-badge vue-badge">Vue 3.3.8</p>
    </div>

    <div class="content-grid">
      <div class="card">
        <h3>🎨 Color Picker</h3>
        <div class="color-picker-section">
          <div class="color-display" :style="{ backgroundColor: selectedColor }">
            {{ selectedColor }}
          </div>
          <div class="color-buttons">
            <button
              v-for="color in colors"
              :key="color.name"
              :style="{ backgroundColor: color.value }"
              @click="selectedColor = color.value"
              class="color-btn"
              :title="color.name"
            >
              {{ color.name }}
            </button>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>📝 Message Form</h3>
        <div class="form-section">
          <input
            v-model="message"
            type="text"
            placeholder="Enter a message..."
            class="message-input"
            @keyup.enter="addMessage"
          />
          <button @click="addMessage" class="btn btn-primary">Add Message</button>
          <div class="messages-list">
            <div
              v-for="(msg, index) in messages"
              :key="index"
              class="message-item"
            >
              <span>{{ msg }}</span>
              <button @click="removeMessage(index)" class="btn-remove">×</button>
            </div>
            <p v-if="messages.length === 0" class="empty-state">
              No messages yet. Add one above!
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="info-section">
      <h3>🔧 Technical Details</h3>
      <ul>
        <li>Framework: Vue 3 with Composition API</li>
        <li>Reactivity: Vue's reactive() and ref()</li>
        <li>Bundler: Webpack 5 with Module Federation</li>
        <li>Port: 3002</li>
        <li>Exposed Module: ./App (via bootstrap)</li>
      </ul>
    </div>

    <div class="features">
      <div class="feature-badge">🔄 Reactive Data</div>
      <div class="feature-badge">🎯 Two-way Binding</div>
      <div class="feature-badge">📦 Module Federation</div>
      <div class="feature-badge">⚡ Hot Reload</div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "App",
  setup() {
    const selectedColor = ref("#42b883");
    const message = ref("");
    const messages = ref([]);

    const colors = [
      { name: "Vue Green", value: "#42b883" },
      { name: "Ocean Blue", value: "#3498db" },
      { name: "Sunset Orange", value: "#e74c3c" },
      { name: "Royal Purple", value: "#9b59b6" },
      { name: "Forest Green", value: "#27ae60" },
      { name: "Coral Pink", value: "#ff6b6b" },
    ];

    const addMessage = () => {
      if (message.value.trim()) {
        messages.value.push(message.value);
        message.value = "";
      }
    };

    const removeMessage = (index) => {
      messages.value.splice(index, 1);
    };

    return {
      selectedColor,
      message,
      messages,
      colors,
      addMessage,
      removeMessage,
    };
  },
};
</script>

<style scoped>
.vue-remote-app {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.app-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #42b883;
}

.app-header h2 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.framework-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.vue-badge {
  background: #42b883;
  color: white;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
}

.card h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.color-picker-section {
  text-align: center;
}

.color-display {
  height: 120px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  border: 3px solid #333;
}

.color-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.color-btn {
  padding: 0.75rem;
  border: 2px solid #333;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.color-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message-input {
  padding: 0.75rem;
  border: 2px solid #42b883;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.message-input:focus {
  outline: none;
  border-color: #35495e;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background: #42b883;
  color: white;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
}

.message-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: white;
  border-radius: 6px;
  border: 2px solid #42b883;
}

.btn-remove {
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-remove:hover {
  background: #c0392b;
  transform: scale(1.1);
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 1rem;
}

.info-section {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  padding: 1.5rem;
  border-radius: 8px;
  color: white;
  margin-bottom: 1.5rem;
}

.info-section h3 {
  margin-bottom: 1rem;
}

.info-section ul {
  list-style-position: inside;
  line-height: 1.8;
}

.features {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  justify-content: center;
}

.feature-badge {
  background: #35495e;
  color: #42b883;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .vue-remote-app {
    padding: 1rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .color-buttons {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
