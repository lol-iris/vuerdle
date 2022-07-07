import { createApp } from "vue";
import { createPinia } from "pinia";

// Plugins
import mdiVue from "mdi-vue/v3";
import * as mdijs from "@mdi/js";

import Toast, { POSITION, type PluginOptions } from "vue-toastification";
import "vue-toastification/dist/index.css";

import Toggle from "@vueform/toggle";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(mdiVue, {
  icons: mdijs,
});
app.use(Toast, {
  position: POSITION.TOP_CENTER,
  timeout: 1000,
  hideProgressBar: true,
  showCloseButtonOnHover: true,
  transition: "Vue-Toastification__fade",
} as PluginOptions);
app.component("ToggleButton", Toggle);

app.mount("#app");
