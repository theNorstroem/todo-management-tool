import { LitElement, html, css } from 'lit';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp/src/fbp.js';
import { i18n } from '@furo/framework/src/i18n.js';

import '@furo/route/src/furo-app-flow.js';
import '@furo/layout/src/furo-vertical-flex.js';
import '@ui5/webcomponents-fiori/dist/ShellBar.js';

import './x/illustrated-messages/illustrations/NotFound404.js';
import './x/illustrated-messages/furo-ui5-illustrated-message.js';
/**
 * `view-404`
 * Message pages give feedback to the user when an app or list is empty, or when an error has occurred.
 * Should display the following text: “Sorry, we can’t find this page. Please check the URL you are using to call the app.”
 * The icon name is "document".
 *
 * @summary message pages
 * @customElement
 * @appliesMixin FBP
 */
class View404 extends FBP(LitElement) {
  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // this._FBPTraceWires()
  }

  /**
   * Themable Styles
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return (
      Theme.getThemeForComponent(this.name) ||
      css`
        :host {
          display: block;
          height: 100%;
        }

        :host([hidden]) {
          display: none;
        }
      `
    );
  }

  /**
   * @private
   * @returns {TemplateResult}
   * @private
   */
  render() {
    // language=HTML
    return html`
      <furo-vertical-flex>
        <ui5-shellbar
          primary-title="${i18n.t('web.core.404.shellbar.heading')}"
          secondary-title="${i18n.t('web.core.404.shellbar.subheading')}"
        >
          <ui5-button icon="nav-back" slot="startButton" @-click="--historyBack"></ui5-button>
        </ui5-shellbar>

        <furo-ui5-illustrated-message flex scroll name="NotFound404">
          <furo-ui5-button design="Emphasized" @-click="--historyBack"
            >${i18n.t('web.core.go.back')}</furo-ui5-button
          >
        </furo-ui5-illustrated-message>
      </furo-vertical-flex>

      <furo-app-flow ƒ-emit="--historyBack" event="history-back"></furo-app-flow>
    `;
  }
}

window.customElements.define('view-404', View404);
