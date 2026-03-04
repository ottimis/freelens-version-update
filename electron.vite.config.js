import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import pluginExternal from "vite-plugin-external";

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: resolve(__dirname, "src/main/index.ts"),
        formats: ["cjs"],
      },
      rollupOptions: {
        output: {
          exports: "named",
        },
      },
    },
    plugins: [
      react({
        babel: {
          plugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
        },
      }),
      externalizeDepsPlugin({
        include: ["@freelensapp/extensions", "mobx"],
      }),
      pluginExternal({
        externals: {
          "@freelensapp/extensions": "global.LensExtensions",
          mobx: "global.Mobx",
        },
      }),
    ],
  },
  preload: {
    build: {
      lib: {
        entry: resolve(__dirname, "src/renderer/index.tsx"),
        formats: ["cjs"],
      },
      outDir: "out/renderer",
      rollupOptions: {
        output: {
          exports: "named",
        },
      },
    },
    plugins: [
      react({
        babel: {
          plugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
        },
      }),
      externalizeDepsPlugin({
        include: [
          "@freelensapp/extensions",
          "electron",
          "mobx",
          "mobx-react",
          "react",
          "react-dom",
          "react-router-dom",
        ],
        exclude: [],
      }),
      pluginExternal({
        externals: {
          "@freelensapp/extensions": "global.LensExtensions",
          mobx: "global.Mobx",
          "mobx-react": "global.MobxReact",
          react: "global.React",
          "react-dom": "global.ReactDom",
          "react-router-dom": "global.ReactRouterDom",
          "react/jsx-runtime": "global.ReactJsxRuntime",
        },
      }),
    ],
  },
});
