# Mandya — My Vote Poster Maker

A static, browser-only Kannada election participation poster maker. Campaign credit: G. V. Nagaraju's team. The template is drawn at full resolution on canvas with a bundled Kannada font. No API keys, backend, account, analytics or photo storage required.

## Deploy on Vercel
1. Unzip this project and upload the contents to a new GitHub repository.
2. In Vercel choose **Add New → Project**, and import the repository.
3. Set Framework Preset to **Other**, leave Build Command empty, and set Output Directory to `.` (project root).
4. Deploy. The public HTTPS URL supports photo selection, PNG export and native file sharing on supported devices.

## Deploy on GitHub Pages
1. Upload the project contents to a GitHub repository, with `index.html` at the root.
2. Open **Settings → Pages → Deploy from a branch**.
3. Select `main` and `/ (root)` and save.
4. Open the Pages URL after deployment finishes. All asset paths are relative and support repository subpaths.

## Local preview
Run `python3 -m http.server 8080` in the project directory, then open http://localhost:8080. No installation or build step needed.

## Customize
Change the Kannada wording, colors and template coordinates in `app.js`. Site layout is in `index.html` and `style.css`. The template includes a photo frame, election title, “ಈ ಬಾರಿ ನಾನು ಮತದಾನ ಮಾಡುತ್ತೇನೆ”, team campaign credit and a participation slogan. The supplied four-portrait devotional banner is bundled as assets/devotional-header.png and appears at the top of both poster sizes. The visitor photo appears below it. The banner is used exactly as supplied, including its embedded labels. Exports remain disabled if this asset or the Kannada font fails to load.

## Privacy and sharing
Photos are decoded and drawn locally. The app does not transmit them. Downloads are PNG files (1080 × 1350 or 1080 × 1920). Native sharing requires HTTPS and device/browser support; otherwise Share downloads the PNG for manual posting. Nothing posts automatically to a social account.

## Release checks
- Upload JPG, PNG and WebP, adjust all crop sliders, reset and replace a photo.
- Verify portrait and story downloads in a Kannada-capable browser.
- Test native sharing on iOS Safari / Android Chrome; confirm desktop download fallback.
- Test invalid files, files over 15 MB and cancelled file selection.

Font: Noto Sans Kannada, distributed under the SIL Open Font License. See assets/OFL.txt.
