/* SPDX-FileCopyrightText: 2023-present Konstantin Tarkus */
/* SPDX-License-Identifier: MIT */

import { getTestServer } from "@google-cloud/functions-framework/testing";
import chalk from "chalk";
import getPort, { portNumbers } from "get-port";
import { promisify } from "node:util";
import { functionName } from "./index";

// Get an available TCP port number
const port = await getPort({ port: portNumbers(8080, 8100) });

// Start the server
let server = getTestServer(functionName);
server.listen(port, handleListen);

function handleListen() {
  const url = chalk.blueBright(`http://localhost:${port}/`);
  console.log(`API listening on ${url}`);
}

async function handleClose() {
  await promisify(server?.close)?.().catch(() => Promise.resolve());
  process.exit();
}

// Reload the server when the source code changes
// https://vitejs.dev/guide/api-hmr.html
if (import.meta.hot) {
  import.meta.hot.accept("/index.ts", (mod) => {
    server?.close(() => {
      server = getTestServer(functionName);
      server.listen(port, handleListen);
    });
  });
}

process.once("SIGINT", handleClose);
process.once("SIGTERM", handleClose);
