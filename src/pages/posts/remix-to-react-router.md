---
title: 'Moving On From Remix to React Router 7'
layout: '../../layouts/Md.astro'
pubDate: 2024-11-29
description: 'The announcement that Remix was being deprecated was a shock as Remix is one of my favorite ways to build apps. In this article, I''ll demonstrate how little changes when moving from Remix with Vite to React Router 7.'
author: 'NMiller44'
tags: ["ui", "react", "remix", "react-router", "typescript", "blog", "vite"]
---
The announcement that Remix was being depracated was a shock as Remix is one of my favorite ways to build apps. The good news is that since I'd already been using Remix as a Vite plugin, not much changes when moving to React Router 7. I'm not changing my article tags though, come at me.

Since we want to keep the essence of Remix alive in our new React Router 7 app, we'll start by creating a fresh Remix app with Vite and go through the upgrade process. This process can also be used to upgrade an existing Remix app to React Router 7. Our end goal is to create a Remix-like starter app with React Router 7 and Vite.

## Create a Now Obsolete New Remix App

Yeah, yeah, but there is a method to this madness, we want the Remix experience with React Router 7. We'll start by creating a new Remix app with Vite.

Create a new Remix project with Vite by running the following command:

```bash
npx create-remix@latest
```

Give your app a name and choose to initialize a git repository or not. When prompted to install dependencies, choose `No` as we'll be upgrading to React Router 7 and removing Remix dependencies.

> ***Note:*** If you're upgrading an existing Remix app, you'll want to enable all of the [future flags](https://remix.run/docs/start/future-flags) and test before moving on to the React Router upgrade.

Before we move forward, let's remove `app/entry.*` files. These files aren't required for Remix apps and we won't need them in our new React Router app.

```bash
rm app/entry.*
```

## Upgrade to React Router 7

In order to upgrade to React Router 7 from Remix, we'll need to replace Remix dependencies with their React Router equivalents and modify some of existing configuration files.


### Update `package.json`

We'll start with package.json. Change the following scripts to use React Router instead of Remix:

```diff
"scripts": {
-    "build": "remix vite:build",
+    "build": "react-router build",
-    "dev": "remix vite:dev",
+    "dev": "react-router dev",
-    "start": "remix-serve ./build/server/index.js",
+    "start": "react-router-serve build/server/index.js",
-    "typecheck": "tsc"
+    "typecheck": "react-router typegen && tsc"
},
```

Next, replace the Remix dependencies with React Router dependencies:

```diff
"dependencies": {
-   "@remix-run/node": "^2.12.1",
+   "@react-router/node": "^7.0.1",
-   "@remix-run/react": "^2.12.1",
+   "react-router": "^7.0.1",
-   "@remix-run/serve": "^2.12.1",
+   "@react-router/serve": "^7.0.1",
    ...
},
"devDependencies": {
-   "@remix-run/dev": "^2.12.1",
+   "@react-router/dev": "^7.0.1",
    ...
}
```

Now that we've updated the necessary dependencies, go ahead and do an `npm install` to update your project.

### Create `react-router.config.ts` and update `vite.config.js`

Create a new file in the root of your project called `react-router.config.ts` and add the following:

```ts
import type { Config } from "@react-router/dev/config";

export default {
    ssr: true,
} satisfies Config;
```

Modify `vite.config.js` to use the new `react-router.config.ts` and while we're there, set the local server port to 3000::

```diff
-import { vitePlugin as remix } from "@remix-run/dev";
+import { reactRouter } from "@react-router/dev/vite";

-declare module "@remix-run/node" {
-  interface Future {
-    v3_singleFetch: true;
-  }
-}

export default defineConfig({
+  server: {
+    port: 3000,
+  },
+  plugins: [
-    remix({
-      future: {
-        ...
-      },
+    reactRouter(),
    }),
    tsconfigPaths(),
  ],
});
```

### Retain File-Based Routes

Because we want to keep the Remix-like experience, we'll stick to  file-based routes. This is a personal preference, but it's a great way to keep your app organized. We'll need the included `@react-router/fs-routes` package to make this work.

First, install the package by running `npm install @react-router/fs-routes`.

Next, create a new file in the `app` directory called `routes.ts` and add the following:

```ts
import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes() satisfies RouteConfig;
```

Should you decide to move to a route config in the future, it's as simple as modifying this `routes.ts` file. 

### Update `tsconfig.json` and `.gitignore` React Router

Update `tsconfig.json` to include the React Router types:

```diff
{
    "include": [
        ...
+       ".react-router/types/**/*"
    ],
    "compilerOptions": {
        ...
-       "types": ["@remix-run/node", "vite/client"],
+       "types": ["@react-router/dev", "vite/client"],
+       "rootDirs": [".", "./.react-router/types"],
        ...        
    }
}
```

React Router automatically adds types for your route modules, so you must add `.react-router` to `.gitignore`

### Update Dependencies in `root.tsx` and `_index.tsx`

The auto generated versions of `root.tsx` and `_index.tsx` will need to be updated to use React Router components.

Updating these dependencies is very simple. `@remix-run/react` becomes `react-router` and `@remix-run/node` becomes `@react-router/node`.

React Router doesn't include a replacement for Remix's MetaFunction, so for now, you'll need to remove that component.

## Run Your App

Now that you've updated all of the necessary files, you can run your app by running `npm run dev`.

Congratulations, you've upgraded to React Router 7 while still retaining that Remix-like experience.









