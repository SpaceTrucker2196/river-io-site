#!/usr/bin/env python3
"""
Mirror an app's GitHub Pages site into river-io-site as a landing page,
preserving the app's own styling. Each app on river.io carries its own
chrome — this script does the mechanical copy + path rewrites needed
so the result resolves under www.river.io/<slug>.html.

Source layout expected:
    <source>/docs/index.html
    <source>/docs/<other>.html      (optional sibling pages)
    <source>/docs/assets/...        (optional asset tree)

After sync, the river-io-site looks like:
    <slug>.html                     (was: <source>/docs/index.html)
    <slug>-<other>.html             (was: <source>/docs/<other>.html)
    assets/<slug>/...               (was: <source>/docs/assets/...)

Rewrites applied to every copied HTML file:
  * href / src values like "assets/X"  →  "assets/<slug>/X"
  * href values like "<other>.html"    →  "<slug>-<other>.html"
    (only when <other>.html exists in the source docs/ — never touches
    external links, anchors, or unrelated paths)
  * CSS files copied to assets/<slug>/ get the same assets/ rewrites,
    so a stylesheet pointing at "../assets/foo.png" or "assets/foo.png"
    keeps resolving under the namespaced subtree.

What the script does NOT do:
  * Render Jekyll — only static-HTML pages-sites are supported. If the
    source has a `_config.yml`, the script refuses and tells you to
    `bundle exec jekyll build` first (or hand-port).
  * Inject a "← river.io" back-link — that's a one-time per-app polish
    left to the human, because each app's header is laid out
    differently and a robust selector is harder than the value adds.
  * Update navigation on sibling river.io pages (e.g. clientapt.html,
    sloth.html) to add a new app's link. Also a one-time human edit.

Re-running on the same slug overwrites previous output; safe to re-sync
after the app updates its pages.
"""
from __future__ import annotations
import argparse
import re
import shutil
import sys
from pathlib import Path

# Match href / src / content attribute values. Group 1 = quote, Group 2 = value.
# `content` is included so og:image / og:url / similar meta tags rewrite alongside
# href/src. rewrite_value() leaves any value that isn't a known asset or sibling
# alone, so this is safe for non-asset `content="..."` (descriptions, titles).
ATTR_RE = re.compile(r"""(?:href|src|content)\s*=\s*(["'])([^"']+)\1""")
# Match CSS url() values. Group 1 = inner value (no outer quotes).
CSS_URL_RE = re.compile(r"""url\(\s*['"]?([^'")]+)['"]?\s*\)""")


def is_external(value: str) -> bool:
    if value.startswith("#"):
        return True
    if value.startswith("/"):
        return True
    if "://" in value:
        return True
    if value.startswith("mailto:") or value.startswith("tel:"):
        return True
    return False


def rewrite_html(
    html: str, slug: str, sibling_basenames: set[str]
) -> str:
    """Rewrite attribute values inside an HTML document for a slug move."""

    def repl(m: re.Match) -> str:
        quote, value = m.group(1), m.group(2)
        new_value = rewrite_value(value, slug, sibling_basenames)
        return m.group(0).replace(f"{quote}{value}{quote}", f"{quote}{new_value}{quote}")

    return ATTR_RE.sub(repl, html)


def rewrite_css(text: str, slug: str) -> str:
    """Rewrite url() references inside a CSS file for the slug move."""

    def repl(m: re.Match) -> str:
        value = m.group(1)
        new_value = rewrite_value(value, slug, sibling_basenames=set())
        return m.group(0).replace(value, new_value)

    return CSS_URL_RE.sub(repl, text)


