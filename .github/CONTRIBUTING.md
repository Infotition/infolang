# Contributing to Infotition projects

A big welcome and thank you for considering contributing to Infotition open source projects! Your help is essential for keeping it great.

The goal of this document is to create a contribution process that:

- Encourages new contributions.
- Encourages contributors to remain involved.
- Setting up a development environment.
- Avoids unnecessary processes and bureaucracy whenever possible.

Reading and following these guidelines will help us make the contribution process easy and effective for everyone involved. It also communicates that you agree to respect the time of the developers managing and developing these open source projects. In return, we will reciprocate that respect by addressing your issue, assessing changes, and helping you finalize your pull requests.

## Quicklinks

* [Code of Conduct](#code-of-conduct)

* [Getting Started](#getting-started)

    * [Issues](#issues)

    * [Pull Requests](#pull-requests)

* [Development Environment setup](#development-environment-setup)

* [Testing](#testing)

* [Getting Help](#getting-help)

## Code of Conduct

We take our open source community seriously and hold ourselves and other contributors to high standards of communication. By participating and contributing to this project, you agree to uphold our [Code of Conduct](https://github.com/Infotition/infolang/blob/main/.github/CODE_OF_CONDUCT.md).

## Getting Started

Contributions are made to this repo via Issues and Pull Requests (PRs). A few general guidelines that cover both:

- Search for existing Issues and PRs before creating your own.
- We work hard to makes sure issues are handled in a timely manner but, depending on the impact, it could take a while to investigate the root cause. A friendly ping in the comment thread to the submitter or a contributor can help draw attention if your issue is blocking.

### Issues

Issues should be used to report problems with the project, request a new feature, or to discuss potential changes before a PR is created. When you create a new Issue, a template will be loaded that will guide you through collecting and providing the information we need to investigate.

If you have questions (for example about the code), please ask it in the [Discord server](https://discord.gg/NpxrDGYDwV) instead of opening an issue.

If you find an Issue that addresses the problem you're having, please add your own reproduction information to the existing issue rather than creating a new one. Adding a [reaction](https://github.blog/2016-03-10-add-reactions-to-pull-requests-issues-and-comments/) can also help be indicating to our maintainers that a particular problem is affecting more than just the reporter.

### Pull Requests

PRs to our projects are always welcome and can be a quick way to get your fix or improvement slated for the next release. In general, PRs should:

- Only fix/add the functionality in question **OR** address wide-spread whitespace/style issues, not both.
- Add unit or integration tests for fixed or changed functionality (if a test suite already exists).
- Address a single concern in the least number of changed lines as possible.
- Include documentation in the repo.
- Be accompanied by a complete Pull Request template (loaded automatically when a PR is created).

Please keep in mind that we use ESLint to enforce a consistent coding style, so having that set up in your editor of choice is a great boon to your development process. Also all javascript files should be written in TypeScript.

## Development Environment setup

The development branch is `dev`. This is the branch that all pull requests should be made against. After publishing a stable release, the changes in the `dev` branch are rebased into `master`.

The following guide will help you set up a local development environment. In general, we follow the ["fork-and-pull" Git workflow](https://github.com/susam/gitpr):

1. Fork the repository to your own Github account
2. Clone the project to your machine
3. Create a branch locally with a succinct but descriptive name
4. Install the dependencies
5. Commit changes to the branch
6. Following any formatting and testing guidelines specific to this repo
7. Push changes to your fork
8. Open a PR in our repository and follow the PR template so that we can efficiently review the changes.
9. Wait for your pull request to be reviewed and merged.

We recommend using [Visual Studio Code](https://code.visualstudio.com/) as your Text Editor. For a trouble-free development experience. We also recommend installing these extensions in Visual Studio Code:

- Better Comments (Aron Bond)
- EditorConfig for VS Code (EditorConfig)
- ESLint (Dirk Baeumer)
- JavaScript and TypeScript Nightly (Microsoft)
- TypeScript Hero (Christoph Bühler)
- Prettier (Prettier)
- Prettier ESLint (Rebecca Vest)
- Stylelint (Stylelint)

A nice theme for Visual Studio Code is `palenight` from the Community Material Theme package. The Material Icon Theme packge is also handy. If you installed the extensions, you can add the following settings to your Visual Studio Code settings.json.

```json
{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "eslint.validate": ["javascript"],
    "javascript.updateImportsOnFileMove.enabled": "always",
    "explorer.confirmDelete": false,
    "explorer.compactFolders": false,
}
```

Feel free to use your own development environment, this is just a suggestion to getting started.

## Testing

Run this command to execute the jest test suites.

```bash
$ npm run test:unit
```

If the ui changed and the snapshots failed, make sure everything works correctly. To update the snapshots you then can run this command.

```bash
$ npm run test:unit:update
```

Run this command to run the integration and e2e tests.

```bash
$ npm run cypress
```
## Getting Help

Join our official [Infotition Discord Server](https://discord.gg/NpxrDGYDwV) and post your question there in the channel.
