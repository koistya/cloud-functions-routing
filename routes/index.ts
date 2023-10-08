/* SPDX-FileCopyrightText: 2023-present Konstantin Tarkus */
/* SPDX-License-Identifier: MIT */

import { HttpFunction } from "@google-cloud/functions-framework";

export const GET: HttpFunction = async (req, res) => {
  res.send({
    message: "Hello, World!",
    originalUrl: req.originalUrl,
  });
};