def rewrite_value(value: str, slug: str, sibling_basenames: set[str]) -> str:
    if is_external(value):
        return value
    # Split fragment off so links like "page.html#anchor" still rewrite.
    fragment = ""
    if "#" in value:
        value, fragment = value.split("#", 1)
        fragment = "#" + fragment
    # Asset rewrites.
    if value.startswith("assets/"):
        return f"assets/{slug}/{value[len('assets/'):]}" + fragment
    if value.startswith("./assets/"):
        return f"./assets/{slug}/{value[len('./assets/'):]}" + fragment
    if value.startswith("../assets/"):
        # CSS at assets/<slug>/foo.css referring to ../assets/X means
        # the source intended root-level assets/. After the namespacing
        # both source and dest are at the same depth (assets/<slug>/), so
        # ../assets/X needs to become ../assets/<slug>/X to keep
        # pointing inside the namespace.
        return f"../assets/{slug}/{value[len('../assets/'):]}" + fragment
    # Sibling-page rewrites — must match target_html_name() exactly,
    # i.e. index.html collapses to <slug>.html while others gain the
    # <slug>- prefix.
    if value in sibling_basenames:
        if value == "index.html":
            return f"{slug}.html" + fragment
        stem = value[: -len(".html")]
        return f"{slug}-{stem}.html" + fragment
    return value + fragment


def collect_sibling_html(docs: Path) -> dict[str, Path]:
    """Top-level HTML files only — wiki/ and views/ subtrees stay
    repo-internal and are not part of the marketing site."""
    return {p.name: p for p in docs.glob("*.html") if p.is_file()}


def target_html_name(slug: str, source_name: str) -> str:
    if source_name == "index.html":
        return f"{slug}.html"
    return f"{slug}-{source_name}"


def main() -> int:
    here = Path(__file__).resolve().parent
    site_root = here.parent  # river-io-site/

    ap = argparse.ArgumentParser(description=__doc__.splitlines()[1])
    ap.add_argument("--slug", required=True, help="URL slug, e.g. 'sloth'")
    ap.add_argument(
        "--source",
        required=True,
        type=Path,
        help="Path to the app repo (expects <source>/docs/index.html)",
    )
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    source = args.source.expanduser().resolve()
    docs = source / "docs"
    if not docs.is_dir():
        raise SystemExit(f"No docs/ directory at {docs}")
    if not (docs / "index.html").is_file():
        raise SystemExit(f"No docs/index.html at {docs} — not a pages site")
    if (docs / "_config.yml").exists():
        raise SystemExit(
            f"{docs / '_config.yml'} exists — this script handles static HTML "
            "pages-sites only. Run `bundle exec jekyll build` first and point "
            "--source at the rendered output, or hand-port Jekyll sites."
        )

    siblings = collect_sibling_html(docs)
    sibling_basenames = set(siblings.keys())

    dest_assets_dir = site_root / "assets" / args.slug
    source_assets_dir = docs / "assets"

    plan: list[tuple[str, Path, Path]] = []

    for name, src in siblings.items():
        dst = site_root / target_html_name(args.slug, name)
        plan.append(("html", src, dst))

    if source_assets_dir.is_dir():
        for src in sorted(source_assets_dir.rglob("*")):
            if src.is_dir():
                continue
            rel = src.relative_to(source_assets_dir)
            dst = dest_assets_dir / rel
            plan.append(("asset", src, dst))

    for kind, src, dst in plan:
        rel_dst = dst.relative_to(site_root)
        marker = "(dry-run) " if args.dry_run else ""
        print(f"{marker}{kind:6} {src.relative_to(source)}  →  {rel_dst}")

    if args.dry_run:
        return 0

    for kind, src, dst in plan:
        dst.parent.mkdir(parents=True, exist_ok=True)
        if kind == "html":
            html = src.read_text(encoding="utf-8")
            html = rewrite_html(html, args.slug, sibling_basenames)
            dst.write_text(html, encoding="utf-8")
        elif kind == "asset" and dst.suffix.lower() == ".css":
            text = src.read_text(encoding="utf-8")
            text = rewrite_css(text, args.slug)
            dst.write_text(text, encoding="utf-8")
        else:
            shutil.copy2(src, dst)

    print(f"Synced {len(plan)} files for slug={args.slug!r}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
