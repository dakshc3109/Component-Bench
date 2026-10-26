<div align="center">

# Component Bench

### UI elements you can feel before you copy them.

I made Component Bench as a place to try out useful UI ideas before adding them to a project. You can play with each preview, look through the code, and copy the parts you want to use.

[Open the live site](https://dakshc3109.github.io/Component-Bench/) · [View the source](https://github.com/dakshc3109/Component-Bench)

![26 components](https://img.shields.io/badge/components-26-7c3aed?style=for-the-badge)
![6 categories](https://img.shields.io/badge/categories-6-06b6d4?style=for-the-badge)
![No dependencies](https://img.shields.io/badge/dependencies-none-22c55e?style=for-the-badge)

</div>

---

## What's inside

There are 26 components across six categories. The previews are interactive, so buttons, switches, sliders, and other controls can be tried right on the page.

You can also change the preview size, search or filter the gallery, save favorites, and switch between light and dark themes. When you find something you like, view or edit its HTML and CSS, copy the code, or download it as a standalone HTML file.

## Browse the components

| Category | Components |
| --- | --- |
| **Cards** | Glassmorphism card, pricing cards, 3D flip card, spotlight card, avatar stack, product purchase card, mini music player |
| **Buttons** | Neumorphic button, shine gradient button, orbit border button |
| **Inputs** | Toggle switch, floating label input, range slider, password field, billing switcher, task checklist |
| **Navigation** | Sliding pill navbar, mobile menu, checkout stepper |
| **Overlays** | Tooltips, modal dialog, dropdown menu, toast notification |
| **Layout** | Accordion, skeleton loading card, goal progress ring |

## How to use it

1. Pick a category or search for a component.
2. Try it out in the preview. Use the device buttons to see how it fits different screen sizes.
3. Open the code tabs to see how it is made. You can edit the HTML or CSS right there.
4. Copy the part you need, or download the whole example.
5. Save a component if you want to come back to it later.

### Keyboard shortcuts

- **⌘K** on macOS or **Ctrl+K** on Windows/Linux: focus search.
- **/**: focus search when you are not already typing in a field.
- **Escape**: clear and close search.
- **Left/Right arrow keys**: move between code tabs.

## A quick look at the code

I kept the project simple: it uses HTML, CSS, and regular JavaScript, with no packages to install or build step.

```text
index.html            Page structure
styles.css            Shared site and gallery styles
script.js             App entry point and loading screen
app/
  main.js             Loads components and starts the app
  gallery.js          Search, filters, previews, and code tools
  code.js             Code highlighting and copy support
  icons.js            Shared interface icons
  motion.js           Cursor, scrolling, and entrance motion
  theme.js            Light and dark theme
components/
  index.js            Component catalog
  glass/
    index.js          Component details, markup, and behavior
    styles.css        Styles for its preview
  ...                 One folder per component
```

Each component has its own folder with its details, markup, behavior, and CSS. The files in `app/` handle the gallery, search, code viewer, theme, and motion. This makes it easier to find the right part when I want to update something.

## A note on accessibility

You can use the keyboard to move around the page, and the animations respect your reduced-motion setting. Your theme and saved favorites stay in your browser.

---

<div align="center">

Built for trying things out and making them your own. ✨

</div>
