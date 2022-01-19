import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';

import '@furo/route/src/furo-app-flow.js';
import '@furo/layout/src/furo-vertical-flex.js';
import '@ui5/webcomponents-fiori/dist/ShellBar.js';

import '@ui5/webcomponents-fiori/dist/IllustratedMessage.js';
import '@ui5/webcomponents-fiori/dist/illustrations/UnableToLoad.js';
/**
 * `view-5xx`
 * Message pages give feedback to the user when an app or list is empty, or when an error has occurred.
 * The icon name is "message-warning".
 *
 *
 * @summary message pages
 * @customElement
 * @appliesMixin FBP
 */
class View5xx extends FBP(LitElement) {
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
        <ui5-shellbar primary-title="ToDo Management Tool">
          <ui5-button icon="nav-back" slot="startButton" @-click="--historyBack"></ui5-button>
        </ui5-shellbar>

        <ui5-illustrated-message flex scroll name="UnableToLoad"></ui5-illustrated-message>
      </furo-vertical-flex>

      <furo-app-flow ƒ-emit="--historyBack" event="history-back"></furo-app-flow>
    `;
  }
}

window.customElements.define('view-5xx', View5xx);
