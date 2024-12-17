# Gnome MouseCast

An extension for Gnome to show where your mouse is.

> [!CAUTION]
> This extension is not yet ready!


## Developing

Wayland sessions support running GNOME Shell in window, so an extension can be tested without disrupting the current session.

### Start a nested GNOME Shell session

`pnpm dev` should run a command to launch the shell but in vscode it errors (still looking into why) - it is removed for now. Run the following in a external terminal instead:

```bash
env MUTTER_DEBUG_DUMMY_MODE_SPECS=1024x768 \
dbus-run-session -- gnome-shell --nested --wayland
```

### Enable Extension

Open a terminal **inside** the new session and enable the extension

```bash
gnome-extensions enable mousecast@sketchbuch.dev
```

## Info

### Accessibility

- [ATK/AT-SPI Best Practices Guide for Implementors](https://wiki.gnome.org/Accessibility/ATK/BestPractices)

### Articles/Help

- [Getting started with GNOME Shell extension development](https://blog.jamesreed.dev/gnome-shell-extension-development)
- [Imports and Modules](https://gjs.guide/extensions/overview/imports-and-modules.html)
- [Step by step tutorial to create extensions](https://wiki.gnome.org/Attic/GnomeShell/Extensions/StepByStepTutorial)
- [Where can I see a list of css supported properties?](https://discourse.gnome.org/t/where-can-i-see-a-list-of-css-supported-properties/5807)
- [Why doesn’t my gschema added to dconf after enablnig my extension](https://discourse.gnome.org/t/why-doesnt-my-gschema-added-to-dconf-after-enablnig-my-extension/16148)
- [Ripple effect in CSS (not hot corner)](https://codepen.io/chris22smith/pen/NWwzYrZ)

### GJS / Gnome Shell

- [Anatomy of an Extension](https://gjs.guide/extensions/overview/anatomy.html)
- [Developer Guides](https://gjs.guide/guides/)
- [Getting Started](https://gjs.guide/extensions/development/creating.html)
- [GJS Docs](https://gjs-docs.gnome.org/)
- [Supported CSS Properties (Gtk3.0)](https://docs.gtk.org/gtk3/css-properties.html)
- [Supported CSS Properties (Gtk4.0)](https://docs.gtk.org/gtk4/css-properties.html)


### Gnome Shell Code

- [panelMenu.js](https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panelMenu.js)
- [RadialShaderEffect - How older Shell versions had a radial effect on Overview](https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/gnome-3-36/js/ui/lightbox.js)

### Repos: Ext

- [Colour Tint](https://github.com/MattByName/color-tint)
- [Jiggle](https://github.com/jeffchannell/jiggle)
- [ScreenCoordinates](https://github.com/tobias47n9e/ScreenCoordinates)
- [Tiling Shell](https://github.com/domferr/tilingshell/blob/main/package.json)

### Repos: Other

- [MouiseShake](https://github.com/davidgodzsak/mouse-shake.js)
- [TS for GIR](https://github.com/gjsify/ts-for-gir)
- [TypeScript for GNOME Shell](https://github.com/gjsify/gnome-shell)

### Videos

- [How to Create a GNOME Extension (Part 3) - Debugging](https://www.youtube.com/watch?v=uc7bOB6ukBg)

## Glossary

**Atk** - The Accessibility toolkit

**Gdk** - The GTK toolkit

**GObject** - The base type system and object class

**Pango** - Internationalized text layout and rendering