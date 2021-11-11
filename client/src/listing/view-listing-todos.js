import { css, html, LitElement } from 'lit';
import { FBP } from '@furo/fbp';

import '@furo/layout/src/furo-vertical-flex.js';
import '@furo/route/src/furo-app-flow.js';
import '@furo/route/src/furo-document-title.js';
import '@furo/data/src/furo-reverse-deep-link.js';

import './todo-listing-panel.js';

/**
 * Listing view
 *
 * @customElement
 * @appliesMixin FBP
 */
class ViewListingTodos extends FBP(LitElement) {
  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    // this._FBPTraceWires();
  }

  /**
   * css styles
   */
  static get styles() {
    // language=CSS
    return css`
      :host {
        display: block;
        height: 100%;
      }

      :host([hidden]) {
        display: none;
      }
    `;
  }

  /**
   * @private
   * @returns {TemplateResult|TemplateResult}
   */
  render() {
    // language=HTML
    return html`
      <furo-vertical-flex>
        <ui5-shellbar primary-title="ToDo Management Tool"> </ui5-shellbar>
        <todo-listing-panel
          flex
          ƒ-focus="--pageActivated"
          ƒ-update-query-param="--pageQueryChanged(*.query)"
          @-record-selected="--todoItemSelected"
        ></todo-listing-panel>
      </furo-vertical-flex>

      <!-- Required to create query params based on the set data record. -->
      <furo-reverse-deep-link
        rel="self"
        service="TodosService"
        @-converted="--queryParams"
        ƒ-convert="--todoItemSelected(*.links)"
      ></furo-reverse-deep-link>

      <!-- Navigation component that is configurable through flowConfig.json. -->
      <furo-app-flow event="todo-item-selected" ƒ-emit="--queryParams"></furo-app-flow>

      <furo-document-title
        prefix="Todo Management Tool"
        title=" : List items"
        ƒ-set-waypoint="--pageActivated"
      ></furo-document-title>
    `;
  }
}

window.customElements.define('view-listing-todos', ViewListingTodos);
