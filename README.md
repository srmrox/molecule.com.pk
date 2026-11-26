# molecule.com.pk

Static replica of the Molecule one-page website (https://molecule.com.pk).
The live site runs on WordPress + Elementor. This repo rebuilds it as plain
HTML, CSS and a small JavaScript file, with no build step and no dependencies.

## Structure

```
index.html            the page (hero, service providers, gallery, contact)
assets/css/style.css  all styles, desktop + tablet (<=1024px) + mobile (<=767px)
assets/js/main.js     mobile menu, active nav link, contact form, cookie notice
assets/img/           logos and photos copied from the live site
assets/fonts/         Poppins (self-hosted, SIL Open Font License)
```

## Run locally

```
python -m http.server 8080
```

Then open http://localhost:8080.

## Differences from the live site

- Contact form: the live form posts to WordPress. A static host has no backend,
  so the form opens WhatsApp (+92 301 8510470) with the message filled in.
  To send email instead, point the form at a form service (for example
  Formspree or Netlify Forms) in `assets/js/main.js`.
- No WordPress analytics (Jetpack stats) and no jQuery or Elementor scripts.
- The cookie notice is a small local copy; it remembers "Ok" in localStorage.

## Edit content

- Service provider cards are `<article class="sp-card">` blocks in `index.html`.
  Each card sets its colours with CSS variables in the `style` attribute:
  `--bg`, `--bg-hover`, `--ink` (RGB triplet), `--ink-a` (text alpha),
  `--sub-size` (subtitle font size) and `--logo-h` (logo height).
- Add the provider to the contact form `<select>` too.
