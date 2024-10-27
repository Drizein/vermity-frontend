/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import "material-design-icons-iconfont/dist/material-design-icons.css";

// Plugins
import { registerPlugins } from "@/core/plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import DependencyProvider from "@/core/dependency-provider";

const app = createApp(App);

registerPlugins(app);

export const dependencyProvider = new DependencyProvider();

app.mount("#app");
