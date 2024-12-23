import Clutter from 'gi://Clutter'
import Shell from 'gi://Shell'
import St from 'gi://St'
import { Extension, ExtensionMetadata } from 'resource:///org/gnome/shell/extensions/extension.js'
import * as Main from 'resource:///org/gnome/shell/ui/main.js'
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js'
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js'

type TopBarMenu = PopupMenu.PopupMenu<PopupMenu.PopupMenu.SignalMap>

const Desktop = Shell.Global.get()

export default class MouseCastExtension extends Extension {
  //#settings: null | Gio.Settings
  #mouseTrackerId = -1
  #overlay: null | St.Bin
  #size = 50
  #topbarButton: null | PanelMenu.Button
  #topbarMenu: null | TopBarMenu
  #useModifier = true
  #widget: null | St.Widget

  constructor(metadata: ExtensionMetadata) {
    super(metadata)

    //this.#settings = null
    this.#overlay = null
    this.#topbarButton = null
    this.#topbarMenu = null
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

  createTopBarButton() {
    this.#topbarButton = new PanelMenu.Button(0.5, this.metadata.name, false)

    const icon = new St.Icon({
      icon_name: 'input-mouse-symbolic',
      style_class: 'system-status-icon',
    })

    this.#topbarButton.add_child(icon)
  }

  createTopBarMenu() {
    if (this.#topbarButton) {
      this.#topbarMenu = this.#topbarButton.menu as TopBarMenu
      this.#topbarMenu.addSettingsAction('Settings', '')

      const enabled = new PopupMenu.PopupSwitchMenuItem('Active', true)
      this.#topbarMenu.addMenuItem(enabled, 3)

      const modifier = new PopupMenu.PopupSwitchMenuItem('Use Ctrl Key', this.#useModifier)
      this.#topbarMenu.addMenuItem(modifier, 4)
    }
  }

  createWidget() {
    this.#widget = new St.Widget({
      can_focus: false,
      height: this.#size,
      reactive: false,
      style_class: 'sketchbuch-mousecast-overlay__halo',
      track_hover: false,
      width: this.#size,
    })

    if (this.#overlay) {
      this.#overlay.add_child(this.#widget)
    }
  }

  setWidgetPosition() {
    if (this.#overlay && this.#widget) {
      // modifier is a combinatioon of all modifiers
      const [pointerX, pointerY, modifier] = Desktop.get_pointer()
      const isCtrlPressed = this.#useModifier
        ? (modifier &
            ~(
              Clutter.ModifierType.MOD2_MASK |
              Clutter.ModifierType.LOCK_MASK |
              Clutter.ModifierType.SHIFT_MASK
            )) ===
          Clutter.ModifierType.CONTROL_MASK
        : false
      const needsOverlay = (this.#useModifier && isCtrlPressed) || !this.#useModifier
      const isVisible = this.#overlay.is_visible()

      if (needsOverlay) {
        const widgetOffset = this.#size / 2
        this.#widget.set_position(pointerX - widgetOffset, pointerY - widgetOffset)
      }

      if (needsOverlay && !isVisible) {
        this.#overlay?.show()
      } else if (!needsOverlay && isVisible) {
        this.#overlay?.hide()
      }
    }
  }

  trackMouse() {
    if (this.#mouseTrackerId === -1) {
      this.#mouseTrackerId = global.stage.connect('captured-event', () => {
        this.setWidgetPosition()
      })
    }
  }

  disable() {
    if (this.#mouseTrackerId !== -1) {
      global.stage.disconnect(this.#mouseTrackerId)
      this.#mouseTrackerId = -1
    }

    if (this.#overlay) {
      Main.layoutManager.removeChrome(this.#overlay)
      this.#overlay?.destroy()
      this.#overlay = null
    }

    this.#topbarButton?.destroy()
    this.#topbarButton = null

    this.#topbarMenu?.destroy()
    this.#topbarMenu = null

    this.#widget?.destroy()
    this.#widget = null
  }

  enable() {
    //this.#settings = this.getSettings()

    this.createOverlay()
    this.createWidget()
    this.createTopBarButton()
    this.createTopBarMenu()
    this.addUi()
    this.setWidgetPosition()
    this.trackMouse()
  }
}
