# Henge — Facebook launch post

Paste-ready. Video: *I Built Stonehenge in Code, and the Shadows Are Accurate to 28 Centimetres*, 12:33.
Every figure below is verified against `SECURITY.md`, `MISSION.md` and the App Store Connect record on 7 September 2026.

---

## The post

```
Henge is live on the App Store.

It's a photoreal Stonehenge that's also a working astronomical calendar. What makes it different from every other 3D Stonehenge isn't how it looks. It's what it's built from: published survey data and measurement, all the way down. Not one artist's impression anywhere in it.

Here's what that actually means.

THE GROUND is NASA/USGS radar topography. SRTM 1-arc-second tiles N51W002 and N51W003, baked into a 768x768 heightfield at 40 metre resolution covering about 15 km in every direction. So the ridge the midsummer sun clears in the app is the ridge that is actually there on Salisbury Plain. That matters more than it sounds. A sunrise over a flat mathematical horizon sits a full degree away from a sunrise over real land, and one degree at Stonehenge is the difference between an alignment and a coincidence.

THE STONES trace to cited survey dimensions, and every one carries its Petrie number, the numbering archaeologists have used since the 1870s. I went and looked at the existing 3D Stonehenge models before building the geometry, and deliberately used none of them. They're mostly artistic reconstructions, and dropping one into a project whose first rule is "the geometry traces to survey data" would have put an unverifiable provenance right at the centre of it.

THE SUN is computed, not animated. Solar theory from Meeus, obliquity from Laskar's polynomial, which is the part that keeps 2500 BC honest. The tilt of the Earth wasn't what it is today, so the alignments genuinely move as you travel through time.

THE SKY is the Hipparcos catalogue from the European Space Agency. 8,870 stars down to magnitude 6.5, carried with their real proper motions, so wind the date back far enough and Polaris drifts off the pole and Thuban takes its place. Nobody hardcoded that; it falls out of the arithmetic. The five naked-eye planets come from VSOP87D, truncated to every term worth more than two tenths of an arcsecond across five thousand years. The Moon's face is NASA's Lunar Reconnaissance Orbiter imagery.

The only thing drawn by hand is the constellation figures. 29 of them, 188 line segments. The published stick-figure sets weren't licence-clean, so rather than fudge it or drop the feature I authored them from scratch. The membership is Ptolemy's, the positions are Hipparcos's, the drawing is mine.

And because the whole claim rests on the shadows, the shadows get tested. The geometry module solves each one on paper with no graphics involved at all. The renderer draws it. Then a test walks out along the shadow's centre line in an overhead render and measures where the drawn edge actually lands, and requires it to agree with the solved answer within 28 centimetres on the ground. That number was measured, not chosen. If a rendering change moves it, it gets re-measured and re-justified rather than relaxed.

One honest result that fell out of all this. The monument's built axis surveys at 49.9 degrees. Computing the midsummer sunrise for 2500 BC over the real skyline gives 49.08, about eight tenths of a degree off. But the midwinter sunset, the opposite direction along the very same line, lands two tenths off. Midwinter is the tighter fit. That's a real result out of the ephemeris, and the app shows you the number rather than quietly nudging the sun until the tidier answer comes out.

Free to explore. One purchase unlocks the clock and the calendar permanently. No subscription, no account, no network, nothing collected.

iPhone, iPad and Mac. Nine languages.

https://apps.apple.com/us/app/henge/id6798126839

https://www.youtube.com/watch?v=q7Fuo2rVkuE&t=15s
```

---

## Every claim, and where it comes from

| Claim in the post | Source |
|---|---|
| SRTM 1-arc-second, tiles N51W002/N51W003, 768x768 at 40 m, ±15.3 km | `SECURITY.md` terrain row; baked by `scripts/bake_terrain.py`, tile names in-tree so it is reproducible |
| Petrie numbering | `SECURITY.md`: adopted as convention, Petrie 1874–77 |
| Existing models reviewed, none incorporated | `SECURITY.md` "Reference sources consulted, and deliberately not vendored" |
| Meeus solar theory, Laskar obliquity | `SECURITY.md` rows 31–32 |
| Hipparcos, 8,870 stars, V ≤ 6.5, proper motions | `SECURITY.md` star catalogue row (ESA SP-1200 via CDS I/239) |
| VSOP87D, terms ≥ 0.2″ over ±5 millennia, 2,774 terms | `SECURITY.md` planetary theory row |
| NASA LRO moon albedo | `SECURITY.md` moon colour map row (SVS CGI Moon Kit) |
| 29 figures, 188 segments, authored in-repo | `SECURITY.md` constellation figures row |
| 0.28 m shadow agreement, measured not chosen | `MISSION.md` invariant 2 |
| 49.9° axis, 49.08° midsummer, 0.2° midwinter | `MISSION.md` / `README.md` bearing tables |
| Free with one unlock, no subscription/account/network | App Store Connect: 0.2.0 READY_FOR_SALE, IAP `io.river.henge.full` |

---

## Two things to know before posting

**Facebook throttles posts whose main payload is an off-site video link.** A YouTube URL in the body will reach noticeably fewer people than a native upload. The higher-reach version is to upload the MP4 to Facebook directly and put the YouTube link in the first comment. Same content, considerably more distribution. If the goal is YouTube watch time specifically then keep the link in the body and accept the smaller reach, but that is the trade you are making.

**Consider the first two lines carefully.** Facebook truncates at roughly 400 characters behind a "See more". Everything above that fold is doing the work. The current opening earns the click because it makes a claim ("not one artist's impression anywhere in it") rather than describing a feature.


---

## On the `&t=15s`

Keep it. I argued against it and I was wrong.

The cold open was written to reward patience: hold on black, fade up on a dark
horizon, no camera move, and let the sun break beside the Heel Stone at 0:10.
That is the right opening for someone who has chosen to watch twelve minutes.
It is the wrong opening for a Facebook feed, where the clip autoplays muted
into a scroll and fifteen seconds of near-black reads as a broken video.

Starting at 0:15 puts the light arriving in the first frame a cold viewer sees.
Same cut, different venue, correct call.

Worth noting for later: this is an argument for a separate social cut rather
than a query parameter. The 1:19 social edit in the VO script would open on the
sunrise by design and would not need the offset at all.
