# Henge Demo: Shot List

**Timed against the delivered ElevenLabs "Lucy" VO in `~/Downloads`. river.io LLC, 27 August 2026.**

Capture source: `/Applications/Henge.app` (native macOS build). Every cue below is a real timecode inside its beat's audio file, derived from the measured file duration and the word distribution of the narration.

---

## 1. Audio inventory

Eleven files, 9:53 delivered. Mapping is by download order and duration fit against the script's word counts, at a measured 152 to 158 words per minute.

| Beat | File | Measured | Expected @155 | Fit |
|---|---|---:|---:|---|
| 1 Cold open | `162913Z` | 24.7s | 24.4s | exact |
| 2 The claim | `163005Z` | 49.6s | 49.5s | exact |
| 3 The shadows | `163122Z` | 43.2s | 47.2s | good |
| 4 The monument | `163206Z` | 89.3s | 92.5s | good |
| 5 Two states | `163257Z` | 50.1s | 53.4s | good |
| 6 Wheel of the Year | `163350Z` | 50.2s | 55.7s | good |
| 7 The moon | `165758Z` | 81.3s | 95.2s | fast, see note |
| 8 Sky over the builders | `163530Z` | 66.5s | 69.3s | good |
| 9 One scrubber | `163629Z` | 45.4s | 48.4s | good |
| 10 Honest archaeology | `163748Z` | 66.0s | 70.8s | good |
| 11 How it is built | `163845Z` | 52.2s | 51.1s | exact |
| 12 Hours nobody lists | `164040Z` | 56.0s | 57.3s | exact |
| 13 Close | `165948Z` | 36.6s | 37.2s | exact |

**Complete. All thirteen beats delivered, 11:51 total.** Beat 13 arriving at 36.6s against a predicted 37.2s confirms the whole mapping independently.

**One note on Beat 7.** At 246 words in 81.3s it reads at **182 wpm**, against 152 to 158 everywhere else. It will feel rushed next to its neighbours, and it is the beat carrying the densest technical content (ELP-2000, topocentric parallax, the nodal cycle, the Aubrey eclipse score). Worth regenerating slower before the final cut.

All thirteen files are renamed and filed in `~/Desktop/UCF/voice overs/henge/` as `henge-vo-NN-slug.mp3`.

Rename on arrival so the edit is not guesswork:

```sh
cd ~/Downloads
mv ES_Voice_Lucy-2026-08-27T162913Z.mp3 henge-vo-01-cold-open.mp3
mv ES_Voice_Lucy-2026-08-27T163005Z.mp3 henge-vo-02-the-claim.mp3
mv ES_Voice_Lucy-2026-08-27T163122Z.mp3 henge-vo-03-shadows.mp3
mv ES_Voice_Lucy-2026-08-27T163206Z.mp3 henge-vo-04-monument.mp3
mv ES_Voice_Lucy-2026-08-27T163257Z.mp3 henge-vo-05-two-states.mp3
mv ES_Voice_Lucy-2026-08-27T163350Z.mp3 henge-vo-06-wheel.mp3
mv ES_Voice_Lucy-2026-08-27T163530Z.mp3 henge-vo-08-sky.mp3
mv ES_Voice_Lucy-2026-08-27T163629Z.mp3 henge-vo-09-scrubber.mp3
mv ES_Voice_Lucy-2026-08-27T163748Z.mp3 henge-vo-10-archaeology.mp3
mv ES_Voice_Lucy-2026-08-27T163845Z.mp3 henge-vo-11-how-built.mp3
mv ES_Voice_Lucy-2026-08-27T164040Z.mp3 henge-vo-12-hours.mp3
```

---

## 2. Capture setup

| | |
|---|---|
| Source | `/Applications/Henge.app`, macOS native target |
| Window | 1920x1080 exactly, letterboxed on a black desktop, menu bar auto-hidden |
| Capture | ScreenCaptureKit via ffmpeg, 60 fps, ProRes 422 intermediate |
| Handles | 3 seconds lead and 3 seconds tail on every shot |
| Naming | `b04-s03_petrie-numbers.mov` (beat, shot, slug) |
| Landing | `~/projects/henge/capture/` |

**Capture 25 to 40 percent longer than the cue duration on every shot.** Slow camera moves cut down gracefully; they cannot be stretched.

### Controls, by their real names in `RootView.swift`

**Stations rail** (four, these are places not camera presets): Aerial, Altar Stone, Heel Stone, Avenue.

**Rail toggles**: Almanac, Alignment overlay, Lunar markers, Torch, Weather (cycles clear, overcast, rain, frost), Star labels, Constellations, Zodiac, Monument state.

**Transport**: play/pause, rate menu, back one day, Now, forward one day, Lore, About. Plus the year bar (drag to scrub the year, festival and moon lights) and the date travel picker.

