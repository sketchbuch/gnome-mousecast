import Clutter from 'gi://Clutter'
import Shell from 'gi://Shell'
import St from 'gi://St'
import { Extension, ExtensionMetadata } from 'resource:///org/gnome/shell/extensions/extension.js'
import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js'

const Desktop = Shell.Global.get()
let overlay: null | St.Bin = null

export default class MouseCastExtension extends Extension {
  #indicator: null | PanelMenu.Button

  constructor(metadata: ExtensionMetadata) {
    super(metadata)
    this.#indicator = null
  }

  createOverlay() {
    const monitor = Main.layoutManager.primaryMonitor

    if (monitor) {
      overlay = new St.Bin({ reactive: false })
      overlay.set_size(monitor.width / 2, monitor.height / 2)
      overlay.opacity = 255
      overlay.set_position(0, 0)
      overlay.set_z_position(700)

      var color = new Clutter.Color({
        red: 200,
        green: 20,
        blue: 20,
        alpha: 80,
      })
      overlay.set_background_color(color)
    }
  }

  disable() {
    this.#indicator?.destroy()
    this.#indicator = null

    if (overlay) {
      Main.uiGroup.remove_child(overlay)
      overlay.destroy()
    }
  }

  enable() {
    const [pointerX, pointerY, modifierType] = Desktop.get_pointer()
    // Create a panel button
    this.#indicator = new PanelMenu.Button(0.0, 'MouseCast', false)

    console.log(`### ${pointerX}x${pointerY} - ${modifierType.toString()}`)

    // Add an icon
    const icon = new St.Icon({
      icon_name: 'face-laugh-symbolic',
      style_class: 'system-status-icon',
    })
    this.#indicator.add_child(icon)

    // Add the indicator to the panel
    Main.panel.addToStatusArea(this.uuid, this.#indicator)
    this.createOverlay()
    Main.uiGroup.add_child(overlay)
  }
}
