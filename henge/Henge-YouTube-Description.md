# Henge — YouTube package

Copy-paste blocks below. Chapter timecodes are the real ones from `henge-vo-cues.md`, so they will match the cut as long as the VO master is laid down at 00:00 with no offset.

---

## Title (pick one)

Ranked by what I would actually publish, and why.

1. **Stonehenge Keeps Real Time: A Working Astronomical Calendar You Can Hold** — leads with the store subtitle, reads as a claim, no clickbait.
2. **I Built Stonehenge in Code, and the Shadows Are Accurate to 28 Centimetres** — strongest for the dev audience, and the number is the hook.
3. **Stonehenge's Midwinter Alignment Fits Better Than Midsummer. Here's the Math.** — highest click-through of the three, because it argues with the popular story. Also the most likely to draw comments.

Keep the primary keyword in the first 40 characters. Titles over ~60 characters truncate on mobile.

---

## Description

```
Stonehenge, rebuilt as a working astronomical calendar. The sun is computed from a real ephemeris, and the stones cast the exact shadows it demands.

Henge is a photoreal, real-time 3D Stonehenge for iPhone, iPad and Mac that doubles as a working astronomical calendar. Nothing here is animated. The solar position comes from the same ephemeris astronomers use, accurate across five thousand years, and every shadow on the ground is verified against an analytic solution to within 28 centimetres. Stand at the Altar Stone on midsummer morning and watch the sunrise arrive over the Heel Stone, within a solar diameter of where the builders aligned it forty-five centuries ago.

Druidic in spirit and ceremony. Archaeological in fact.

CHAPTERS
0:00 The midsummer sunrise, on the axis
0:24 Why the sun is computed, not animated
1:14 Shadows accurate to 28 centimetres
1:57 The whole monument: sarsens, trilithons, bluestones, Aubrey holes
3:26 As it stands, and as it was
4:16 The Wheel of the Year: solstices, equinoxes and the cross-quarter festivals
5:07 The moon, eclipse seasons and the 18.6-year lunar standstill
6:28 The sky of 2800 BC, when Thuban was the pole star
7:35 Time travel from 3000 BC to AD 3000
8:20 Honest archaeology: Established, Debated, Modern tradition
9:26 Hand-written Metal 3, no game engine
10:18 Weather, torchlight and per-stone detail
11:14 Where to get it

THE FINDING THAT SURPRISED ME
Stonehenge's built axis surveys at 49.9 degrees. Computing the midsummer sunrise for 2500 BC over the real Salisbury Plain skyline gives 49.08 degrees, eight tenths of a degree off. But the midwinter sunset, the opposite direction along the same line, lands two tenths off. Midwinter fits better. That is a result out of the ephemeris, not an opinion, and the app shows you the number instead of quietly nudging the sun until the tidier answer appears.

WHAT IS IN IT
• The complete monument: 30 sarsen uprights and the lintel ring, five trilithons, bluestone circle and horseshoe, the Altar, Slaughter and Heel Stones, the Station Stone rectangle and all 56 Aubrey holes, each stone carrying its Petrie number
• Real terrain from Salisbury Plain survey data, so the ridge the solstice sun clears is the ridge that is actually there
• The Wheel of the Year solved from true solar longitude, not calendar dates: Imbolc, Beltane, Lughnasadh, Samhain, the solstices and the equinoxes
• Moon phase, distance, eclipse seasons and the 18.61-year nodal cycle, from a truncated ELP-2000 series with topocentric parallax
• The naked-eye Hipparcos sky with proper motion and precession, five planets from VSOP87D, and 29 constellation figures drawn by hand
• The Aubrey-hole eclipse predictor, badged as hypothesis and scored honestly against the real ephemeris
• Every claim tiered Established, Debated or Modern tradition, with sources one tap away

GET IT
App Store: https://apps.apple.com/app/id6798126839
More: https://www.river.io/henge/

FOR THE DEVELOPERS
Hand-written Metal 3. No SceneKit, no RealityKit, no Unity, no game engine. Physically modelled Preetham sky, Cook-Torrance PBR, three-cascade shadow maps with penumbra derived from the sun's true angular size, ACES tone mapping. Zero third-party dependencies, so a cold clone builds offline. Swift 6, iOS 17+ and macOS 14+. The astronomy module imports no graphics at all, which is what makes its correctness provable by unit test on a machine with no GPU.

No network. No account. No telemetry. Nothing collected, nothing sent. The almanac works in a field with no signal.

Free to explore in fifteen-minute sessions. One purchase unlocks the clock and the calendar permanently. No subscription.

SOURCES AND CREDITS
Solar and lunar theory after Meeus; obliquity after Laskar; star positions from the ESA Hipparcos catalogue; planetary positions from VSOP87D; lunar surface imagery from NASA's Lunar Reconnaissance Orbiter; terrain from Salisbury Plain survey data. Full attributions in the app.

Built solo by Jeff Kunzelman at river.io.

#Stonehenge #Archaeoastronomy #iOSDev
```