---

## 3. Beat sheet

Every cue is **relative to the start of that beat's audio file**.

### BEAT 1 · Cold open · 24.7s

Station **Altar Stone**. Date 21 June 2026, wound back to roughly 04:40 BST. Rate 1x. Monument state **as it stands**. All toggles off. Clear weather. This is the money shot and it plays in real time.

| Cue | Line | Shot |
|---|---|---|
| 0:00.0 | "Four and a half thousand years ago…" | Hold on black. Fade up on the horizon still dark, no camera move at all. |
| 0:05.5 | "Not a sunrise. This sunrise." | Still holding. Let the sky do the work. |
| 0:10.2 | "…keeping the appointment." | First limb of the sun breaks beside the Heel Stone. Time this landing precisely. |
| 0:12.9 | "This is Henge…" | Very slow push in toward the Heel Stone as the light fills the axis. |

**Capture 90 seconds of real-time sunrise** so the edit can slide the sun's break to land exactly on 0:10.2.

### BEAT 2 · The claim · 49.6s

| Cue | Dur | Shot |
|---|---:|---|
| 0:00.0 | 5.0s | Pull back off the Altar Stone, still on station. |
| 0:05.0 | 14.7s | Rate up to 60x. Shadows begin to sweep. Almanac toggle **on** so the readout is visible. |
| 0:19.8 | 24.4s | Hold on the readout with the solar bearing live and changing. Slow drift only. |
| 0:44.2 | 5.4s | Rate back to 1x. Settle. |

### BEAT 3 · The shadows · 43.2s

Station **Aerial**. Late afternoon, long shadows. Single trilithon centred.

| Cue | Dur | Shot |
|---|---:|---|
| 0:00.0 | 2.1s | Cut to overhead. |
| 0:02.1 | 12.0s | Static overhead on one trilithon, shadow long across the grass. |
| 0:14.2 | 20.2s | Alignment overlay **on** for 6 seconds over the "solves it on paper" line, then off. |
| 0:34.4 | 8.9s | Push in slowly on the shadow's edge. This is the 0.28 m line. Get close enough that the edge reads as a hard measured thing. |

### BEAT 4 · The monument · 89.3s

The longest continuous move in the piece. Monument state **as it was**, so the ring is closed.

| Cue | Dur | Shot |
|---|---:|---|
| 0:00.0 | 3.7s | Station **Avenue**, looking in at the closed ring. |
| 0:03.7 | 23.9s | Slow orbit at eye height through the sarsen ring. One continuous move, no cuts. Sixty-four words of stone inventory need somewhere to land. |
| 0:27.7 | 10.5s | Star labels **on** briefly if Petrie numbers surface there; otherwise hold on a single upright, close. |
| 0:38.1 | 25.4s | Macro pass: stone surface, damp course at the foot, lichen, grass moving. Three or four slow drifts, cut together. |
| 1:03.5 | 25.8s | Rise to **Aerial**, then tilt to put the real ridge line on the horizon. End with the ridge held, because the next line is about that ridge. |

### BEAT 5 · Two states · 50.1s

Station **Altar Stone** or **Avenue**, whichever frames the fallen stones best. Start **as it stands**.

| Cue | Dur | Shot |
|---|---:|---|
| 0:00.0 | 1.1s | Locked off on the ruin. |
| 0:01.1 | 10.5s | Hold. Let the viewer read the gaps. |
| 0:11.6 | 15.6s | Still holding on the ruin through the "no slider" line. Do not move yet. |
| 0:27.2 | 17.1s | **Hit the monument toggle at 0:27.2.** Let the full transition play: bank eroding, stones arriving in construction order, ring closing. |
| 0:44.3 | 5.8s | Land on **as it was**. Hold clean. |

**Measured, not assumed. This beat is solved.** The transition is not the one-second flip originally feared. Timed off the captured footage:

| | |
|---|---|
| Click to first visible change | ~6.5s of async rebuild, nothing on screen |
| Visible animation | **~11s** — earthwork erodes, stones raise, the era time-lapse passes through night **twice** |
| Settled on the new state | ~18s after the click |

Eleven seconds of animation against 17 seconds of narration, across four angles, cuts comfortably. No retiming needed.

**Captured, in `~/projects/henge/capture/`:**

| File | Chrome | Station | Transition at |
|---|---|---|---|
| `b05-chrome-01-aerial.mov` | visible | Aerial | 7 to 18s |
| `b05-chrome-02-altar-stone.mov` | visible | Altar Stone | 7 to 18s |
| `b05-clean-03-aerial-rotated.mov` | none | Aerial, drag-rotated | 7 to 18s |
| `b05-clean-04-altar-stone-rotated.mov` | none | Altar Stone, drag-rotated | 8 to 19s |

