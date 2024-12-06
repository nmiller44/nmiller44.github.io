---
title: 'Create a New Astro Blog Project From Scratch'
layout: '../../layouts/Md.astro'
pubDate: 2024-08-16
description: 'Starting up a new project with Astro is a breeze. In this post, I will show you how to create a new Astro blog project from scratch.'
author: 'NMiller44'
tags: ["ui", "tailwind", "astro", "typescript", "blog"]
---
Astro is a great platform for building a blog site. It is fast, easy to use, and has a great developer experience. There are many ways to get started. In this post, I'll show you how to create a new Astro blog project from scratch.

## Overview

We're going to build this project utilizing some common tools I find essential to my development workflow. We'll start with [Astro](https://astro.build/) (of course), and add [Tailwind CSS](https://tailwindcss.com/) with the [Typography plugin](https://github.com/tailwindlabs/tailwindcss-typography) to make our content look great. Most of my code examples also utilize [TypeScript](https://www.typescriptlang.org/) for type safety and better code completion.

## Getting Started

First, we need to create a new Astro project. If you haven't already installed Astro CLI, you can do so by running the following command:

```bash
npm install -g astro
```

You can run this command from any terminal and the `-g` flag will install Astro globally, allowing you to use it on any project.

Next, we'll create a new Astro project by running the following command:

```bash
npm create astro@latest
```

This will initiate the project creation process with Astro. You'll be able to provide a project name and create a fresh directory. The create process requires a clean directory and gives you an option to initialize a git repo during initialization.

Next, you'll be prompted to choose a template. Currently, Astro offers three options for starting your project:
- **Include sample files**
- **Use blog template**
- **Empty**

I encourage you to explore these options as they all have their benefits. Because we're building this blog project from scratch, we'll choose the **Empty** template.

Then you can choose to use Typescript or stick with JavaScript. While either will work for your project, we'll let Astro know that **Yes** we plan to write TypeScript. Choose the **Strict** option for a good balance of rules and flexibility.

Continue by choosing these options:
- Install dependencies: **Yes** - we'll need these installed before running the dev server.
- Initialize a git repository: **Yes** - this is a good practice for version control. This can also be done manually later.

There you have it, your directory will be populated with all of the components needed for your Astro blog project, well almost all. Go ahead and start the Dev server by running:

```bash
npm run dev
```

This will start the Astro dev server locally and you can view your new project at `http://localhost:4321`.

Not very exciting yet, we don't have our favorite styling library and there is no content, but soon enough we'll be ready for a first post.

## Adding Tailwind CSS

Tailwind offers installation guides for many of the most popular frameworks and tools. These are regularly updated and simplified to make it as easy as possible to use Tailwind wherever you would like. Astro is no exception, we'll be using the [Astro Tailwind guide](https://tailwindcss.com/docs/guides/astro) to get started.

The Astro CLI makes installing Tailwind super simple handling all of the initial setup with a single command:
    
```bash
npx astro add tailwind
```

Let's test it out by adding some Tailwind classes to our `src/pages/index.astro` file. Open the file and add the following classes to the `h1` Astro element:

```html
<h1 class="text-3xl font-bold underline">
    Astro
</h1>
```

Now your local server should automatically update and you'll see the changes reflected in your browser.

## Tailwind Typography Plugin

We're also going to install the Tailwind Typography plugin. Since we plan to use Markdown for our content, we'll need a way to beautifully style the standard elements used in Markdown.

First, install the plugin:

```bash
npm install -D @tailwindcss/typography
```

Then add the plugin to your `tailwind.config.js` file:

```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // ...
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
```

Excellent, restart your Dev server and you should have all the tools in place to create a great looking blog with Astro. Next step, add some content!

## Add Layouts and Content

Check back later for more information on adding layouts and starting to add content to your new Astro blog project.
