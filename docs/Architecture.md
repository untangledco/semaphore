# Architecture

This document describes some things about the codebase that are worth knowing if you're trying to contribute.
Basically think of it as a "lay of the land" as well as "weird unusual stuff that may surprise you."

## Overview

Semaphore uses [SvelteJS](https://svelte.technology) v2 and [SapperJS](https://sapper.svelte.technology). Most of it is a fairly typical Svelte/Sapper project, but there
are some quirks, which are described below. This list of quirks is non-exhaustive.

## Why Svelte v2 / Sapper ?

There is [no upgrade path from Svelte v2 to v3](https://github.com/sveltejs/svelte/issues/2462). Doing so would require manually migrating every component over. And in the end, it would probably not change the UX (user experience) of Semaphore – only the DX (developer experience).

Similarly, [Sapper would need to be migrated to SvelteKit](https://kit.svelte.dev/docs/migrating). Since Semaphore generates static files, there is probably not much benefit in moving from Sapper to SvelteKit.

For this reason, Semaphore has been stuck on Svelte v2 and Sapper for a long time. Migrating it is not something I've considered. The [v2 Svelte docs](https://v2.svelte.dev/) are still online, and share many similarities with Svelte v3.

## Prebuild process

The `template.html` is itself templated. The "template template" has some inline scripts, CSS, and SVGs
injected into it during the build process.

## Lots of small files

Highly modular, highly functional, lots of single-function files. Tends to help with tree-shaking and
code-splitting, as well as avoiding circular dependencies.

## Some third-party code is bundled

For various reasons, `a11y-dialog`, `autosize`, and `timeago` are forked and bundled into the source code.
This was either because something needed to be tweaked or fixed, or I was trimming unused code and didn't
see much value in contributing it back, because it was too Semaphore-specific.

## There are multiple stores

Originally I conceived of separating out the virtual list into a separate npm package, so I gave it its
own Svelte store (`virtualListStore.js`). This never happened, but it still has its own store. This is useful
anyway, because each store has its state maintained in an LRU cache that allows us to keep the scroll position
in the virtual list e.g. when the user hits the back button.

Also, the main `store.js` store is explicitly
loaded by every component that uses it. So there's no `store` inheritance; every component just declares
whatever store it uses. The main `store.js` is the primary one.

## There is a global event bus

It's in `eventBus.js`. This is useful for some stuff that is hard to do with standard Svelte or DOM events.
