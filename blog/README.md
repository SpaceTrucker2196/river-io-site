# The Dark Factory — blog

A flat HTML blog at `www.river.io/blog/`. No Jekyll, no build step, no
dependencies. Every post is one self-contained `.html` file that renders
correctly if you open it straight off disk. GitHub Pages serves the
directory as-is.

```
blog/
  index.html      the archive — post list, regenerated between markers
  style.css       the only stylesheet; posts carry no styling of their own
  feed.xml        RSS 2.0, regenerated
  _template.html  copy-to-start a post (the leading _ keeps it out of the archive)
  new-post.py     starts a post; regenerates index.html + feed.xml
  posts/
    YYYY-MM-DD-slug.html
```

## Writing a post

```sh
cd blog
./new-post.py "The part everyone skips" \
    --dek "The autonomy boundary is the one document that decides whether an agent asks about everything or nothing." \
    --tags "Autonomy, Practice" --minutes 7
```

That creates `posts/2026-08-03-the-part-everyone-skips.html` with the
next order number filled in, then rebuilds the archive and the feed.
Write the body between the `<article>` markers — the template lists
every block the stylesheet supports (drop cap, pull quote, bordered
note, code block, data table) — and then:

```sh
./new-post.py --rebuild
```

Rebuild after **any** hand edit to a post's title, dek, tags, reading
time or filename. The archive list and the feed are derived; the posts
are the source.

## What the rebuild reads

The parser is deliberately dumb and will tell you if a post breaks the
contract:

| Piece | Where it comes from |
|---|---|
| Date | the `YYYY-MM-DD` at the start of the filename |
| Title | `<h1>` |
| Dek | `<p class="dek">` — also the feed description |
| Order number | `<b>Order NNN</b>` in the meta line |
| Reading time | `<span>N min</span>` in the meta line |
| Archive tags | `<meta name="tags" content="A, B">` |

Order numbers are production-order numbers: they only ever go up, and
they are not reused. Posts sort newest-first in the archive regardless.

## House style

The subject is lights-out software development — repos built so an
agent can walk in cold and keep building. What makes a post worth
publishing here:

- **Show the records.** Metrics rows, converge iteration counts, ledger
  entries. The tables in post 001 are real rows out of a real tree.
- **Publish the second lap.** A factory that reports only its clean runs
  is a brochure. The run that needed a retry is the interesting one.
- **No vendor pitch.** The pattern is the product of the writing; the
  apps have their own pages at `/software/`.
- **Claims are checkable.** If a number appears, it came from a file in
  a repo, and the post says which.

## Backlog

Drafted, not written:

- **The autonomy contract** — the three buckets in full, and why the
  tactical/structural distinction is the one agents get wrong.
- **The oracle problem** — what "green means ship-ready" costs, and the
  self-referential test trap (never feed a parser its own output).
- **Append-only or it didn't happen** — METRICS.md and LEDGER.md as
  factory instrumentation, and what the rows reveal after a month.
- **The cold-start drill** — running it on a real repo, and every
  question the agent had to ask.
- **Where it breaks** — the classes of work that stay Level 3, and why
  design and pricing decisions are not delegable.
- **The converge loop, step by step** — nine steps, and what each gate
  actually catches.

## Deploying

The blog is part of `river-io-site`, which GitHub Pages serves from
`main`. Commit and push; the post is live at
`www.river.io/blog/posts/<file>.html` within a minute or two. Verify the
archive and `feed.xml` picked it up before pushing.
