# unsearch

unsearch is a simple library designed to add flexible search functionality to your own APIs and databases.

## Features

- Pluggable architecture ([andScope, orScope, sortScope, limitScope, offsetScope])
- key:value scope search
- asc:key or desc:key sort search
- limit:count limit search (soon)
- offset:count offset search (soon)
- key:value OR key:value orScope search
- key:value AND key:value andScope search

## Installation

```bash
pnpm add unsearch
```

## Development

1. To use this template, click the "Use this template" button above.
2. Clone the repository to your local machine.
3. Run `pnpm install` to install the dependencies.
4. Run `pnpm build` to build the bundle.
5. Run `pnpm start` to start the bundle.
6. Run `pnpm lint` to lint the code. (You can also run `pnpm lint:fix` to fix the linting errors.)
7. Run `pnpm test` to run the tests. (You can also run `pnpm test:watch` to run the tests in watch mode.)
8. Run `pnpm release` to bump the version. Terminal will ask you to select the version type. And then it will automatically commit and push the changes. GitHub Actions will automatically publish git tags. NPM local registry will automatically publish the package.

## Configuration

### Renovate

[Setup Github App](https://github.com/apps/renovate) for Renovate.

### TS Config Base

(tsconfig.json)[https://github.com/tsconfig/bases/tree/main/bases] is used as the base config for the Typescript compiler.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/oku-ui/static/sponsors/sponsors.svg">
    <img alt="sponsors" src='https://cdn.jsdelivr.net/gh/oku-ui/static/sponsors/sponsors.svg'/>
  </a>
</p>

## License

This project is licensed under the [MIT License](LICENSE).
