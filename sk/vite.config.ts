import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type UserConfig } from "vite";
import fs from "node:fs";

const pocketbase_url = fs.existsSync("/.dockerenv")
  ? "http://pb:8090"
  : "http://127.0.0.1:8090";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    proxy: { "/api": pocketbase_url, "/_": pocketbase_url },
  },
});
