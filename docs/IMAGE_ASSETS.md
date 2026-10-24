# FIELD NOTES illustration provenance

Generated with the built-in image generation tool on 2026-10-23.
User approved the orange FIELD NOTES concept and explicitly requested replacing the brain with a non-biological object.

Production assets:

- `public/images/field-notes-hero-768.webp`
- `public/images/field-notes-hero-1536.webp`

Both are responsive encodings of the same approved illustration. Original PNG is preserved at `design/assets/field-notes-hero.png`, separately from the web delivery images. No biological brain or organs are used in the production asset.

Final image edit prompt:

> Edit this exact technical illustration. CRITICAL single requested correction: REMOVE THE ENTIRE HUMAN BRAIN at the top. Replace the brain inside the top transparent cube with a clean beautiful entirely MECHANICAL geometric microprocessor core: an elegant floating faceted translucent orange cube, concentric precise square circuit layers and a small black integrated-circuit chip, like a technical computing sculpture. Absolutely NO brain, NO biological organ, NO anatomical detail, NO flesh, NO neurons, NO organic folded surfaces ANYWHERE. Preserve all other aspects: exact black engraved ink style, orange wiring, stack of machine modules, black terminal, document nodes, shield icon, ivory paper, mountains and tiny black explorer cat with orange backpack. Do not add any text, letters, numbers or UI. Maintain same composition, dimensions, clarity and rich fine detail. Keep the replacement core compact and geometric, not grotesque.

The illustration is conceptual, not evidence of an actual architecture. Technical claims remain in the MDX text with primary sources.


## Cat identity / 2026-10-24

Built-in image generation produced three explorations. The user selected A (compass + cat) as the official identity, then requested C (backpack explorer) as an in-page companion.
Original transparent PNGs are preserved in design/assets/cat-compass-logo-source.png and explorer-cat-companion-source.png. Exploration boards are under design/assets/logo-explorations/.
public/brand/ contains only resized web encodings; no generated image is evidence of a security outcome.

- compass-cat-128.webp / 512.webp: responsive header and guide logo.
- compass-cat-32.png / 180.png: favicon / touch icon.
- explorer-cat-256.webp / 512.webp: learning entry and lesson completion companion.
- Raster alpha was checked before encoding. The images are decorative with empty alt; adjacent text conveys the role.
- Complete generation prompts are preserved in design/assets/cat-logo-prompts.json.

## Reading scenes / 2026-10-24

Two original scenes were generated with the built-in image_gen tool. User approved the API-key scene and requested more of this explorer-cat style. They are conceptual illustrations, not actual screenshots or security evidence. The formal compass logo is unchanged.

- design/assets/reading-scenes/api-key-scene.png: original API-key-setting scene.
- design/assets/reading-scenes/node-runtime-scene.png: original runtime-inspection scene, with API scene as a style/character reference.
- public/images/{api-key-scene,node-runtime-scene}-{480,960}.webp: responsive delivery copies, encoded with sharp at quality 83; 480x320 and 960x640.
- Adjacent real text/captions convey the meaning; artwork has empty alt as decorative content. width/height reserve the aspect ratio; lazy loading and responsive sizes keep the scenes from blocking initial reading.

Prompts: design/assets/reading-scenes/prompts.json. Do not treat arrows or gears in artwork as a literal architecture or completed update. Real-text diagrams carry the technical distinctions.

## Approved reusable library / 2026-10-24

[Illustration library](../design/assets/illustration-library/README.md) indexes existing canonical logo/companion/hero/scenes plus the approved pose, peeking, paw and corrected-expression boards. Original PNGs are preserved, lightweight WebP previews provided, and catalog.json records role, dimensions, alpha and SHA-256. The earlier rounded four-expression sheet is explicitly not a reuse reference. Usage and regeneration instructions: [ILLUSTRATION_GUIDE.md](./ILLUSTRATION_GUIDE.md). This addition stores assets/documentation; it does not add the sheets to the public website UI.
