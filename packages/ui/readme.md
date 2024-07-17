# @chroniconl/ui

[![MIT License](https://img.shields.io/badge/license-MIT-yellow.svg)](<[./LICENSE](https://github.com/matthewbub/chroniconl-cms/blob/main/LICENSE)>)

This is pretty much a consolidated directory of https://ui.shadcn.com/ components that we're using in Chroniconl.

> I'd recommend using https://ui.shadcn.com/ itself it you're starting a new project.

## Setup

First install the package

```sh
pnpm add @chroniconl/ui
```

Since the components within are built on top of TailwindCSS, you will need to include the `@chroniconl/ui` package in your `tailwind.config.js` file.

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Add the @chroniconl/ui package to the content array
    './node_modules/@chroniconl/ui/**/*.{js,jsx}',
  ],
}
```

## Development

To publish a new version of the package, run the following commands:

```sh
pnpm run build
node build/bumpAlpha.js
npm publish --access public
```