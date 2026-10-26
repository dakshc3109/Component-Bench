<div align="center">

# Component Bench

### UI elements you can feel before you copy them.

Explore a hands-on library of interactive UI components. Preview each one, tweak its code, and copy the HTML, CSS, and JavaScript when it feels right.

<br>

![Components](https://img.shields.io/badge/components-26-7c3aed?style=for-the-badge)
![Categories](https://img.shields.io/badge/categories-6-06b6d4?style=for-the-badge)
![Dependencies](https://img.shields.io/badge/dependencies-none-22c55e?style=for-the-badge)

<br>

[Explore the repository](https://github.com/dakshc3109/Component-Bench)

</div>

---

## The fun part

- **Try before you copy** — interact with live component previews.
- **Pick your viewport** — switch between desktop, tablet, and mobile preview sizes.
- **Take the code with you** — view, edit, copy, or download a standalone HTML example.
- **Find your next favorite** — search by name, filter by category, and save components.
- **Make it yours** — switch between dark and light themes.
- **Feel the details** — enjoy playful motion, a glowing cursor, and a dotted background.

## The component lineup

| Cards | Buttons | Inputs |
| --- | --- | --- |
| Glassmorphism card | Neumorphic button | Toggle switch |
| Pricing cards | Shine gradient button | Floating label input |
| 3D flip card | Orbit border button | Range slider |
| Spotlight card |  | Password field |
| Avatar stack |  | Billing switcher |
| Product purchase card |  | Task checklist |
| Mini music player |  |  |

| Navigation | Overlays | Layout |
| --- | --- | --- |
| Sliding pill navbar | Tooltips | Accordion |
| Mobile menu | Modal dialog | Skeleton loading card |
| Checkout stepper | Dropdown menu | Goal progress ring |
|  | Toast notification |  |

## Get it running

No package install or build step needed. Serve the project over HTTP so the page can load its component styles:

```bash
git clone https://github.com/dakshc3109/Component-Bench.git
cd Component-Bench
python3 -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser. You can also use the Live Server extension in VS Code.

> Tip: open the site through a local server rather than opening `index.html` directly. Component previews load their CSS from `styles.css`.

## Make the most of the bench

1. Search for a component or pick a category.
2. Play with its live preview and try the viewport buttons.
3. Use the code tabs to inspect HTML, CSS, or JavaScript. Select **Edit** to experiment.
4. Copy a single snippet, copy all three, or download the standalone HTML.
5. Save components you want to come back to.

Press **⌘K** on macOS or **Ctrl+K** on Windows and Linux to jump to search. Press **/** to focus search, and **Escape** to clear it.

## Under the hood

Component Bench is a small, dependency-free web project built with:

- **HTML** for the page and component markup
- **CSS** for the site, animations, themes, and component previews
- **Vanilla JavaScript** for rendering, filtering, interactions, and copy tools

The component catalog and its interactions live in `script.js`. Component styles live in marked blocks in `styles.css`; the app loads those styles into each preview and exposes them in the code viewer.

## A little comfort, too

The interface supports keyboard navigation, includes accessible labels for interactive controls, and respects the operating system's reduced-motion preference. Theme and saved-component preferences are kept in your browser.

---

<div align="center">

Made to explore, remix, and ship. ✨

</div>
