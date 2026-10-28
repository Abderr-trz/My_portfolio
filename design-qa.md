# Visual and interaction QA

- Source: `C:\Abderrahim Portfolio\frame5.jpg`, extracted from the supplied video, plus the user's sequence screenshots.
- Implementation: `reference-desktop.png`, `reference-ribbon.png`, `reference-grid.png`, `reference-orbit.png`, `reference-mobile.png`, and `reference-reduced.png` in this directory (generated locally, excluded from Git).
- Comparison: `C:\Abderrahim Portfolio\reference-comparison-final.jpg` places a 380×197 crop of the source alongside the 1440×900 implementation, each normalized to 720×405. The source is a low-resolution recording of a monitor, so precise typeface and pixel-level matching cannot be verified.
- State and viewport: desktop 1440×900 at 1×, mobile 390×844, and desktop with reduced motion. The ribbon comparison is an approximate matching moment of the scroll sequence.

## Findings and iteration

- The first render overlapped the main cards substantially more than the reference and omitted the smaller returning strip. Card widths, spacing and rotations were adjusted, and a decorative strip of the real project screenshots was added. The final ribbon capture shows five distinct primary cards with a returning strip.
- The first WebGL orbit showed some project screenshots reversed. Rendering only front-facing planes removed the mirrored text; `reference-orbit.png` shows the corrected scene.
- The source depicts more projects than the five provided for this portfolio. The grid intentionally contains the five real projects, rather than invented work. The typography and original motion are approximations based on a low-resolution video; the personal copy and project imagery are intentionally different.

## Fidelity surfaces

- Typography: large centered sans/serif combination on the light opening and large light text on the dark scene; original font cannot be identified from the recording.
- Spacing and layout: full-screen opening, curved ribbon, centered compact grid and dark section follow the visual sequence; the five-card grid is intentionally less dense than the reference.
- Color: light neutral canvas, dark text, small orange navigation accent and near-black final scene.
- Images: actual screenshots of the user's projects replace the reference's unrelated assets; no fabricated client work is presented.
- Content: text describes the user's creative development and AI background rather than copying the reference's business claims.
- Focused review: the ribbon and dark scene were separately captured and inspected for clipping, card faces and text legibility.

## Checks

- Production build: passed; Next.js reports image optimization warnings.
- Chrome: five project routes returned 200, no page errors, no horizontal overflow at the tested desktop and mobile sizes, and the project link received keyboard focus.
- Reduced motion: static five-project layout rendered without page errors or horizontal overflow.
- WebGL: the orbit canvas rendered in Chrome without page errors. Its context-loss fallback is implemented, but the new orbit's context loss has not been simulated.

## Follow-up polish

- Fine-tune the ribbon's bending and timing against a higher-resolution reference if available. Test on physical mobile and low-power devices and run a full accessibility and Lighthouse audit before public launch.

final result: passed
