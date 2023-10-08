# Google Cloud Functions Routing

This example demonstrates how to implement a simple folder-based routing for Google Cloud Functions including:

- [x] Development server with live-reload (HMR)
- [x] Code bundling with Vite
- [x] Unit testing with Vitest

## Tech Stack

Node.js v18 or newer, TypeScript, Vite, Vitest, `path-to-regexp`.

## Getting Started

```bash
$ git clone https://github.com/koistya/cloud-functions-routing
$ cd ./cloud-functions-routing
$ corepack enable               # Ensure that Yarn is installed
$ yarn install                  # Install dependencies
$ yarn start                    # Launch Node.js app with "live-reload"
$ yarn build                    # Build the app for production
$ yarn test                     # Run unit tests
```

To add a new route create a new `.ts` file under `./routes` folder, e.g. `./routes/posts/[id].ts`, with the following signature:

```ts
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
```

To create a unit test for it, create a new `.test.ts` file next to it, e.g. `./routes/posts/[id].test.ts`. For example:

```ts
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
```

## References

- https://vitejs.dev/guide/features.html#glob-import
- https://github.com/pillarjs/path-to-regexp#readme

## Backers

<a href="https://reactstarter.com/b/1"><img src="https://reactstarter.com/b/1.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/2"><img src="https://reactstarter.com/b/2.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/3"><img src="https://reactstarter.com/b/3.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/4"><img src="https://reactstarter.com/b/4.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/5"><img src="https://reactstarter.com/b/5.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/6"><img src="https://reactstarter.com/b/6.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/7"><img src="https://reactstarter.com/b/7.png" height="60" /></a>&nbsp;&nbsp;<a href="https://reactstarter.com/b/8"><img src="https://reactstarter.com/b/8.png" height="60" /></a>

## License

Copyright © 2023-present Konstantin Tarkus. This source code is licensed under the MIT license found in the [LICENSE](https://github.com/koistya/cloud-functions-routing/blob/main/LICENSE) file.
