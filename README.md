# Gnome MouseCast

An extension for Gnome to show where your mouse is.

> [!CAUTION]
> This extension is not yet ready!


## Developing

Wayland sessions support running GNOME Shell in window, so an extension can be tested without disrupting the current session.

### Start a nested GNOME Shell session

`pnpm dev` should run `pnpm nested:shell` as the last command but it fails in vscode (still looking into why). Run the following in a external terminal instead:

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

### Articles/Help

- [Getting started with GNOME Shell extension development](https://blog.jamesreed.dev/gnome-shell-extension-development)
- [Imports and Modules](https://gjs.guide/extensions/overview/imports-and-modules.html)
- [Step by step tutorial to create extensions](https://wiki.gnome.org/Attic/GnomeShell/Extensions/StepByStepTutorial)
- [Why doesn’t my gschema added to dconf after enablnig my extension](https://discourse.gnome.org/t/why-doesnt-my-gschema-added-to-dconf-after-enablnig-my-extension/16148)

### GJS

- [Anatomy of an Extension](https://gjs.guide/extensions/overview/anatomy.html)
- [Developer Guides](https://gjs.guide/guides/)
- [Getting Started](https://gjs.guide/extensions/development/creating.html)

### Gnome Shell Code

- [panelMenu.js](https://gitlab.gnome.org/GNOME/gnome-shell/-/blob/main/js/ui/panelMenu.js)

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