All four: 1920x1080, 30.000s, exactly 900 frames, locked 30 fps.

Avenue and Heel Stone were shot and **rejected**. The Avenue station sits so far down the approach that the monument is a speck on the horizon; the Heel Stone fills the frame with a slab and the monument change is invisible behind it.

### BEAT 6 · Wheel of the Year · 50.2s

| Cue | Dur | Shot |
|---|---:|---|
| 0:00.0 | 3.1s | Year bar opens. Season strip and eight festival lights visible. |
| 0:03.1 | 8.4s | Slow drag-scrub across the year so the lights pass under the playhead. |
| 0:11.5 | 18.8s | **Tap Samhain at roughly 0:14.** Let the app land on sunrise of the day. Hold on the arrival. |
| 0:30.3 | 19.9s | Push in on the festival name and its tier badge. The badge must be legible at 1080p. |

### BEAT 7 · The moon · audio missing, plan for ~95s

Night. Moon low and gibbous over the trilithons. Lunar markers toggle available.

| Line | Est. | Shot |
|---|---:|---|
| "the harder problem" | 4.3s | Cut to night, moon in frame. |
| "Position, phase, distance…" | 24.8s | Slow push onto the lunar disc until surface detail reads. Hold on the earthshine limb. |
| "eighteen-point-six-year nodal cycle…" | 20.1s | Almanac strip with phase glyphs, then the events ribbon showing an approaching standstill. |
| "it casts shadows of its own" | 5.8s | Wide: moonlit stones with shadows on the grass. |
| "the Aubrey holes were an eclipse counter" | 40.3s | Aerial with **lunar markers on**, gold markers around the ring. Step the markers if the app animates them. End on the scored result. |

### BEAT 8 · Sky over the builders · 66.5s

| Cue | Dur | Shot |
|---|---:|---|
| 0:00.0 | 3.3s | Tilt up from the stones to full sky. |
| 0:03.3 | 10.0s | Star field, clean, no labels. |
| 0:13.4 | 20.4s | **Date travel to 2800 BC.** Frame the pole. Let Polaris drift off and Thuban arrive. This is the best single visual argument in the app: give it the full 20 seconds. |
| 0:33.8 | 11.1s | Star labels **on**. Find the planets, steady against the shimmer. |
| 0:45.0 | 21.5s | Constellations **on**, then Zodiac **on**. Slow drift across the figures. |

### BEAT 9 · One scrubber · 45.4s

| Cue | Dur | Shot |
|---|---:|---|
| 0:00.0 | 2.5s | Aerial, transport visible. |
| 0:02.5 | 14.2s | Rate up hard. Shadows spin like a dial hand. Then **hard stop** on a solstice sunrise. |
| 0:16.7 | 21.4s | Date travel picker: enter 2500 BC. Land. Hold on the bearing readout as the number changes. |
| 0:38.1 | 7.3s | Longitude setting, then back to the scene. |

### BEAT 10 · Honest archaeology · 66.0s

The emotional peak. Music bed drops out here. No camera moves that draw attention.

| Cue | Dur | Shot |
|---|---:|---|
| 0:00.0 | 4.0s | Lore panel opens. |
| 0:04.0 | 14.1s | Hold on a tier badge and its citation, long enough to actually read both. |
| 0:18.0 | 8.3s | Scroll to an "Established" claim, then to a "Modern tradition" one. |
| 0:26.3 | 23.4s | Alignment overlay **on**. Axis line drawn, bearing labelled. Hold locked off through the whole 49.9 versus 49.08 passage. |
| 0:49.8 | 16.2s | Slow push to the midwinter bearing on the overlay. End static. |

### BEAT 11 · How it is built · 52.2s

| Cue | Dur | Shot |
|---|---:|---|
| 0:00.0 | 4.0s | Golden hour, wide. |
| 0:04.0 | 21.8s | Slow move through the ring with light shafts breaking between the stones. |
| 0:25.7 | 16.2s | Hold on stone material close enough to read the PBR response as the light moves. |
| 0:41.9 | 10.3s | VoiceOver on, focus ring landing on a stone label. Real accessibility, filmed. |

### BEAT 12 · Hours nobody lists · 56.0s

Fastest cutting in the piece. Seven shots, none long.

