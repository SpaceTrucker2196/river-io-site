#!/usr/bin/env python3
"""Start a post, and keep the archive and the feed honest.

The site is flat HTML — every post is a standalone file that works on
its own. This script exists only so the two derived things (the archive
list in index.html and feed.xml) never drift from what is actually in
posts/.

    ./new-post.py "The repo is the factory" \
        --dek "One sentence that makes someone read the first paragraph." \
        --tags "Pattern, Autonomy" --minutes 9

    ./new-post.py --rebuild        # after editing posts by hand

Post contract (the parser reads exactly these):

    posts/YYYY-MM-DD-slug.html     date comes from the filename
    <h1>…</h1>                     title
    <p class="dek">…</p>           dek, also the feed description
    <b>Order NNN</b>               order number, shown in the archive
    <span>N min</span>             reading time
    <meta name="tags" content="A, B">   archive tags

Nothing here runs at serve time. Commit the output.
"""

import argparse
import datetime as dt
import html
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
POSTS = HERE / "posts"
INDEX = HERE / "index.html"
FEED = HERE / "feed.xml"
TEMPLATE = HERE / "_template.html"

SITE = "https://www.river.io"
BASE = f"{SITE}/blog"
FEED_TITLE = "The Dark Factory"
FEED_DESC = ("Notes from River.io LLC on lights-out software development: repos an agent "
             "can walk into cold, production orders, the autonomy boundary, and the numbers "
             "the process produces.")

BEGIN = "<!-- POSTS:BEGIN"
END = "<!-- POSTS:END -->"


def slugify(title):
    s = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
    return re.sub(r"-{2,}", "-", s)


def grab(pattern, text, default=""):
    m = re.search(pattern, text, re.S)
    return re.sub(r"\s+", " ", m.group(1)).strip() if m else default


def read_post(path):
    """Pull the archive/feed metadata out of a finished post."""
    text = path.read_text(encoding="utf-8")
    date_part = path.name[:10]
    try:
        date = dt.date.fromisoformat(date_part)
    except ValueError:
        sys.exit(f"{path.name}: filename must start with YYYY-MM-DD")

    title = grab(r"<h1>(.*?)</h1>", text)
    dek = grab(r'<p class="dek">(.*?)</p>', text)
    order = grab(r"<b>Order\s+([0-9]+)</b>", text, "000")
    minutes = grab(r"<span>(\d+)\s*min</span>", text, "")
    tags_raw = grab(r'<meta name="tags" content="([^"]*)"', text)
    tags = [t.strip() for t in tags_raw.split(",") if t.strip()]

    if not title:
        sys.exit(f"{path.name}: no <h1> found")
    if not dek:
        sys.exit(f'{path.name}: no <p class="dek"> found')

    return {"path": path, "href": f"posts/{path.name}", "date": date, "title": title,
            "dek": dek, "order": order, "minutes": minutes, "tags": tags}


def load_posts():
    posts = [read_post(p) for p in sorted(POSTS.glob("*.html")) if not p.name.startswith("_")]
    # newest first; ties broken by order number so same-day posts stay stable
    posts.sort(key=lambda p: (p["date"], p["order"]), reverse=True)
    return posts


def render_rows(posts):
    rows = []
    for p in posts:
        tags = "".join(f"<span>{html.escape(t)}</span>" for t in p["tags"])
        tag_block = f'\n        <div class="tags">{tags}</div>' if tags else ""
        mins = f'<b>{p["minutes"]} min read</b>' if p["minutes"] else ""
        rows.append(
            '  <article class="post-row">\n'
            '    <div class="in">\n'
            f'      <div class="order">Order {p["order"]}</div>\n'
            "      <div>\n"
            f'        <h2><a href="{p["href"]}">{p["title"]}</a></h2>\n'
            f'        <p class="dek">{p["dek"]}</p>{tag_block}\n'
            "      </div>\n"
            f'      <div class="when">{p["date"].strftime("%-d %b %Y")}{mins}</div>\n'
            "    </div>\n"
            "  </article>"
        )
    return "\n".join(rows)


