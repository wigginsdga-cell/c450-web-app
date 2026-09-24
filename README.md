# CyberGuide

A small INFO-C450 course app for finding plain-language cybersecurity guidance. Browse five topics, search or filter them, read immediate actions and prevention tips, and pin useful guides in the same browser.

## Open the app

Open the published app: **[CyberGuide](https://wigginsdga-cell.github.io/c450-web-app/)**.

To work locally, use the VS Code Live Server extension from the course workflow, or run this command in the project folder:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Use a web server because the app loads its topic CSV; opening `index.html` directly as a file is not the supported path. Internet access is needed for the existing library CDNs and linked sources.

## Project files

- `items-template.csv`: topic content and source links.
- `app.js`: routes, data loading, and shared pinned IDs.
- `components/`: Home, navigation, topic collection, detail, and About.
- `style.css`: the shared design rules.
- [Design system](docs/design/design-system.md)
- [Specification](docs/design/specification.md)
- [Plan](docs/design/plan.md)
- [Task list](docs/design/tasks.md)
- [Build notes](docs/design/build-log.md)
- [Test results and owner review](docs/design/test-results.md)
- [Browser check fixtures](docs/design/browser-checks.html)

The app keeps the starter's Vue, Vue Router, Bootstrap, and Papa Parse setup. It has no build step, account system, or backend. Pinning stores only topic IDs under `cyberguidePinnedIds` in localStorage. If storage is blocked, pins remain available while the page stays open.

## Build status

The Week 5 front end and design system were prepared with Codex and published to GitHub Pages on September 24, 2026. All 27 implementation tasks are checked off. Local DOM checks covered the core interactions, data failures, and storage behavior. The published app also passed browser checks for keyboard controls, continuous search editing, pin persistence, source links, recovery, and desktop and 375px layouts. See the test results for methods and limits.

Before submitting, the owner should use the app, confirm it matches the original intention, and add their own observations to the review notes. Canvas submission has not been completed by Codex.
