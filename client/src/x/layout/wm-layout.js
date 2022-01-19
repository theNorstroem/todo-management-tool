import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp';
import '@furo/ui5/src/furo-ui5-z-grid.js';
import '@furo/ui5/src/furo-ui5-flexible-grid.js';

/**
 * `wm-layout`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-wm-layout
 * @appliesMixin FBP
 */
class WmLayout extends FBP(LitElement) {
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
        margin-bottom: 1rem;
      }

      :host([hidden]) {
        display: none;
      }

      /* needed because the contents get positioned vertically on small screens*/
      .left[size='size-s'] {
        height: var(--wm-layout-left-size-s);
      }

      .left[size='size-m'] {
        height: var(--wm-layout-left-size-m);
      }
      .content {
        display: grid;
        grid-row-gap: 1rem;
        grid-column-gap: 1rem;
        grid-template-columns: auto minmax(320px, 45%);
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
      <furo-flexible-grid padding>
        <div full><slot name="top"></slot></div>
        <div hspan="6" full-on-size-medium full-on-size-small class="left">
          <slot name="left"></slot>
        </div>
        <furo-ui5-z-grid hstart="7" fill>
          <slot></slot>
        </furo-ui5-z-grid>
      </furo-flexible-grid>
    `;
  }
}

window.customElements.define('wm-layout', WmLayout);
