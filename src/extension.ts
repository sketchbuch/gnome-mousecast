import Gio from 'gi://Gio'
import Shell from 'gi://Shell'
import St from 'gi://St'
import { Extension, ExtensionMetadata } from 'resource:///org/gnome/shell/extensions/extension.js'
import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js'

const Desktop = Shell.Global.get()

export default class MouseCastExtension extends Extension {
  #overlay: null | St.Bin
  #settings: null | Gio.Settings
  #topbarButton: null | PanelMenu.Button

  constructor(metadata: ExtensionMetadata) {
    super(metadata)

    this.#overlay = null
    this.#settings = null
    this.#topbarButton = null
  }

  disable() {
    this.#overlay = null
    this.#settings = null
    this.#topbarButton?.destroy()
    this.#topbarButton = null
  }

  enable() {
    this.#settings = this.getSettings()
    log(`### enable() - overlay type: ${this.#settings.get_enum('overlay-type')}`)

    const [initialPointerX, initialPointerY] = Desktop.get_pointer()
    // Create a panel button
    this.#topbarButton = new PanelMenu.Button(0.0, this.metadata.name, true)

    // Add an icon
    const icon = new St.Icon({
      icon_name: 'input-mouse-symbolic',
      style_class: 'system-status-icon',
    })
    this.#topbarButton.add_child(icon)

    // Add the indicator to the panel
    Main.panel.addToStatusArea(this.uuid, this.#topbarButton)

    const size = 50
    const monitor = Main.layoutManager.primaryMonitor

    this.#overlay = new St.Bin({
      can_focus: false,
      height: monitor ? monitor?.height + size : 0,
      opacity: 255,
      reactive: false,
      style_class: 'sketchbuch-mousecast-overlay',
      track_hover: false,
      width: monitor ? monitor?.width + size : 0,
    })

    const widget = new St.Widget({
      can_focus: false,
      height: size,
      reactive: false,
      style_class: 'sketchbuch-mousecast-overlay__spotlight1',
      track_hover: false,
      width: size,
    })

    const widgetOffset = size / 2
    const cursorOffsetX = 3
    const cursorOffsetY = 6

    this.#overlay.set_position(0, 0)
    this.#overlay.add_child(widget)
    widget.set_position(
      initialPointerX - (widgetOffset - cursorOffsetX),
      initialPointerY - (widgetOffset - cursorOffsetY)
    )

    Main.layoutManager.addChrome(this.#overlay, {
      affectsInputRegion: false,
      trackFullscreen: false,
    })

    global.stage.connect('captured-event', () => {
      const [pointerX, pointerY] = Desktop.get_pointer()
      widget.set_position(
        pointerX - (widgetOffset - cursorOffsetX),
        pointerY - (widgetOffset - cursorOffsetY)
      )
    })
  }
}
