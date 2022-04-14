import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';

import '@furo/route/src/furo-app-flow.js';
import '@furo/layout/src/furo-vertical-flex.js';
import '@ui5/webcomponents-fiori/dist/ShellBar.js';

import '@ui5/webcomponents-fiori/dist/IllustratedMessage.js';
import '@ui5/webcomponents-fiori/dist/illustrations/PageNotFound.js';
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
    return css`
      :host {
        display: block;
        height: 100%;
      }

      :host([hidden]) {
        display: none;
      }
    `;
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
        <ui5-shellbar primary-title="ToDo Management Tool" secondary-title="Page not found">
          <ui5-button icon="nav-back" slot="startButton" @-click="--historyBack"></ui5-button>
        </ui5-shellbar>

        <ui5-illustrated-message flex scroll name="PageNotFound" title="Page not found">
          <furo-ui5-button design="Emphasized" @-click="--historyBack">back</furo-ui5-button>
        </ui5-illustrated-message>
      </furo-vertical-flex>

      <furo-app-flow ƒ-emit="--historyBack" event="history-back"></furo-app-flow>
    `;
  }
}

window.customElements.define('view-404', View404);
