---
title: 'Creating a Styled Post Summary Page with Astro'
layout: '../../layouts/Md.astro'
pubDate: 2024-08-24
description: 'The post summary page may be the most visited page on your blog. In this article, I''ll show you how to create a clean post summary page with Astro and Tailwind.'
author: 'NMiller44'
tags: ["ui", "tailwind", "astro"]
---
The post summary page may be the most visited page on your blog. You want to ensure that your summary page is easy to use, looks great, and gets users to click through to all that great content! In this article, I'll show you how to create a clean post summary page with Astro and Tailwind.

## Get a List of Posts

Astro provides an easy way of retrieving a list of your posts. We'll use the `glob()` method of the Astro class to return posts from a path:

```js
---
const allPosts = await Astro.glob('./posts/*.md');
---
```

This line will return an array of all Markdown (.md) files in the `posts` directory. You can then use this array to generate a list of posts on your summary page.

## Create a Post Summary Component

Next, we'll create a PostSummary component that will display a summary of each post. While a custom component is not required, it is usually good practice to isolate these app building blocks into their own files. Create a new file in your `src/components` directory called `PostSummary.astro`.

Each Post Summary will display specific information about that post while the component visualization code will be handle any post that matches the data structure. Here's an example of a PostSummary component. We'll get that data for each post using `props`. Props (or properties) are a way to pass data from a parent component to a child component. Add the following code between your `PostSummary.astro` code fences:

```js
---
const { post } = Astro.props;
---
```

In this example, we'll keep it simple and pass all of the relevant post information as an object in the `post` prop. With this method, you'll need to ensure all relevant fields are passed via the prop. Adding data validation and fallback values is an additional steps that should be added to any production application, but is out of scope for this article.

Now that we have the post data, we can use it to display the post summary. First, we'll use the Semantic Element, `<article />`, to wrap post summary. Semantic tags are subject specific HTML tags that improve accessibility and SEO of your site. 

```js
<article>
    <a href={post.url}>
        {post.frontmatter.title}
    </a>
    <p>
        {post.frontmatter.description}
    </p>
</article>
```

This snippet includes a hyperlinked title and post description for your component. While this is the primary information you want to present, it doesn't look very nice. Next, let's add some Tailwind styling to make it look great. We'll increase the text size and weight of the title to add emphasis. A lighter weight and color for the description creates contrast. 

```js
<article>
    <h2 class="text-2xl font-bold text-foreground mb-2">
        <a href={post.url}>
            {post.frontmatter.title}
        </a>
    </h2>
    <p class="pb-4 font-light text-neutral-500">
        {post.frontmatter.description}
    </p>
</article>
```

Much better. Now we have a clean, easy to read post summary. But we want users to click through to the full post. Let's add a "Read More" link to the bottom of the post summary. We'll use a Tailwind utility class to style the link and add a hover effect.

```js
<article>
    <h2 class="text-2xl font-bold text-foreground mb-2">
        <a href={post.url}>
            {post.frontmatter.title}
        </a>
    </h2>
    <p class="pb-4 font-light text-neutral-500">
        {post.frontmatter.description}
    </p>
    <a  href={post.url}
        class="inline-flex items-center text-sky-500
               hover:text-sky-700 hover:underline ">
        Read More
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4 mt-1 ml-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
    </a>
</article>
```

## Display the Post Summaries

Now that we have our styled Post Summary component, let's go back to the summary page and display all of the posts as Post Summaries. We'll use the `map()` method to iterate over the `allPosts` array and display a PostSummary component for each post. We'll use a Tailwind grid to display the posts in a clean, organized layout. Add the following code to the HTML of your summary page:

```js
    <div class="grid grid-cols-1 md:grid-cols-3">
        {allPosts.map((post, idx) => <PostPreview post={post} />)}
    </div>
```

Refresh your site to view the styled summary of your posts. As additional posts are added to your posts directory, they will automatically appear on your summary page. This is a great way to keep your summary page up to date with your latest content.
