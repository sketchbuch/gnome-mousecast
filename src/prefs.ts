import Adw from 'gi://Adw'
import { ExtensionMetadata } from 'resource:///org/gnome/shell/extensions/extension.js'

import {
  ExtensionPreferences,
  gettext as t,
} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js'

export default class ExamplePreferences extends ExtensionPreferences {
  constructor(metadata: ExtensionMetadata) {
    super(metadata)

    console.debug(`constructing ${this.metadata.name}`)
  }

  fillPreferencesWindow(window: Adw.PreferencesWindow) {
    // Create a preferences page, with a single group
    const page = new Adw.PreferencesPage({
      title: t('General'),
      icon_name: 'dialog-information-symbolic',
    })
    window.add(page)

    const group = new Adw.PreferencesGroup({
      title: t('Appearance'),
      description: t('Configure the appearance of the extension'),
    })
    page.add(group)

    // Create a new preferences row
    const row = new Adw.SwitchRow({
      title: t('Show Indicator'),
      subtitle: t('Whether to show the panel indicator'),
    })
    group.add(row)
  }
}