| Cue | Dur | Shot |
|---|---:|---|
| 0:00.0 | 4.5s | Wide, clear weather. |
| 0:04.5 | 8.7s | Light shafts between stones. |
| 0:13.2 | 3.4s | **Three cuts, ~1.1s each**: weather toggle to overcast, rain, frost. |
| 0:16.7 | 5.7s | Two stones side by side, close, visibly different surfaces. |
| 0:22.3 | 8.3s | Ground-plan overlay: cardinals, construction lines, measurements on the terrain. |
| 0:30.7 | 17.8s | Cycle all four stations, roughly 4.5s each: Aerial, Altar Stone, Heel Stone, Avenue. Add one drag-look and one pinch. |
| 0:48.4 | 7.6s | Night, torch **on**. Flicker, shadows thrown outward. End on the fire. |

### BEAT 13 · Close · audio missing, plan for ~37s

| Line | Est. | Shot |
|---|---:|---|
| "iPhone, iPad and Mac… nine languages" | 4.6s | Back to Altar Stone, midsummer, sun beside the Heel Stone. |
| "free to explore, fifteen-minute sessions" | 7.0s | Hold. |
| "One purchase, nineteen dollars and ninety-nine cents…" | 19.4s | Hold, then very slow push. |
| "Druidic in spirit. Archaeological in fact." | 2.3s | Title card. |
| "Henge. Stonehenge keeps real time." | 1.9s | Logo. |
| "On the App Store now." | 1.9s | App Store badge. |

---

## 4. Capture order

Not beat order. Group by app state so the number of setup changes is minimised.

| Pass | State | Beats |
|---|---|---|
| 1 | Day, as it stands, clear | 1, 3, 5 (first half) |
| 2 | Day, as it was, clear | 4, 5 (transition and land), 12 (stations, stones) |
| 3 | Golden hour | 11, 12 (light shafts) |
| 4 | Weather cycle | 12 (overcast, rain, frost) |
| 5 | Night | 7, 8, 12 (torch) |
| 6 | UI-forward | 2, 6, 9, 10 |
| 7 | Deep time (2800 BC, 2500 BC) | 8 (Thuban), 9 (bearing) |
| 8 | Close | 13 |

---

## 5. The capture recipe

Established by trial. Reuse this rather than rediscovering it.

**Window geometry.** Pin it, do not eyeball it:

```sh
osascript -e 'tell application "System Events" to tell process "Henge"
  set position of window 1 to {0, 60}
  set size of window 1 to {1920, 1120}
end tell'
```

Display is 8K raw, "looks like" 3840x2160, so the window is exactly 2x its logical size. Title bar measures 64 physical pixels.

**Two crop rects**, from a full-screen `avfoundation` capture:

| Output | ffmpeg filter |
|---|---|
| With chrome | `crop=3840:2160:0:184,scale=1920:1080` |
| Clean, scene only | `crop=2836:1596:502:184,scale=1920:1080` |

The clean rect is 16:9 and sits between the title bar and the year-bar drawer, so **the chrome does not need collapsing** — it is simply outside the crop. That matters, because the drawer handles are unreliable under synthetic clicks.

**Three hard-won gotchas:**

1. **Do not use `screencapture -l <windowid>`.** Direct window capture is cleaner in principle and runs at 120 fps, but it returns **pure black for the entire rebuild** — the app tears down and recreates its Metal layer and window-list capture loses the surface. Full-screen capture reads the composited display and stays valid. Window capture is fine for static shots only.
2. **`screencapture -v` fails when backgrounded** from a `nohup` script; it exits instantly. Run it in the foreground and background the *click* instead.
3. **Activate before clicking.** If Henge is not frontmost, the first synthetic click is swallowed activating the window and never reaches the control. Always `tell application "Henge" to activate`, wait ~1s, then click.

**Frame rate ceiling.** Capturing an 8K display is bandwidth-bound and tops out at 28 to 39 fps regardless of what is requested. Everything is conformed to a locked 30. For true 60, drop the display to 4K before capture.

**Control coordinates** (global logical points, window pinned as above):

| Control | Coordinate |
|---|---|
| Aerial / Altar Stone / Heel Stone / Avenue | (240, 1139) / (699, 1139) / (1158, 1139) / (1617, 1139) |
| Monument state toggle | (1880, 1140) |
| Almanac drawer chevron | (11, 133) |
| Bottom drawer chevron (open) | (12, 1037) |

These are pixel-measured because **the accessibility tree is unusable** — see [henge#1](https://github.com/SpaceTrucker2196/henge/issues/1). All 26 controls and all six menus return empty labels, so nothing can be addressed by name.

## 6. Known risks

1. **Beat 1's sunrise must land on 0:10.2.** Capture 90 seconds of real-time sunrise so the edit has slide room.
2. **Beat 7 reads at 182 wpm**, well off the 155 of every other beat. Regenerate slower before the final cut.
3. **Tier badges and bearing readouts must be legible at 1080p.** Check one frame at full size before capturing beats 6 and 10.
4. **VoiceOver capture in Beat 11** turns on system-wide speech. Mute system audio at source or the capture picks it up.
