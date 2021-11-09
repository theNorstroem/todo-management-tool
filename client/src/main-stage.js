import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp';

/**
 * Registration of standard display/cell/celledit renderers
 */
import './configs/display-registry.js';

import '@furo/route/src/furo-location.js';
import '@furo/route/src/furo-pages.js';

/**
 * Static imports of the views
 * The lazy imports a below in _FBPReady
 */
import './create/view-create-todos.js';
import './view-404.js';
import './view-5xx.js';

import '@furo/ui5/src/furo-ui5-dialog-display.js';
/**
 * `main-stage`
 *
 * @customElement
 * @appliesMixin FBP
 */
class MainStage extends FBP(LitElement) {
  _FBPReady() {
    super._FBPReady();
    /**
     * Register hook on wire --locationChanged to
     * Lazy load parts of the page
     *
     * DO NOT FORGET TO REGISTER THE LAZY LOADED PARTS IN ~/polymer.json => fragments[...]
     *
     */
    this._FBPAddWireHook('--locationChanged', e => {
      switch (e.pathSegments[0]) {
        case 'ROUTE':
          // import('./views/view-ROUTE.js');
          break;
        default:
      }
    });
  }

  /**
   *
   * @private
   * @return {CSSResult}
   */
  static get styles() {
    // language=CSS
    return css`
      :host {
        height: 100%;
        display: block;
        background: var(--background);
        color: var(--on-background);
        font-family: var(--sapFontFamily, '72'), '72full', Arial, Helvetica, sans-serif;
        font-size: var(--sapFontSize);
      }

      furo-pages {
        height: 100vh;
        overflow: hidden;
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
      <!-- furo-pages provides auto wires, which are automatically triggered in the child elements if they have flowbased enabled.
            –pageDeActivated, Every time the element changes to hidden
            –pageActivated, Triggered when the element is activated. Comes with a location object.
            –pageQueryChanged, Triggered when the page query changes. Comes with a location object.
            –pageHashChanged, Triggered when the page hash changes. Comes with a location object.
      -->

      <furo-pages ƒ-inject-location="--locationChanged" default="createTodos">
        <view-create-todos name="createTodos"></view-create-todos>
        <!-- Page NOT FOUND  - fallback page if the requested page is not available -->
        <view-404 name="404"></view-404>
        <!-- Message Page 5xx - Error page for a 5xx error -->
        <view-5xx name="message-page-error"></view-5xx>
      </furo-pages>

      <furo-ui5-dialog-display></furo-ui5-dialog-display>
      <furo-location
        url-space-regex="^${window.APPROOT}"
        @-location-changed="--locationChanged"
        @-location-query-changed="--queryChanged"
      ></furo-location>
    `;
  }
}

window.customElements.define('main-stage', MainStage);
