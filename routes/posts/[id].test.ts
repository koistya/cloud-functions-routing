/* SPDX-FileCopyrightText: 2023-present Konstantin Tarkus */
/* SPDX-License-Identifier: MIT */

import { getTestServer } from "@google-cloud/functions-framework/testing";
import supertest from "supertest";
import { expect, test } from "vitest";
import { functionName } from "../../index";

test("GET /api/posts/1", async () => {
  const api = getTestServer(functionName);
  const res = await supertest(api)
    .get("/api/posts/1")
    .set("Accept", "application/json");

  expect({
    statusCode: res.statusCode,
    body: res.body,
  }).toEqual({
    statusCode: 200,
    body: {
      id: 1,
      userId: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body:
        "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit " +
        "molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    },
  });
});
