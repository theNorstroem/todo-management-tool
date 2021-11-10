import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';

/**
 * `furo-ui5-dynamic-page-layout`
 * The dynamic page layout is the foundation for all pages in Adcubum.
 * It is a generic layout control designed to support various floorplans and use cases.
 *
 * If the attribute `padding`is set, the dynamic page layout supports the correct breakpoints and paddings
 * according to SAP Fiori Design System.
 *
 * ```
 * <furo-ui5-dynamic-page-layout padding>
 *    <your-components></your-components>
 * </furo-ui5-dynamic-page-layout>
 * ```
 *
 * @summary
 * @customElement
 * @appliesMixin FBP
 */
class FuroUi5DynamicPageLayout extends FBP(LitElement) {
  /**
   * @private
   * @return {Object}
   */
  static get properties() {
    return {
      /**
       * Breakpoint size for small
       */
      sizeSmall: { type: Number, attribute: 'size-small' },
    };
  }

  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();

    this.updateComplete.then(() => {
      if (window.ResizeObserver) {
        const ro = new ResizeObserver(() => {
          window.requestAnimationFrame(() => {
            this._checkSize(this.getBoundingClientRect().width);
          });
        });
        ro.observe(this);
      } else {
        // fallback, just listen to the resize event
        setTimeout(() => {
          const cr = this.getBoundingClientRect();
          this._checkSize(cr.width);
        }, 1);

        window.addEventListener('resize', () => {
          const cr = this.getBoundingClientRect();
          this._checkSize(cr.width);
        });
      }
    });
  }

  /**
   * Form breakpoints according to SAP Fiori Design System
   * https://experience.sap.com/fiori-design-web/form/
   * @param size
   * @private
   */
  _checkSize(size) {
    if (size <= 600) {
      this.setAttribute('size', 'size-s');
    } else if (size > 600 && size <= 1023) {
      this.setAttribute('size', 'size-m');
    } else if (size > 1023 && size <= 1439) {
      this.setAttribute('size', 'size-l');
    } else if (size > 1439) {
      this.setAttribute('size', 'size-xl');
    } else {
      this.setAttribute('size', 'size-m');
    }
  }

  static get styles() {
    // language=CSS
    return [
      css`
        :host {
          display: block;
          box-sizing: border-box;
          position: relative;
        }

        :host([hidden]) {
          display: none;
        }

        /* Paddings */
        :host([size='size-s'][padding]) {
          padding: 0.25rem 1rem;
        }

        :host([size='size-m'][padding]) {
          padding: 0.25rem 2rem;
        }

        :host([size='size-l'][padding]) {
          padding: 1rem 2rem;
        }

        :host([size='size-xl'][padding]) {
          padding: 1rem 3rem;
        }
      `,
    ];
  }

  /**
   * @private
   * @returns {TemplateResult|TemplateResult}
   */
  render() {
    // language=HTML
    return html` <slot></slot> `;
  }
}

window.customElements.define('furo-ui5-dynamic-page-layout', FuroUi5DynamicPageLayout);
