# Gnome MouseCast

An extension for Gnome to show where your mouse is.


## Developing

Wayland sessions support running GNOME Shell in window, so an extension can be tested without disrupting the current session.

### Start a nested GNOME Shell session

```bash
dbus-run-session -- gnome-shell --nested --wayland
```

### Open a terminal inside the new session and enable the extension

```bash
gnome-extensions enable example@gjs.guide
```

### Changing window size

```bash
env MUTTER_DEBUG_DUMMY_MODE_SPECS=1024x768 \
dbus-run-session -- gnome-shell --nested --wayland
```