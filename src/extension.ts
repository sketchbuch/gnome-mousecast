import Clutter from 'gi://Clutter'
import Shell from 'gi://Shell'
import St from 'gi://St'
import { Extension, ExtensionMetadata } from 'resource:///org/gnome/shell/extensions/extension.js'
import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js'

const Desktop = Shell.Global.get()

export default class MouseCastExtension extends Extension {
  #topbarButton: null | PanelMenu.Button
  #overlay: null | St.Bin = null

  constructor(metadata: ExtensionMetadata) {
    super(metadata)
    this.#topbarButton = null
  }

  createOverlay() {
    log(`### createOverlay()`)

    const monitor = Main.layoutManager.primaryMonitor

    if (monitor) {
      log(`### monitor.width: ${monitor.width}`)
      log(`### monitor.height: ${monitor.height}`)
      log(`### monitor.height / 2: ${monitor.height / 2}`)

      this.#overlay = new St.Bin({ reactive: false })
      this.#overlay.set_size(monitor.width / 2, monitor.height / 2)
      this.#overlay.opacity = 255
      this.#overlay.set_position(300, 300)
      this.#overlay.set_z_position(700)

      var color = new Clutter.Color({
        red: 120,
        green: 120,
        blue: 20,
        alpha: 180,
      })
      this.#overlay.set_background_color(color)
    }
  }

  disable() {
    log(`### disable()`)

    this.#topbarButton?.destroy()
    this.#topbarButton = null

    if (this.#overlay) {
      log(`### disable() - remove`)

      Main.uiGroup.remove_child(this.#overlay)
      this.#overlay.destroy()
    }
  }

  enable() {
    log(`### enable()`)

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
    this.createOverlay()
    Main.uiGroup.add_child(this.#overlay)

    if (this.#overlay) {
      log(`### overlay opacity: ${this.#overlay.get_opacity()}`)
      log(`### overlay visible: ${this.#overlay.visible}`)
      log(`### overlay width: ${this.#overlay.width}`)
      log(`### overlay height: ${this.#overlay.height}`)
      log(`### overlay x: ${this.#overlay.x}`)
      log(`### overlay y: ${this.#overlay.y}`)
    }
  }
}
