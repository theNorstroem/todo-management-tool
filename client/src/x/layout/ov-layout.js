import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp';
import '@furo/ui5/src/furo-ui5-z-grid.js';
import '@furo/ui5/src/furo-ui5-flexible-grid.js';

/**
 * `ov-layout`
 * todo Describe your element
 *
 * @summary todo shortdescription
 * @customElement
 * @demo demo-ov-layout
 * @appliesMixin FBP
 */
class OvLayout extends FBP(LitElement) {
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
        height: var(--ov-layout-left-size-s);
      }

      .left[size='size-m'] {
        height: var(--ov-layout-left-size-m);
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
      <furo-ui5-flexible-grid padding>
        <div full><slot name="top"></slot></div>
        <div hspan="4" full-on-size-medium full-on-size-small class="left">
          <slot name="left"></slot>
        </div>
        <furo-ui5-z-grid hstart="5" fill>
          <slot></slot>
        </furo-ui5-z-grid>
      </furo-ui5-flexible-grid>
    `;
  }
}

window.customElements.define('ov-layout', OvLayout);
