# Contributing to semaphore

## Building

Semaphore requires [Node.js](https://nodejs.org) and [npm](https://npmjs.com).

To build Semaphore for production,
install dependencies,
then run the web server:

	npm install
	npm run dev

### Exporting

Semaphore is a static site. When you run `npm build`, static files will be
written to `__sapper__/export`.

It is _not_ recommended to directly expose these files when self-hosting. Instead, you should use `node server.js` (e.g. with an
nginx or Apache proxy in front). This adds several things you don't get from the raw static files:

- [CSP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (important for security)
- Certain dynamic routes (less important because of Service Worker managing routing, but certain things could break if Service Workers are disabled in the user's browser)
