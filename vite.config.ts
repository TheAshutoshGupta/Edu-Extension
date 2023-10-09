import { crx } from "@crxjs/vite-plugin";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
// @ts-ignore
import manifest from "./manifest.json"; // Node 14 & 16

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), crx({ manifest })],
});
