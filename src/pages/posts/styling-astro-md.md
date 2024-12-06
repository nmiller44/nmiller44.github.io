---
title: 'Styling Astro Markdown with Tailwind'
layout: '../../layouts/Md.astro'
pubDate: 2024-08-22
description: 'Tailwind base classes remove all standard styling from Markdown files. This article describes an easy way to style Astro Markdown with the Tailwind Typography plugin.'
author: 'NMiller44'
tags: ["ui", "tailwind", "astro", "markdown"]
---
I prefer to use Markdown for formatting my content. Markdown is a lightweight markup language that is easy to read and write. It is also easy to convert to HTML, which makes it a great choice for writing content for the web. Markdown is easy to learn, can be generated from a variety of word processing tools, and is a low impact way to write content.

When I first started using Astro alongside Tailwind CSS, the base styling of Tailwind made for a messy reading experience. I needed a way to style my Markdown content using Tailwind utility classes. While there is some documentation and other information on this topic, it took me a bit of time to figure out how to implement this on my site. In this post, I'll show you the easy way to style Astro Markdown with Tailwind.

## Prerequsities

This article assumes you have an Astro repo set up with Tailwind CSS. If you don't have an Astro project set up, you can follow the [Astro documentation](https://docs.astro.build/getting-started/) or use the [Tailwind Astro Guide](https://tailwindcss.com/docs/guides/astro), to get started.

## Tailwind Typography

Tailwind has released a great plugin that intended to solve this very problem, called [Tailwind Typography](https://github.com/tailwindlabs/tailwindcss-typography). This plugin provides some new utility classes created specifically for styling vanilla HTML, Markdown, or content from a CMS.

First, install the plugin:
    
```bash
npm install @tailwindcss/typography
```

Then add the plugin to your `tailwind.config.js` file:

```js
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

## Styling Markdown

Now that you have the plugin installed, you can use the new utility classes to style your Markdown content. Unlike other UI libraries,
Tailwind Typography does not require you to style individual components. Instead, wrap your Markdown content in a `prose` class and Tailwind will style it for you.

We're looking to style all of our Markdown files and we don't want to have to add a class to each one. Instead, we'll create a Markdown layout file that will apply the necessary classes.

Create a new file in your `src/layouts` directory called `Md.astro`. We'll assume that you've created a Base layout file that included all of the core HTML page content required for your site. In the `Md.astro` file, add the following code:

```js
---
import Base from './Base.astro'
---
<Base>
    <article class="prose dark:prose-invert
                    prose-h1:font-bold prose-h1:text-xl
                    prose-a:text-blue-600 prose-p:text-justify prose-img:rounded-xl
                    prose-headings:underline">
        <slot />
    </article>
</Base>
```

Here we use the Semantic Element, `<article />` to wrap and style our Markdown content. The classes used here are just an example, utilize Tailwind Typography's utility classes to style your content as you see fit.

## Add Md Template to a Post

Modify the front matter of each of your Markdown pages to take advantage of Tailwind Typography styling:

```js
---
title: 'Styling Astro Markdown with Tailwind'
layout: '../../layouts/Md.astro'
---
```

## Conclusion

Styling Astro Markdown with Tailwind is a simple process that can be done in a few steps. By using Tailwind Typography, you can easily style your Markdown content without having to write custom CSS. This makes it easy to maintain and update your site's styles as your content changes. If you're looking for a way to style your Markdown content with Tailwind, give this method a try. 

## References

- [Astro Tailwind Markdown Recipe](https://docs.astro.build/en/recipes/tailwind-rendered-markdown/)
