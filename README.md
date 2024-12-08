# Gnome MouseCast

An extension for Gnome to show where your mouse is.


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

- https://gjs.guide/extensions/overview/imports-and-modules.html
- https://github.com/MattByName/color-tint
- https://github.com/domferr/tilingshell/blob/main/package.json
- https://github.com/gjsify/gnome-shell
- https://github.com/gjsify/ts-for-gir
- https://gjs.guide/guides/
- https://gjs.guide/extensions/development/creating.html
- https://twiddlingbits.net/gnome-shell-extension-development
- https://github.com/jeffchannell/jiggle
- https://github.com/davidgodzsak/mouse-shake.js
- https://github.com/tobias47n9e/ScreenCoordinates
- https://wiki.gnome.org/Attic/GnomeShell/Extensions/StepByStepTutorial
- https://gjs.guide/extensions/overview/anatomy.html