def rebuild_index(posts):
    text = INDEX.read_text(encoding="utf-8")
    start, end = text.find(BEGIN), text.find(END)
    if start == -1 or end == -1:
        sys.exit("index.html: POSTS:BEGIN / POSTS:END markers missing")
    head_end = text.find("-->", start) + 3
    new = text[:head_end] + "\n" + render_rows(posts) + "\n  " + text[end:]

    # keep the masthead post count truthful
    new = re.sub(r'(<div><span class="n">)\d+(</span><span class="l">Posts</span>)',
                 rf"\g<1>{len(posts)}\g<2>", new)
    INDEX.write_text(new, encoding="utf-8")


def rfc822(date):
    # posts are dated, not timestamped; noon UTC keeps every reader's date correct
    return dt.datetime(date.year, date.month, date.day, 12, 0, 0).strftime(
        "%a, %d %b %Y %H:%M:%S +0000")


def rebuild_feed(posts):
    items = []
    for p in posts:
        link = f"{BASE}/{p['href']}"
        items.append(
            "    <item>\n"
            f"      <title>{html.escape(p['title'])}</title>\n"
            f"      <link>{link}</link>\n"
            f'      <guid isPermaLink="true">{link}</guid>\n'
            f"      <pubDate>{rfc822(p['date'])}</pubDate>\n"
            f"      <description>{html.escape(p['dek'])}</description>\n"
            + "".join(f"      <category>{html.escape(t)}</category>\n" for t in p["tags"])
            + "    </item>"
        )
    built = posts[0]["date"] if posts else dt.date.today()
    FEED.write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n'
        "  <channel>\n"
        f"    <title>{FEED_TITLE}</title>\n"
        f"    <link>{BASE}/</link>\n"
        f"    <description>{html.escape(FEED_DESC)}</description>\n"
        "    <language>en</language>\n"
        f"    <lastBuildDate>{rfc822(built)}</lastBuildDate>\n"
        f'    <atom:link href="{BASE}/feed.xml" rel="self" type="application/rss+xml" />\n'
        + "\n".join(items) + "\n"
        "  </channel>\n"
        "</rss>\n",
        encoding="utf-8")


def create(args):
    date = dt.date.fromisoformat(args.date) if args.date else dt.date.today()
    slug = args.slug or slugify(args.title)
    path = POSTS / f"{date.isoformat()}-{slug}.html"
    if path.exists():
        sys.exit(f"{path.name} already exists")

    existing = load_posts()
    order = max((int(p["order"]) for p in existing), default=0) + 1
    tags = [t.strip() for t in args.tags.split(",") if t.strip()]

    body = TEMPLATE.read_text(encoding="utf-8")
    body = (body
            .replace("{{TITLE}}", args.title)
            .replace("{{DEK}}", args.dek)
            .replace("{{ORDER}}", f"{order:03d}")
            .replace("{{DATE_HUMAN}}", date.strftime("%-d %B %Y"))
            .replace("{{MINUTES}}", str(args.minutes))
            .replace("{{TAG1}}", tags[0] if tags else "Notes")
            .replace("{{TAGS}}", html.escape(", ".join(tags))))

    left = re.findall(r"\{\{[A-Z0-9_]+\}\}", body)
    if left:
        sys.exit(f"_template.html has placeholders new-post.py does not fill: {sorted(set(left))}")
    path.write_text(body, encoding="utf-8")

    rebuild(None)
    print(f"created  {path.relative_to(HERE)}   (order {order:03d})")
    print("edit it, then re-run  ./new-post.py --rebuild")


def rebuild(_args):
    posts = load_posts()
    rebuild_index(posts)
    rebuild_feed(posts)
    print(f"rebuilt  index.html + feed.xml   ({len(posts)} post{'s' if len(posts) != 1 else ''})")


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("title", nargs="?", help="post title")
    ap.add_argument("--dek", default="", help="one-sentence standfirst, also the feed description")
    ap.add_argument("--tags", default="", help="comma-separated, e.g. 'Pattern, Autonomy'")
    ap.add_argument("--minutes", type=int, default=6, help="reading time")
    ap.add_argument("--slug", help="override the URL slug")
    ap.add_argument("--date", help="YYYY-MM-DD (default: today)")
    ap.add_argument("--rebuild", action="store_true", help="only regenerate index.html + feed.xml")
    args = ap.parse_args()

    if args.rebuild:
        rebuild(args)
    elif args.title:
        if not args.dek:
            sys.exit("a new post needs --dek (it is the archive blurb and the feed description)")
        create(args)
    else:
        ap.print_help()


if __name__ == "__main__":
    main()
