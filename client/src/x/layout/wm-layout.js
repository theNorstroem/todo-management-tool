import { LitElement, html, css } from 'lit';
import { Theme } from '@furo/framework/src/theme.js';
import { FBP } from '@furo/fbp';
import '@furo/layout/src/furo-z-grid.js';
import '@furo/layout/src/furo-split-grid.js';

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
    return (
      Theme.getThemeForComponent('WmLayout') ||
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
        <div hspan="6" full-on-size-medium full-on-size-small class="left">
          <slot name="left"></slot>
        </div>
        <furo-z-grid hstart="7" fill>
          <slot></slot>
        </furo-z-grid>
      </furo-split-grid>
    `;
  }
}

window.customElements.define('wm-layout', WmLayout);
