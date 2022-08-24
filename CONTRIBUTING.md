# Contributing

## Setup

To setup this project, first clone the repo, then run
```bash
yarn install
```

This will install the dependencies and will also install [`husky`](https://typicode.github.io/husky/#/) hooks.

### Husky

The only husky hook present at the moment is a pre-commit one that will prevent commits if the code is not linted (through `yarn lint`).

It is recommended to leave it as is in order to keep the code linted, but it is not required and if you feel like it is negatively impacting your coding experience, you can disable by running `yarn husky uninstall`.

## PR

In order to contribute code to this repo, first fork the `main` branch, and start hacking.

Please keep each PR to one feature/fix/issue at a time (closely related features are acceptable) and update/add docs/test/stories where necessary (or at least mention it in a comment/issue).

### Tests

During each PR, checks will be performed to ensure that the code builds and the tests are passing.

To avoid your PR being rejected, make sure that tests pass through `yarn test`.

## UI Preview

This project also has a subproject that enables a preview of how the component behaves and looks (using [Storybook](https://storybook.js.org)).

To run it locally, run `yarn storybook` in this folder.
## Changelog Generation

Changelog generation through [github_changelog_generator](https://github.com/github-changelog-generator/github-changelog-generator). Make sure to install it if you are a maintainer.