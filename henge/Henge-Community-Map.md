# Henge — community map and rules of engagement

**Research notes, 27 August 2026.** Where Henge's audiences actually are, what they care about, and how to enter without getting banned.

---

## First: I did not join anything

Three reasons, and they are not squeamishness.

**Joining is an identity action.** Every one of these groups shows a real name and profile. A membership is a public association with your account, and several gate entry behind screening questions ("why do you want to join?") that I would have to answer as you. That is your voice, not mine.

**A new account that joins and links is the classic ban pattern.** Every community below has seen it a thousand times. In r/Archaeology in particular, an unknown account posting a 3D Stonehenge app reads as pseudo-archaeology promotion until proven otherwise, and the ban is fast.

**One of these has a real landmine in it**, which I found and which is the most valuable thing in this document. See the OBOD section.

Tell me which to join and I will do them one at a time, or hand you the list to do yourself in ten minutes. My recommendation is you do the pagan and archaeology ones personally, because those communities can tell.

---

## The finding that matters most

**The largest organised druid order dates half its festivals the way Henge says is wrong, and knows it.**

The Order of Bards, Ovates & Druids (OBOD) is the biggest modern druid order — thousands of members, international branches in Australia, France, Germany, Italy, the Netherlands and Portugal, organised into local Seed Groups, Groves and Gorseddau. Their published Wheel of the Year splits into two:

| Festival type | How OBOD dates them |
|---|---|
| Solstices and equinoxes | **Astronomical.** Their own text: dates "vary each year since the events are astronomical not man-made, like our calendar" |
| The four fire festivals | **Fixed calendar dates.** Samhuinn 31 Oct, Imbolc 1 Feb, Beltane 1 May, Lughnasadh 1 Aug |

Henge's Wheel solves all eight from true solar longitude, and surfaces exactly this: the customary cross-quarter dates run **three to seven days ahead** of where the sun actually reaches those points.

So Henge answers a question this community already half-asks. They have already accepted astronomical dating for four festivals. The other four are fixed by convention, and a meaningful minority of practitioners date them astronomically instead and argue about it. **Henge is the only app that shows both and says which is which.**

That is your entry line, and it is a contribution rather than a pitch: *"Your solar festivals already follow the sun. Here is what the sun is actually doing on the fire festivals, computed rather than looked up."*

**And here is the landmine.** OBOD's own material presents the eightfold wheel as ancient practice, referencing "over four thousand years." It does not acknowledge that the eightfold wheel is a twentieth-century synthesis. Henge tiers exactly that claim as **Modern tradition**, and says so on screen.

You are right and they will not enjoy it. So do not lead with it. Lead with the festival timing, which is useful to them. Let the tier system be something they discover in the app and respect you for, rather than the thing you walked in announcing. If challenged, the honest answer is that the app tiers every claim including ones that flatter no one, and that druidry is presented as living inheritance rather than as the builders' religion. That is defensible and true. It is just a terrible opening line.

---

## The map, ranked by what I would actually do first

### 1. iOS and graphics developers — start here

**Why first:** lowest risk, highest conversion, and it is your own peer group. You can speak without translating. Nobody bans a developer for showing their work if the work is real.

**Where:** r/iOSProgramming, r/swift, r/GraphicsProgramming, the iOS dev community on Mastodon, Hacker News (Show HN), Metal-focused Discords.

**What they actually care about:** not Stonehenge. They care that you hand-wrote a Metal 3 renderer with no game engine, that `Package.swift` has zero third-party dependencies and a cold clone builds offline, and above all **that you wrote a test that catches the renderer lying.** The shadow-agreement test — analytic solution on one side, headless GPU render on the other, agreement asserted to 0.28 m measured rather than chosen — is a genuinely unusual piece of engineering and it is the thing this audience will actually talk about.

**Your angle:** "I made the renderer prove itself against a solver that imports no graphics." Not "check out my Stonehenge app."

**Rules:** Show HN wants the artifact and a plain description. r/GraphicsProgramming rewards technical depth and punishes marketing. Post the technique, link the app in a comment or the body's last line.

### 2. Archaeoastronomy and amateur astronomy

**Why:** smallest audience, but the highest credibility per person, and they are the ones who can vouch for you to the bigger groups.

**Where:** the Cloudy Nights forums, r/astronomy, the Stellarium user community, and the academic edges — SEAC (European Society for Astronomy in Culture) and ISAAC run conferences and mailing lists.

**What they actually care about:** provenance and error bars. Meeus for solar and lunar theory, Laskar for obliquity, Hipparcos for stars, VSOP87D for planets, LRO imagery for the lunar face. They will want to know your tolerances, and you have them: solar apparent longitude within 0.001°, RA and dec within 0.002° of Meeus's published examples, obliquity within 0.0001°.

