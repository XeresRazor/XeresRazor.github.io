# XeresRazor.github.io

Landing page for my parametric, 3D-printable designs ("customizers") built with [Cadova](https://cadova.org), a Swift CAD library. It is a static site with no build step and no dependencies. Published at https://xeresrazor.github.io/.

Each customizer lives in its own repository and is published at `https://xeresrazor.github.io/<repo-name>/` by that repository's own workflow. This repo only lists them.

## Adding a customizer

Add an object to the array in `customizers.json`. The page renders cards from it, so nothing else changes.

```json
{
  "title": "Gridfinity lidded bin",
  "description": "A Gridfinity bin with a sliding lid. Choose the grid size, height and more.",
  "url": "/Cadovafinity/bins/lidded/",
  "tags": ["Gridfinity", "bin", "lid"],
  "source": "https://github.com/XeresRazor/Cadovafinity",
  "version": "0.1.0",
  "updated": "2026-11-20"
}
```

Fields:

- `title` (required): card heading and link text.
- `description` (required): one or two sentences.
- `url` (required): where the customizer is published, for example `/Cadovafinity/bins/lidded/`.
- `tags` (required): array of short strings shown as pills.
- `source` (optional): repository URL, shown as a "Source code" link.
- `version` (optional): the customizer's release version, shown as a badge next to the title. With `source` set, the card also links to `<source>/releases/tag/<version>` as "Release notes", so the version must match a release tag in that repository.
- `updated` (optional): free-form date text, shown as "Updated ...".

The `<noscript>` list in `index.html` and the fallback in `script.js` list each customizer by hand. Add new ones to both places too if the page should work fully without JavaScript.

## Previewing locally

```
python3 -m http.server
```

Then open http://localhost:8000/. The site must be served over HTTP, since `fetch` does not work from `file://`. Customizer links such as `/Cadovafinity/bins/lidded/` are site-root paths, so they will not resolve in a local preview unless that customizer is served there.

## GitHub Pages

In the repository, go to Settings, Pages, and set the source to deploy from branch `main`, folder `/ (root)`. The `.nojekyll` file turns off Jekyll processing.
