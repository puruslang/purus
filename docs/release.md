# Release setup

One-time setup for the release workflows `.github/workflows/release-<package>.yml` and the shared `_release.yml` (tracked in #13 and #14).

## npm Trusted Publisher

On npmjs.com, for every released package (`purus`, `@puruslang/linter`, `@puruslang/prettier-plugin-purus`, and the language server and MCP packages once published): package -> Settings -> Trusted Publisher -> GitHub Actions. Organization `puruslang`, repository `purus`, workflow `release-<package>.yml` (for example `release-linter.yml`, the file that is triggered, not `_release.yml`), environment `release`. No `NPM_TOKEN` is needed afterwards; remove the old secret.

## GitHub App `purus-release`

1. Create the app under the `puruslang` organization (Settings -> Developer settings -> GitHub Apps). Permissions: Contents read and write, Pull requests read and write, Metadata read. No webhook.
2. Generate a private key and install the app on `puruslang/purus`.
3. Create the Environment `release` in the repository (restrict to `main`, optionally require a reviewer) and add the variable `RELEASE_APP_ID` and the secret `RELEASE_APP_PRIVATE_KEY`.
4. Rulesets: `main` (pull request required, required status checks, no force push, no deletion) and tag `v*` (restrict creation). Add the app as the only bypass actor of both.

## Verify

Run `release-purus.yml` with `version=1.2.0-beta.0`; the push dry run step proves that the bot can push to the protected `main` before anything is published.