---

## Tags

Paste into the tags field. Front-loaded by relevance, mixing the two audiences.

```
stonehenge, stonehenge app, stonehenge 3d, stonehenge solstice, summer solstice stonehenge, winter solstice stonehenge, stonehenge alignment, stonehenge sunrise, archaeoastronomy, ancient astronomy, stonehenge explained, how stonehenge works, stonehenge calendar, aubrey holes, heel stone, salisbury plain, megalith, neolithic britain, astronomy app, ephemeris, precession, thuban pole star, lunar standstill, wheel of the year, ios app, swift, metal 3, indie app developer, 3d rendering, real time rendering
```

---

## Pinned comment

Post it yourself at publish. A pinned comment that asks a real question is the cheapest engagement signal there is, and this one has a genuine answer people will argue about.

```
The bit I keep getting asked about: the monument's built axis is 49.9°, but the computed midsummer sunrise for 2500 BC is 49.08° and the midwinter sunset lands within 0.2°. Midwinter is the tighter fit. Whether the builders aimed at the winter sunset rather than the summer sunrise is a genuinely open question, and the app tiers it as Debated rather than picking a side. What do you think it was built to catch?
```

---

## Strategy notes

**Do not expect this video to win the word "Stonehenge."** That SERP belongs to English Heritage, the BBC and full documentaries, and no 12-minute product demo displaces them. Chasing it wastes the asset.

**Two winnable clusters, and the description above targets both.**

The first is long-tail archaeoastronomy: "stonehenge alignment explained," "how accurate is stonehenge," "aubrey holes eclipse predictor," "thuban pole star." Low volume, but the intent is exactly your product and almost nobody is answering these with a real ephemeris.

The second is the developer audience: "metal 3," "no game engine," "hand-written renderer," "indie iOS." Far less contested, and it is your actual peer group. The FOR THE DEVELOPERS block exists to catch it, and it is why title option 2 is worth testing.

**Timing beats optimization here.** Solstice search demand is violently seasonal and spikes around 21 June and 21 December. The single highest-leverage thing you can do is republish or re-promote in the run-up to the winter solstice, roughly 10 to 14 December. That will move more than any wording change.

**The 12-minute cut is a destination, not a discovery vehicle.** YouTube surfaces short, high-retention video to cold audiences. The App Store preview cut and the 1:19 social cut from the VO script are your discovery assets; this one is where they land. Put the long cut on the river.io/henge page and link to it from the App Store listing, and treat YouTube search as a bonus rather than the plan.

**One honest caveat on the description.** It is close to 4,000 characters, which is well inside the 5,000 limit but long. Only the first 150 characters do search-snippet work; everything after the fold serves viewers who already clicked, plus keyword surface. That is the right trade for a technical product, but do not mistake length for ranking.
