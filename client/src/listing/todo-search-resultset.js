import { css, html, LitElement } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';

import '@furo/ui5/src/furo-ui5-table.js';

import '@furo/data/src/furo-data-object.js';
import '@furo/data/src/furo-deep-link.js';
import '@furo/data/src/furo-collection-agent.js';

import '../x/layout/furo-ui5-dynamic-page-layout.js';

/**
 * Todos searcher component with result set
 *
 * @customElement
 * @appliesMixin FBP
 */
export class TodoSearchResultset extends FBP(LitElement) {
  _FBPReady() {
    super._FBPReady();
    this._FBPTraceWires();

    /**
     * Register hook on wire --collectionResponse to
     * set the _noresult value based on the number of entities
     */
    this._FBPAddWireHook('--collectionResponse', e => {
      const noresult = !(e.entities && e.entities.length > 0);
      if (noresult) {
        /**
         * @event no-results
         * Fired when a collection does not have any entity
         *
         * Contains a string no-results .
         */
        const customEvent = new Event('no-results', { composed: true, bubbles: true });
        customEvent.detail = 'NoSearchResults';
        this.dispatchEvent(customEvent);
      } else {
        const customEvent = new Event('results', { composed: true, bubbles: true });
        customEvent.detail = 'results';
        this.dispatchEvent(customEvent);
      }
    });
  }

  /**
   * CSS Styles
   * @returns {CSSResult}
   */
  static get styles() {
    // language=CSS
    return css`
      :host {
        display: block;
      }

      :host([hidden]) {
        display: none;
      }
    `;
  }

  /**
   * Sets the query parameters
   * @param query
   */
  queryParamUpdated(query) {
    this._FBPTriggerWire('--queryParamUpdated', query);
  }

  /**
   * Triggers the list method of the TodosService
   */
  search() {
    this._FBPTriggerWire('--methodListForwarded', null);
  }

  /**
   * Sets the state `BeforeSearch`
   */
  reset() {
    this._FBPTriggerWire('--methodResetForwarded', null);

    const customEvent = new Event('before-search-state', { composed: true, bubbles: true });
    customEvent.detail = 'BeforeSearch';
    this.dispatchEvent(customEvent);
  }

  /**
   * @private
   */
  render() {
    // language=HTML
    return html`
      <furo-ui5-dynamic-page-layout padding>
        <furo-ui5-table mode="SingleSelect" no-data-text="No data available" ƒ-bind-data="--collectionDao(*.entities)">
          <ui5-table-column slot="columns" min-width="320" demand-popin field="*.data.description"
            ><span>Description</span></ui5-table-column
          >

          <ui5-table-column slot="columns" field="*.data.due_date"
            ><span>Due date</span></ui5-table-column
          >
          <ui5-table-column slot="columns" field="*.data.id"><span>Id</span></ui5-table-column>
        </furo-ui5-table>
      </furo-ui5-dynamic-page-layout>

      <!-- Creates HATEOAS links according the set specification. Required for DeepLinking. -->
      <furo-deep-link
        service="TodosService"
        @-hts-out="--htsOut"
        ƒ-qp-in="--queryParamUpdated"
      ></furo-deep-link>

      <!-- API communication component. Required to handle collections.
      The search-hts-updated event will be catched in the view and passed down to the pagination bar
      -->
      <furo-collection-agent
        service="TodosService"
        @-request-started="--reqStarted"
        @-response="--collectionResponse"
        ƒ-list="--methodListForwarded"
        ƒ-hts-in="--htsOut,|--htsIn"
      ></furo-collection-agent>

      <!-- Client data model based on the set data type. -->
      <furo-data-object
        type="todos.ItemCollection"
        @-object-ready="--collectionDao"
        ƒ-inject-raw="--collectionResponse"
        ƒ-init="--methodResetForwarded"
      ></furo-data-object>
    `;
  }
}

window.customElements.define('todo-search-resultset', TodoSearchResultset);
