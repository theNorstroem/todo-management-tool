import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp';
import { MediaSize } from '@furo/ui5/src/lib/MediaSize.js';

/**
 * Registration of standard display/cell/celledit renderers
 */
import './configs/display-registry.js';

import '@furo/route/src/furo-location.js';
import '@furo/route/src/furo-pages.js';

/**
 * Static imports of the views
 */
import './create/view-create-todos.js';
import './listing/view-listing-todos.js';
import './detail/view-detail-todos.js';
import './update/view-update-todos.js';
import './view-404.js';
import './view-5xx.js';

import '@furo/ui5/src/furo-ui5-dialog-display.js';

/**
 * Entry point of the web application.
 * All the main views are registered here.
 *
 * @customElement
 * @appliesMixin FBP
 */
class MainStage extends FBP(LitElement) {
  _FBPReady() {
    super._FBPReady();

    /**
     * Responsive spacing system
     */
    window.addEventListener(
      'resize',
      MediaSize.DebounceBuilder(() => {
        this.setAttribute('media-size', MediaSize.GetMediaSize());
      }, MediaSize.HANDLE_RESIZE_DEBOUNCE_RATE),
    );
    // initial size
    this.setAttribute('media-size', MediaSize.GetMediaSize());
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

      :host([media-size='XXL']) {
        --FuroUi5MediaSizeIndentation: 2rem 3rem 1rem 3rem;
        --FuroUi5MediaSizeIndentationTop: 2rem;
        --FuroUi5MediaSizeIndentationRight: 3rem;
        --FuroUi5MediaSizeIndentationBottom: 1;
        --FuroUi5MediaSizeIndentationLeft: 3rem;
      }

      :host([media-size='XL']) {
        --FuroUi5MediaSizeIndentation: 2rem 3rem 1rem 3rem;
        --FuroUi5MediaSizeIndentationTop: 2rem;
        --FuroUi5MediaSizeIndentationRight: 3rem;
        --FuroUi5MediaSizeIndentationBottom: 1;
        --FuroUi5MediaSizeIndentationLeft: 3rem;
      }

      :host([media-size='L']) {
        --FuroUi5MediaSizeIndentation: 1rem 2rem 0 2rem;
        --FuroUi5MediaSizeIndentationTop: 1rem;
        --FuroUi5MediaSizeIndentationRight: 2rem;
        --FuroUi5MediaSizeIndentationBottom: 0;
        --FuroUi5MediaSizeIndentationLeft: 2rem;
      }

      :host([media-size='M']) {
        --FuroUi5MediaSizeIndentation: 0.625rem 2rem 0 2rem;
        --FuroUi5MediaSizeIndentationTop: 0.625rem;
        --FuroUi5MediaSizeIndentationRight: 2rem;
        --FuroUi5MediaSizeIndentationBottom: 0;
        --FuroUi5MediaSizeIndentationLeft: 2rem;
      }

      :host([media-size='S']) {
        --FuroUi5MediaSizeIndentation: 0.625rem 1rem 0 1rem;
        --FuroUi5MediaSizeIndentationTop: 0.625rem;
        --FuroUi5MediaSizeIndentationRight: 1rem;
        --FuroUi5MediaSizeIndentationBottom: 0;
        --FuroUi5MediaSizeIndentationLeft: 1rem;
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

      <furo-pages ƒ-inject-location="--locationChanged" default="list-todos">
        <view-create-todos name="add-todos"></view-create-todos>
        <view-listing-todos name="list-todos"></view-listing-todos>
        <view-detail-todos name="todo-detail"></view-detail-todos>
        <view-update-todos name="update-todo"></view-update-todos>
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
