---
name: release
description: Cut a release of the purus npm package with the manual release workflow and the purus-release bot. Use when asked to release, bump the version, publish to npm or create a GitHub Release.
---

# Releasing Purus

The release is a manually triggered GitHub Actions workflow (`.github/workflows/release.yml`). It releases one package at a time (`purus`, `linter`, `prettier-plugin`, `language-server`, `mcp`), each with its own version and tag prefix (`v1.2.0` for the compiler, `linter-v1.2.0` for the others). Do not publish from a laptop and do not push `v*` tags by hand.

## Before triggering

1. `main` is green and contains everything to be released.
2. The changelog entries (`CHANGELOG.md`, `CHANGELOG-ja.md`) for the version are merged.
3. One-time setup is done: the `purus-release` GitHub App, the `release` Environment (variable `RELEASE_APP_ID`, secret `RELEASE_APP_PRIVATE_KEY`), the npm Trusted Publisher for this workflow, and the rulesets that allow only the app to push to `main` and create `v*` tags. See `docs/release.md`.

## Trigger

```sh
gh workflow run release.yml -R puruslang/purus -f package=purus -f version=patch      # or minor, major, 1.2.0
gh workflow run release.yml -R puruslang/purus -f package=linter -f version=1.2.0-beta.0   # dist-tag "beta" is detected
gh run watch -R puruslang/purus
```

The workflow checks and tests (the compiler also builds with MoonBit), bumps the package version (for the compiler `package.json`, `package-lock.json` and `moon.mod` together), builds, verifies a push dry run as the bot, publishes with provenance, pushes the release commit and tag as `purus-release[bot]`, and creates the GitHub Release.

## After

- Check `npm view purus version dist-tags` and the GitHub Release page.
- If publishing failed before the push step, nothing was committed; fix and re-run. If the push failed after publishing, the version is on npm: push the commit and tag manually with the bot token, never re-publish the same version.
