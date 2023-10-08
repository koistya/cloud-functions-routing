/* SPDX-FileCopyrightText: 2023-present Konstantin Tarkus */
/* SPDX-License-Identifier: MIT */

import { HttpFunction } from "@google-cloud/functions-framework";

/**
 * Fetches a post by ID.
 *
 * @example GET /api/posts/1
 */
export const GET: HttpFunction = async (req, res) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${req.params.id}`;
  const fetchRes = await fetch(url);
  const post = await fetchRes.json();
  res.send(post);
};

/**
 * Updates an existing post.
 *
 * @example PATCH /api/posts/1
 */
export const PATCH: HttpFunction = async (req, res) => {
  throw new Error("Not implemented");
};
