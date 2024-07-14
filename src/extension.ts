import St from 'gi://St'

import Shell from 'gi://Shell'
import { Extension, ExtensionMetadata } from 'resource:///org/gnome/shell/extensions/extension.js'
import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js'

const Desktop = Shell.Global.get()

export default class MouseCastExtension extends Extension {
  #indicator: null | PanelMenu.Button

  constructor(metadata: ExtensionMetadata) {
    super(metadata)
    this.#indicator = null
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
  }

  disable() {
    this.#indicator?.destroy()
    this.#indicator = null
  }
}
