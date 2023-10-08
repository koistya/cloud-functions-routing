/* SPDX-FileCopyrightText: 2023-present Konstantin Tarkus */
/* SPDX-License-Identifier: MIT */

import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    emptyOutDir: true,
    ssr: "./index.ts",
  },
  server: {
    port: 8080,
    hmr: true,
  },
  test: {
    environment: "node",
  },
});
