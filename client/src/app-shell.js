import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp';
import './configs/init.js';
import '@furo/config/src/furo-config-loader.js';
import '@furo/route/src/furo-app-flow-router.js';
import '@furo/fbp/src/vizConnector.js';

// ui5 components need the i18n stuff before they start.
import('./configs/ui5Init.js').then(async () => {
  import('./main-stage.js');
});

/**
 * `main-app`
 *
 * @customElement
 * @appliesMixin FBP
 */
class AppShell extends FBP(LitElement) {
  /**
   *
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return css`
      :host {
        --background: #f7f7f7;

        --spacing-xxs: 4px;
        --spacing-xs: 8px;
        --spacing-s: 16px;
        --spacing: 24px;
        --spacing-m: 24px;
        --spacing-l: 32px;
        --spacing-xl: 40px;
        --spacing-xxl: 96px;

        --furo-form-layouter-row-gap: var(--spacing-s, 16px);
        --furo-form-layouter-column-gap: var(--spacing-s, 16px);
        --furo-ui5-form-field-container-grid-row-gap: var(--spacing-xs, 8px);

        display: block;
        overflow: hidden;
        height: 100vh;
        color: var(--textColor, #32363a);
      }
    `;
  }

  /**
   * @private
   * @returns {TemplateResult}
   */
  render() {
    // language=HTML
    return html`
      <main-stage
        @-app-flow="--flowEvent"
        @-response-error-401="--unauthorized"
        @-response-error-503="--serviceUnavailable"
        @-unauthorized="--unauthorized"
        @-navigate-back-clicked="--navBack"
      ></main-stage>

      <furo-app-flow-router
        url-space-regex="^${window.APPROOT}"
        ƒ-.config="--flowConfigLoaded"
        ƒ-trigger="--flowEvent"
        ƒ-back="--navBack"
      ></furo-app-flow-router>
      <furo-app-flow
        event="unauthorized"
        ƒ-trigger="--unauthorized"
        @-app-flow="--flowEvent"
      ></furo-app-flow>
      <furo-app-flow
        event="general-error-occurred"
        ƒ-trigger="--serviceUnavailable"
        @-app-flow="--flowEvent"
      ></furo-app-flow>
      <furo-config-loader
        src="src/configs/flowConfig.json"
        section="flow"
        @-config-loaded="--flowConfigLoaded"
      ></furo-config-loader>
    `;
  }
}

window.customElements.define('app-shell', AppShell);
