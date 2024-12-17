//import Gio from 'gi://Gio'
import Shell from 'gi://Shell'
import St from 'gi://St'
import { Extension, ExtensionMetadata } from 'resource:///org/gnome/shell/extensions/extension.js'
import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js'

const Desktop = Shell.Global.get()

export default class MouseCastExtension extends Extension {
  #overlay: null | St.Bin
  //#settings: null | Gio.Settings
  #size: number = 50
  #topbarButton: null | PanelMenu.Button
  #widget: null | St.Widget

  constructor(metadata: ExtensionMetadata) {
    super(metadata)

    this.#overlay = null
    //this.#settings = null
    this.#topbarButton = null
    this.#widget = null
  }

  addUi() {
    if (this.#overlay) {
      Main.layoutManager.addChrome(this.#overlay, {
        affectsInputRegion: false,
        trackFullscreen: false,
      })
    }

    if (this.#topbarButton) {
      Main.panel.addToStatusArea(this.uuid, this.#topbarButton)
    }
  }

  createOverlay() {
    const monitor = Main.layoutManager.primaryMonitor

    this.#overlay = new St.Bin({
      can_focus: false,
      height: monitor ? monitor?.height + this.#size : 0,
      opacity: 255,
      reactive: false,
      style_class: 'sketchbuch-mousecast-overlay',
      track_hover: false,
      width: monitor ? monitor?.width + this.#size : 0,
    })

    this.#overlay.set_position(0, 0)
  }

  createTopBar() {
    this.#topbarButton = new PanelMenu.Button(0.0, this.metadata.name, true)

    const icon = new St.Icon({
      icon_name: 'input-mouse-symbolic',
      style_class: 'system-status-icon',
    })

    this.#topbarButton.add_child(icon)
  }

  createWidget() {
    this.#widget = new St.Widget({
      can_focus: false,
      height: this.#size,
      reactive: false,
      style_class: 'sketchbuch-mousecast-overlay__spotlight1',
      track_hover: false,
      width: this.#size,
    })

    if (this.#overlay) {
      this.#overlay.add_child(this.#widget)
    }
  }

  setWidgetPosition() {
    if (this.#widget) {
      const [pointerX, pointerY] = Desktop.get_pointer()

      const widgetOffset = this.#size / 2
      const cursorOffsetX = 3
      const cursorOffsetY = 6

      this.#widget.set_position(
        pointerX - (widgetOffset - cursorOffsetX),
        pointerY - (widgetOffset - cursorOffsetY)
      )
    }
  }

  trackMouse() {
    global.stage.connect('captured-event', () => {
      this.setWidgetPosition()
    })
  }

  disable() {
    this.#overlay = null
    //this.#settings = null
    this.#topbarButton?.destroy()
    this.#topbarButton = null
    this.#widget = null
  }

  enable() {
    //this.#settings = this.getSettings()

    this.createOverlay()
    this.createWidget()
    this.createTopBar()
    this.setWidgetPosition()
    this.trackMouse()
    this.addUi()
  }
}
