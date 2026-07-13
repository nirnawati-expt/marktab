# MarkTab

An ultra-lightweight, 100% client-side Markdown editor and viewer. Built with plain HTML, vanilla CSS, and pure JavaScript. No bundlers, frameworks, or npm. It's designed to be free, privacy-focused, and easy on low-spec laptops.

## Why This Exists

Most Markdown editors mean installing a heavy desktop app, fiddling with IDE extensions, or paying for a subscription. For people who live in the browser anyway, launching another resource hog just to take notes is wasteful, it clutters the desktop, drains battery, and adds friction.

**MarkTab** cuts through that. Keep it open in a browser tab instead. A new tab uses far fewer resources than an Electron app or IDE, and your workspace stays clean.

## Who It's For

- **Minimalists** who don't want a pile of apps on their desktop
- **Anyone on older hardware** who needs something light, not another memory hog
- **Browser-first workers** (students, remote staff) who want to stay in-browser and avoid context-switching
- **Privacy-conscious people** who can't afford cloud sync or tracking

## Stack

- **HTML5 & CSS**: Layout with zero jank
- **Pure JavaScript**: Native DOM, no runtime bloat
- **Marked.js**: Lightweight client-side parser

## What It Does

- **Zero lag**, even on older machines
- **Pure vanilla code**, no heavyweight dependencies
- **Scroll sync** between editor and preview, in real-time
- **Focus mode**, hide either panel to go fullscreen
- **Dark and light themes**
- **One-click export** as Markdown or clean HTML
- **Works offline**, save as `.html` and run anywhere
- **100% private**, everything stays on your machine. No servers, no tracking

## Getting Started

### Run Locally (Offline)

1. Clone or download the repo
2. Double-click `index.html`

### Host Free on GitHub Pages

1. Push to a public GitHub repo (name the entry file `index.html`)
2. Go to repo **Settings** > **Pages**
3. Set the build source to `main` (or `master`) and save

## License

MIT. Free and open source.