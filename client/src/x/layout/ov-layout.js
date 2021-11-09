import { LitElement, html, css } from 'lit';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';
import '@furo/layout/src/furo-z-grid.js';
import '@furo/layout/src/furo-split-grid.js';

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
    return (
      Theme.getThemeForComponent('OvLayout') ||
      css`
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
      <furo-split-grid padding>
        <div full><slot name="top"></slot></div>
        <div hspan="4" full-on-size-medium full-on-size-small class="left">
          <slot name="left"></slot>
        </div>
        <furo-z-grid hstart="5" fill>
          <slot></slot>
        </furo-z-grid>
      </furo-split-grid>
    `;
  }
}

window.customElements.define('ov-layout', OvLayout);
