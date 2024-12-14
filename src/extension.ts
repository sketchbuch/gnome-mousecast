import Gio from 'gi://Gio'
import Shell from 'gi://Shell'
import St from 'gi://St'
import { Extension, ExtensionMetadata } from 'resource:///org/gnome/shell/extensions/extension.js'
import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js'

const Desktop = Shell.Global.get()

export default class MouseCastExtension extends Extension {
  #settings: null | Gio.Settings
  #topbarButton: null | PanelMenu.Button

  constructor(metadata: ExtensionMetadata) {
    super(metadata)

    this.#settings = null
    this.#topbarButton = null
  }

  disable() {
    log(`### disable()`)

    this.#settings = null
    this.#topbarButton?.destroy()
    this.#topbarButton = null
  }

  enable() {
    log(`### enable()`)
    this.#settings = this.getSettings()
    log(`### enable() - overlay type: ${this.#settings.get_enum('overlay-type')}`)

    const [pointerX, pointerY, modifierType] = Desktop.get_pointer()
    // Create a panel button
    this.#topbarButton = new PanelMenu.Button(0.0, this.metadata.name, true)

    log(`### enable() - ${pointerX}x${pointerY} - ${modifierType.toString()}`)

    // Add an icon
    const icon = new St.Icon({
      icon_name: 'input-mouse-symbolic',
      style_class: 'system-status-icon',
    })
    this.#topbarButton.add_child(icon)

    // Add the indicator to the panel
    Main.panel.addToStatusArea(this.uuid, this.#topbarButton)

    const size = 50

    const overlay = new St.Bin({
      can_focus: false,
      height: size * 2,
      opacity: 50,
      reactive: false,
      style_class: 'sketchbuch-mousecast-overlay-aura',
      track_hover: false,
      width: size * 2,
    })

    overlay.set_position(300, 300)

    log(`### height - ${overlay.height}`)
    log(`### width - ${overlay.width}`)

    Main.layoutManager.addChrome(overlay, {
      affectsInputRegion: false,
      trackFullscreen: false,
    })
  }
}
