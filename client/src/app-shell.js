import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp';

// workaround for elements which do not like lazy loading
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/Assets.js';
import '@ui5/webcomponents-localization/dist/Assets.js';
import '@ui5/webcomponents-fiori/dist/Assets.js';
import '@ui5/webcomponents-theming/dist/Assets.js';

import '@furo/util/src/furo-config-loader.js';
import '@furo/route/src/furo-app-flow-router.js';
import '@furo/fbp/src/vizConnector.js';

import('./configs/init.js').then(() => {
  import('./main-stage.js');
});

/**
 * This is the application shell.
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
        --background: var(--sapBackgroundColor, #f7f7f7);
        --on-background: var(--sapTextColor, #32363a);
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
        color: var(--sapTextColor, #32363a);
        /* SAP Fiori */
        --sapIllus_BrandColorPrimary: var(--sapContent_Illustrative_Color1);
        --sapIllus_BrandColorSecondary: var(--sapContent_Illustrative_Color2);
        --sapIllus_StrokeDetailColor: var(--sapContent_Illustrative_Color4);
        --sapIllus_Layering1: var(--sapContent_Illustrative_Color5);
        --sapIllus_Layering2: var(--sapContent_Illustrative_Color6);
        --sapIllus_BackgroundColor: var(--sapContent_Illustrative_Color7);
        --sapIllus_ObjectFillColor: var(--sapContent_Illustrative_Color8);
        --sapIllus_AccentColor: var(--sapContent_Illustrative_Color3);
        --sapIllus_NoColor: none;
        --sapIllus_PatternShadow: url(#sapIllus_PatternShadow);
        --sapIllus_PatternHighlight: url(#sapIllus_PatternHighlight);
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
        src="src/configs/flowConfig.flow"
        section="flow"
        @-config-loaded="--flowConfigLoaded"
      ></furo-config-loader>
    `;
  }
}

window.customElements.define('app-shell', AppShell);
