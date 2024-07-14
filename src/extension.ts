import St from 'gi://St'

import { Extension, ExtensionMetadata } from 'resource:///org/gnome/shell/extensions/extension.js'
import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js'

export default class MouseCastExtension extends Extension {
  #indicator: null | PanelMenu.Button

  constructor(metadata: ExtensionMetadata) {
    super(metadata)
    this.#indicator = null
  }

  enable() {
    // Create a panel button
    this.#indicator = new PanelMenu.Button(0.0, 'MouseCast', false)

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