**Your angle:** the epoch-dependent bearings. Most Stonehenge content quietly uses modern obliquity. You compute it per epoch, which is why your 2500 BC numbers differ from your 2026 numbers, and that difference is the whole point.

**Rules:** these are patient, technical, unhurried spaces. Nobody minds a link if the post is substantive. They will absolutely find an error if you have one.

### 3. Megalithic and archaeology enthusiasts

**Where:** The Megalithic Portal (megalithic.co.uk — long-running, contributor-driven, sits behind Cloudflare so join in a normal browser), Stone Pages (stonepages.com), r/Megalithic, r/AncientCivilizations, r/Archaeology.

**What they actually care about:** fieldwork, site photography, survey data, and — intensely — keeping pseudo-archaeology out. This community is in a permanent defensive crouch about ancient-aliens material, and a slick 3D Stonehenge triggers that reflex before anyone reads a word.

**Your angle, and it is a strong one:** the tier system *is* the pitch here. Established / Debated / Modern tradition, every claim cited, a test that fails the build if anything ships untiered. Plus Petrie numbering on every stone, and terrain from actual Salisbury Plain survey data rather than an artist's hill.

**Then give them the 49.9° finding.** Built axis 49.9°, computed midsummer sunrise for 2500 BC at 49.08° (0.8° off), midwinter sunset landing 0.2° off. Midwinter fits better. That is a real result out of an ephemeris and it is exactly the kind of thing this audience will argue about for a week. It also proves, instantly, that you are not selling mysticism — you published the number that does not flatter the popular story.

**Rules:** r/Archaeology has a hard line on self-promotion and on anything smelling of pseudo-archaeology. Read their rules before posting, contribute to other threads first, and when you do post, lead with the methodology and the finding, not the app.

### 4. Modern druid and pagan communities

**Where:** OBOD's Groves and Seed Groups (local, international), ADF (Ár nDraíocht Féin, US-based), r/druidism, r/pagan, r/witchcraft, and a large Facebook ecosystem of Wheel of the Year and solstice groups.

**What they actually care about:** seasonal observance as lived practice, ritual timing, connection to land and season, and — more than outsiders expect — authenticity debates. This is not a credulous audience. They argue constantly about what is genuinely inherited versus twentieth-century invention.

**Your angle:** festival timing computed to the moment the sun actually arrives, plus the festival jumps landing on sunrise rather than midnight. That is practically useful to someone planning an observance.

**Rules:** see the landmine above. Also: this is the audience most likely to feel sold to, and most likely to reward genuine participation. Slowest burn, largest payoff, highest chance of a misstep.

### 5. Educators

**Where:** astronomy and history teacher communities, homeschool science groups, planetarium educators.

**What they care about:** something that demonstrates a concept in ninety seconds on a projector. The solstice alignment and the precession of the pole star are both curriculum topics that are genuinely hard to show any other way.

**Your angle:** Thuban at the 2800 BC pole. Watching Polaris drift off the pole and Thuban take its place is the single best teaching visual in the app, and it falls out of the arithmetic rather than being drawn.

---

## Cross-cutting: the seasonal spike

All four non-developer communities spike hard around the solstices, 21 June and 21 December. Winter solstice is roughly sixteen weeks out. That is enough time to join, participate genuinely for a couple of months, and be a known name rather than a stranger when the traffic arrives. If you join in December and post a link the same week, you get nothing.

---

## What I could not verify

Being straight about the gaps:

- **Reddit is blocked** to me on both the browser pane and fetch, so every subreddit above is from prior knowledge. I have no current subscriber counts, no current rule text, and no read on how active they are. Check each one's sidebar yourself before posting.
- **The Megalithic Portal** is behind a Cloudflare bot check I did not attempt to bypass, so I could not assess its forum activity.
- **Facebook** would not return a logged-in group search through the pane, so the Facebook group ecosystem is characterised from search results rather than observed.
- **OBOD's structure and dating scheme is verified** — read directly from druidry.org. That is the one claim here I stand behind fully.

---

## My honest recommendation

Do the developer communities yourself this week — it costs you nothing, the story is already true, and the shadow-agreement test is a genuinely good post.

Do archaeoastronomy next, because credibility there travels.

Approach the megalithic and pagan communities slowly, starting in September, leading with the 49.9° finding for the archaeologists and the festival timing for the druids. Be a participant for two months before you ever link.

And do not treat any of this as the growth plan. It is credibility building. The App Store listing and the solstice-timed content are what actually move installs.
