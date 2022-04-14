import { LitElement, html, css } from 'lit';
import { Env } from '@furo/framework/src/furo.js';
import { FieldNodeAdapter } from '@furo/data/src/lib/FieldNodeAdapter.js';

import '@ui5/webcomponents/dist/Badge.js';

/**
 * `furo-ui5-relative-time-badge`
 * The furo-ui5-relative-time-badge is a small non-interactive component which contains relative time
 * information (i.e. in 2 days, 5 days ago) and color chosen from a list of predefined color schemes.
 * It serves the purpose to attract the user attention to some piece of information.
 *
 * You can bind a `string`, `google.protobuf.Timestamp`, `int32`, `int64`, `furo.type.Date` or `google.type.Date`.
 * `int32`, `int64` will be handled as unix timestamps (seconds since epoc) and can not be *empty*.
 *
 * ```html
 *  <furo-ui5-relative-time-badge
 *     ƒ-bind-data="--dao(FIELDNODE)">
 *  </furo-ui5-relative-time-badge>
 * ```
 *
 * @summary bindable relative time badge
 * @customElement
 */
class FuroUi5RelativeTimeBadge extends FieldNodeAdapter(LitElement) {
  constructor() {
    super();
    /**
     * internal value
     * @type {string}
     * @private
     */
    this._colorScheme = '1';
    /**
     * internal display value
     * @type {string}
     * @private
     */
    this._dueTime = '';
    /**
     * internal title value
     * @type {string}
     * @private
     */
    this._timestampFormatted = '';

    /**
     * default values
     * @type {string}
     */
    this.colorSchemePositive = '1';
    this.colorSchemeNegative = '2';
    this.optionStyle = 'long';
    this.optionNumeric = 'auto';
  }

  /**
   * Reactive component properties
   * @returns {{optionStyle: {attribute: string, type: StringConstructor}, optionNumeric: {attribute: string, type: StringConstructor}, colorSchemeNegative: {reflect: boolean, attribute: string, type: StringConstructor}, colorSchemePositive: {reflect: boolean, attribute: string, type: StringConstructor}}}
   */
  static get properties() {
    return {
      /**
       * Defines the color scheme of the component if the value is POSITIVE. There are 10 predefined schemes.
       * Each scheme applies different values for the background-color and border-color. To use one you can set a
       * number from "1" to "10". The colorScheme "1" will be set by default.
       *
       * Note: Color schemes have no visual representation in High Contrast Black (sap_belize_hcb) theme.
       */
      colorSchemePositive: {
        type: String,
        reflect: true,
        attribute: 'color-scheme-positive',
      },
      /**
       * Defines the color scheme of the component if the value is NEGATIVE. There are 10 predefined schemes.
       * Each scheme applies different values for the background-color and border-color. To use one you can set a
       * number from "1" to "10". The colorScheme "1" will be set by default.
       *
       * Note: Color schemes have no visual representation in High Contrast Black (sap_belize_hcb) theme.
       */
      colorSchemeNegative: {
        type: String,
        reflect: true,
        attribute: 'color-scheme-negative',
      },
      /**
       * Defines the output style
       * long, short, narrow
       * Default: long
       */
      optionStyle: { type: String, attribute: 'option-style' },
      /**
       * Defines the output format
       * always, auto
       * Default: auto
       */
      optionNumeric: { type: String, attribute: 'option-numeric' },
    };
  }

  /**
   * CSS styles
   * @returns {CSSResult}
   */
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      :host([hidden]) {
        display: none;
      }
    `;
  }

  /**
   * Binds a fieldNode to the component
   * Overridden bindData of FieldNodeAdapter
   *
   * Supported types:
   * - string (ISO 8061)
   * - int32, int64 (unix timestamps (seconds since epoc))
   * - google.protobuf.Timestamp
   * - google.type.Date
   * - furo.type.Date
   * @param fieldNode
   */
  bindData(fieldNode) {
    super.bindData(fieldNode);
  }

  /**
   * Overridden onFnaFieldValueChanged of FieldNodeAdapter
   * @private
   */
  onFnaFieldValueChanged(value) {
    const type = this.getDataType();
    switch (type) {
      case 'int32':
      case 'int64':
        this._formatDisplay(new Date(value * 1000).getTime());
        break;
      case 'furo.type.Date':
      case 'google.type.Date':
        if (value.month && value.day) {
          const now = new Date();
          this._formatDisplay(
            new Date(
              value.year,
              value.month - 1,
              value.day,
              now.getHours(),
              now.getSeconds(),
              now.getMilliseconds(),
            ).getTime(),
          );
        }
        break;
      case 'google.protobuf.Timestamp':
      case 'string':
      default:
        if (value === '' || value === null || value === undefined) {
          this.value = '';
        } else {
          this._formatDisplay(new Date(value).getTime());
        }
    }
  }

  /**
   * Internal relative time format function
   * use of Intl.RelativeTimeFormat
   * @private
   */
  _formatDisplay(endTime) {
    const now = new Date().getTime();
    const difference = endTime - now;

    // set default color scheme
    this._colorScheme = this.colorSchemePositive;

    this._timestampFormatted = Intl.DateTimeFormat([Env.locale, 'de-CH'], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(endTime));

    let diffValue = difference / 1000 / 60 / 60 / 24;
    if (diffValue < 1 && diffValue > -1) {
      // special check for small differences
      if (new Date(now).getDate() === new Date(now + difference).getDate()) {
        diffValue = 0;
      } else {
        diffValue = Math.round(diffValue);
      }
    } else {
      diffValue = Math.round(diffValue);
    }

    this._dueTime = new Intl.RelativeTimeFormat([Env.locale, 'de-CH'], {
      style: this.optionStyle,
      numeric: this.optionNumeric,
    }).format(diffValue, 'day');

    // check if negative color scheme should be applied
    if (difference < 0) {
      this._colorScheme = this.colorSchemeNegative;
    }
    this.requestUpdate();
  }

  /**
   * @private
   * @returns {TemplateResult|TemplateResult}
   */
  render() {
    // language=HTML
    return html`
      <ui5-badge
        ?hidden="${!this._dueTime.length}"
        title="${this._timestampFormatted}"
        color-scheme="${this._colorScheme}"
      >
        ${this._dueTime}
      </ui5-badge>
    `;
  }
}

window.customElements.define('furo-ui5-relative-time-badge', FuroUi5RelativeTimeBadge);
