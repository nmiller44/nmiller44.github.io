---
title: 'Remix To Do App Actions Using Fetcher and Optimistic UI'
layout: '../../layouts/Md.astro'
pubDate: 2024-10-09
description: 'Remix Forms have an old school feel anlongside some modern touches that make for a powerful combination. In this post, I will demonstrate using Fetcher and Optimistic UI while building the ubiquitous To Do app.'
author: 'NMiller44'
tags: ["ui", "react", "remix", "optimistic-ui", "typescript", "blog"]
---
Remix Forms have an old school feel anlongside some modern touches that make for a powerful combination. In this post, I will demonstrate using Fetcher and Optimistic UI while building the ubiquitous To Do app.

## Getting Started

We'll get started by creating a new Remix app or implementing these features directly into the project of your choice.

Create a new Remix app:

```bash
npx create-remix@latest
```

## Interface

At its most basic, the To Do app is a set of checkboxes that update backend status when checked or unchecked. In this example, we'll use old school form checkboxes but this technique can be applied to any element.

Commonly, a task checkbox will be displayed alongside other tasks and toggling the status of one will not result in navigation. In Remix, we can easily submit forms without navigation using Fetcher.

Let's set up a Fetcher form with some sample tasks:

```tsx
const fetcher = useFetcher();

return (
    <fetcher.Form method="post">
        <ul>
            <li>
                <input type="checkbox" name="task1" />
                <label>Task 1</label>
            </li>
            <li>
                <input type="checkbox" name="task2" />
                <label>Task 2</label>
            </li>
            <li>
                <input type="checkbox" name="task3" />
                <label>Task 3</label>
            </li>
        </ul>
    </fetcher.Form>
)
```

## Client Interactivity

When the user toggles one of these tasks, we need to send a multiple data elements to our action to handle updating the status of the task. Inherently, a checkbox only represents a single value, so we cannot use a standard form submission to handle it.

Fortunately, Fetcher provides an easy to use `submit` method that works great for this use case. Let's update one of our checkboxes to use `fetcher.submit`:

```tsx
<li>
    <input  type="checkbox" name="task1" 
            defaultValue={task.complete}
            onChange={() => fetcher.submit({
                '_action': 'toggle-task',
                'task-id': task.id,
                'complete': !task.complete
            })} />
    <label>Task 1</label>
</li>
```

Let's look at the `onChange` function in more detail. When the value of the checkbox changes, we call `fetcher.submit` with an object containing the data we want to send to the action.

We'll start with the `_action` property. The `_action` property represents a common convention in Remix that allows for multiple actions to be handled by a single route. We'll call this the `toggle-task` action.

Next, we'll send the `task-id` and `status` properties. We can send any number of properties to the Fetcher submit method and they will be passed to the action as form data.

## Optimistic UI
When you test client interactivity on this task list, you may notice some off behavior as the UI goes through the process of updating the backend and refreshing the page. In Remix, we can improve this user experience by implementing Optimistic UI.

Optimistic UI is a technique that updates the client UI immediately while waiting for the backend updates to complete. We call it optimistic, because we update the UI optimistically assuming the backend processes will succeed. If the backend processes fail, Remix will solve it by reverting the data during the refresh cycle.

Let's set the checkbox `defaultValue` depending on fetcher.state:

```tsx
const complete = fetcher.formData && fetcher.formData.get('task-is') == task.task_id
    ? formData.get('complete')
    : task.complete;

return (
    <li>
        <input  type="checkbox" name="task1" 
                defaultValue={complete}
                onChange={() => fetcher.submit({
                    '_action': 'toggle-task',
                    'task-id': task.id,
                    'complete': !complete
                })} />
        <label>Task 1</label>
    </li>
)
```

In this example, we check if the submitted `task-id` in the form data matches the current task. If it does, we immediately update the UI with the value submitted to the Fetcher.

## Conclusion

We now have the basis of a To Do app that will use Optimistic UI to provide the client with an optmized user experience by keeping the UI up to date while backend processes complete. This is a great example of using modern Remix capabilities to enhance the old school form submission experience.

We also set up these elements to work well on a complex page containing multiple elements and multiple form activities. Submitting an `_action` form element ensures our action function appropriately handles the form submission. 
