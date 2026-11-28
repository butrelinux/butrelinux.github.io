# Butrelinux website

Static landing page for the [Butrelinux project](https://github.com/butrelinux).

## Files

- `index.html` — page structure and project information.
- `styles.css` — responsive visual styling.
- `script.js` — kernel selector, NVIDIA variant toggle, copy controls, and mobile navigation.

## Local preview

From this directory, run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## GitHub Pages

This repository is named `butrelinux.github.io`, so GitHub Pages can publish the repository root. Confirm the publishing source in **Settings → Pages** before enabling deployment.

## Content maintenance

Project-specific claims are based on repositories in the [butrelinux organization](https://github.com/butrelinux). Keep kernel names, image tags, installation guidance, and download links synchronized with the current [main OS repository](https://github.com/butrelinux/butrelinux).

The docs repository describes its content as AI-generated approximations of the codebase. Verify technical details against current source and repository instructions before changing public claims.
