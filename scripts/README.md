# river-io-site scripts

## `sync-app-page.py`

Mirror an app's GitHub Pages site into this repo, preserving the app's
own styling. Each app on river.io carries its own chrome — this script
does the mechanical copy + path rewrites needed so the result resolves
under `www.river.io/<slug>.html`.

### Usage

```sh
./scripts/sync-app-page.py --slug <name> --source <repo-path>
./scripts/sync-app-page.py --slug <name> --source <repo-path> --dry-run
```

### What it expects from the source app

A static-HTML pages site at `<source>/docs/`:

- `index.html` (required)
- any number of sibling `*.html` files (optional)
- `assets/` (optional)

If `<source>/docs/_config.yml` exists, the script refuses — Jekyll
sites need to be rendered to static HTML first (`bundle exec jekyll
build`) or hand-ported once.

### What lands in this repo

```
<slug>.html              ← <source>/docs/index.html
<slug>-<name>.html       ← <source>/docs/<name>.html  (per sibling)
assets/<slug>/...        ← <source>/docs/assets/...
```

### What it rewrites inside copied files

- `href` / `src` / `content` values like `assets/X` → `assets/<slug>/X`
- `href` values pointing at a sibling page → the renamed sibling
  (e.g. `quickstart.html` → `<slug>-quickstart.html`, `index.html` →
  `<slug>.html`)
- CSS `url(...)` references get the same `assets/` rewrites
- External URLs, anchors, mailto:, tel: — left alone

### What it does **not** do

- Render Jekyll. Source must be static HTML already.
- Inject a back-link to river.io — each app's header layout is
  different and a robust selector is harder than the value adds.
  Add the link by hand once per app.
- Update navigation on sibling river.io pages (e.g. `clientapt.html`)
  to add the new app's link. One-time human edit.

### Re-running

Safe. Overwrites previous output for the same slug. Re-sync after the
upstream app updates its pages.

### Worked examples in this repo

| Slug | Source | Mode |
|------|--------|------|
| `sloth` | `~/projects/sloth` | Synced via this script |
| `galactic` | `~/projects/StatusGalactic-iOS` | Hand-ported (Jekyll source) |
