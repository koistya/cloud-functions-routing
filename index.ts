/* SPDX-FileCopyrightText: 2023-present Konstantin Tarkus */
/* SPDX-License-Identifier: MIT */

import { HttpFunction, http } from "@google-cloud/functions-framework";
import { HttpError, NotFound } from "http-errors";
import { match } from "path-to-regexp";

export const functionName = "api";

// Load all application routes from the `./routes` folder.
// https://vitejs.dev/guide/features.html#glob-import
const routeFiles = import.meta.glob(["./routes/**/*.ts", "!./**/*.test.ts"]);
const routes = Object.entries(routeFiles)
  .map(([file, i]) => {
    const path = file
      .replace(/^\.\/routes/, "/api")
      .replace(/(\/index\.ts|\.ts)$/, "")
      .replace(/\[\.\.\.(\w+)\]/g, ":$1+")
      .replace(/\[(\w+)\]/g, ":$1");
    return {
      file,
      path,
      import: i as () => Promise<HttpFunction>,
      match: match(path),
    };
  })
  // Sort routes in the same order they appear in the code editor.
  .sort(({ file: f1 }, { file: f2 }) => {
    const d1 = f1.match(/\//g)?.length ?? 0;
    const d2 = f2.match(/\//g)?.length ?? 0;
    return d1 === d2 ? f1.localeCompare(f2) : d2 - d1;
  });

http(functionName, async (req, res) => {
  const { path } = req;

  try {
    // #region Redirects
    if (path === "/") {
      return res.redirect("/api");
    }

    if (path === "/favicon.ico") {
      return res.redirect("https://nodejs.org/static/favicon.ico");
    }
    // #endregion

    for await (const route of routes) {
      const match = route.match(path);

      if (match) {
        Object.assign(req.params, match.params);
        const module = await route.import();
        await module?.[req.method]?.(req, res);
        if (res.headersSent) return;
      }
    }

    throw new NotFound();
  } catch (err) {
    res.status((err satisfies HttpError).status ?? 500);
    res.send({
      message: (err satisfies Error).message ?? "Internal Server Error",
    });
  }
});
