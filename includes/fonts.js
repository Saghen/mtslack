// Fonts.js
window.slackPluginsAPI = window.slackPluginsAPI || {};
window.slackPluginsAPI.plugins = window.slackPluginsAPI.plugins || {};

class FontsPlugin extends window.slackPluginsAPI.pluginBase {
  constructor() {
    super();
    // Mandatory
    this.name = 'fonts';
    this.desc = 'Custom Fonts';
    this.longDescription = 'Enter the custom fonts, separated by commas';
    this.enabled = true;
    this.shortcut = '';
    this.icon = 'format';

    // Specific
    this.DEFAULT_CUSTOM = 'Roboto, Slack-Lato, appleLogo, sans-serif';
    this.DEFAULT = 'Slack-Lato, appleLogo, sans-serif';

    this.fontFamily = 'Roboto, Slack-Lato, appleLogo, sans-serif';
    this.fontsEnabled = false;

    this.extraContentId = 'customFonts';
  }

  extraContent() {
    return `<input class="c-input_text p-prefs_modal__custom_theme_input" style="width:70%" placeholder="Enter fonts, separated by commas" id="fontFamily" name="fontFamily" type="text" value="${this.fontFamily}">
<button id="customFontsButton" name="customFontsButton" class="c-button c-button--outline c-button--medium null--outline null--medium" type="button">Apply</button>`;
  }

  extraContentOnClick() {
    const ff = document.getElementById('fontFamily').value;
    if (ff) {
      this.fontFamily = ff;
      this.applyFonts();
    }
  }

  onToolbarClick() {
    this.toggleFonts();
  }

  /**
   * Toggle the setting
   */
  toggleFonts() {
    this.fontsEnabled = !this.fontsEnabled;
    this.applyFonts();
  }

  /**
   * Apply fonts
   */
  applyFonts() {
    if (this.fontsEnabled) {
      document.querySelector('body').style.fontFamily = this.fontFamily;
    }
    else {
      document.querySelector('body').style.fontFamily = this.DEFAULT;
    }
    window.slackPluginsAPI.saveSettings();
  }

  /**
   * Apply
   */
  apply() {
    this.applyFonts();
  }

  /**
   * Save Settings
   * @returns {{fontFamily: string, fontsEnabled: boolean, enabled: boolean}}
   */
  saveSettings() {
    return {
      enabled: this.enabled,
      fontFamily: this.fontFamily,
      fontsEnabled: this.fontsEnabled
    };
  }

}

window.slackPluginsAPI.plugins.fonts = new FontsPlugin();