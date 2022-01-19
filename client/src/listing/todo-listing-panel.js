import { LitElement, html, css } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';

import '@furo/layout/src/furo-vertical-flex.js';
import '@furo/route/src/furo-pages.js';

import '@furo/ui5/src/furo-ui5-header-panel.js';
import '@furo/ui5/src/furo-ui5-pagination-bar.js';
import '@furo/ui5/src/furo-ui5-message-strip-display.js';
import '@furo/ui5/src/furo-ui5-message-strip.js';

import '@ui5/webcomponents-fiori/dist/IllustratedMessage.js';
import '@ui5/webcomponents-fiori/dist/illustrations/BeforeSearch.js';
import '@ui5/webcomponents-fiori/dist/illustrations/NoSearchResults.js';
import '../x/layout/furo-ui5-dynamic-page-layout.js';

import './todo-search-resultset.js';

/**
 * Listing panel with header bar and results
 *
 * @customElement
 * @appliesMixin FBP
 */
class TodoListingPanel extends FBP(LitElement) {
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

  _FBPReady() {
    super._FBPReady();
    this._FBPTraceWires();
  }

  /**
   * Focuses the first field on the filter panel
   */
  focus() {
    this._FBPTriggerWire('--focus', null);
  }

  /**
   * Set Query Params for the deep linker
   * @public
   * @param query
   */
  updateQueryParam(query) {
    //  not trigger when the parameter has not been changed. This fix avoids losing paging information when returning to this page
    if (!this.query || JSON.stringify(this.query) !== JSON.stringify(query)) {
      this.query = query;
      this._FBPTriggerWire('--queryParamUpdated', query);
    }
  }

  /**
   * renders the template
   * @private
   */
  render() {
    // language=HTML
    return html`
      <furo-vertical-flex>
        <furo-ui5-header-panel header-text="Listing of ToDo Items" collapsed>
          <furo-keydown key="Enter" @-key="--EnterKeyPressed"></furo-keydown>
          <furo-horizontal-flex slot="action" space>
            <!-- we listen for "Enter" on the fields to trigger the search,
            but clearing and searching does not need to trigger again -->
            <furo-keydown key="Enter" stop-propagation></furo-keydown>
            <furo-ui5-button
              design="Emphasized"
              ƒ-click="--EnterKeyPressed"
              @-click="--searchTriggered"
              >List</furo-ui5-button
            >
            <furo-ui5-button design="Transparent" @-click="--resetTriggered">Clear</furo-ui5-button>
          </furo-horizontal-flex>
        </furo-ui5-header-panel>

        <furo-ui5-dynamic-page-layout padding>
          <furo-ui5-message-strip-display
            ƒ-clear-all="--resetTriggered"
          ></furo-ui5-message-strip-display>
          <furo-ui5-message-strip
            message="Sorry, the listing services are currently not available. We are working on it."
            ƒ-show-error="--err"
            ƒ-show-grpc-localized-message="--grpcError"
          ></furo-ui5-message-strip>
        </furo-ui5-dynamic-page-layout>

        <furo-pages
          flex
          scroll
          default="BeforeSearch"
          ƒ-activate-page="--noSearchResults, --hasSearchResults, --initSearch"
        >
          <ui5-illustrated-message
            name="BeforeSearch"
            title-text="Let's get some results"
            subtitle-text="Start by providing your search criteria."
          >
            <furo-ui5-button icon="edit" @-click="--registerToDoRequested"
              >Register new item</furo-ui5-button
            >
          </ui5-illustrated-message>

          <todo-search-resultset
            name="results"
            ƒ-query-param-updated="--queryParamUpdated"
            ƒ-search="--searchTriggered"
            ƒ-reset="--resetTriggered"
            @-no-results="--noSearchResults"
            @-results="--hasSearchResults"
            @-response-error="--err"
            @-response-error-400="--grpcError"
            @-fatal-error="--err"
            @-before-search-state="--initSearch"
            @-tablerow-selected="^^record-selected"
          ></todo-search-resultset>

          <!-- shows illustrated message NoResultsFound if response is empty -->
          <ui5-illustrated-message
            name="NoSearchResults"
            title-text="No results found"
            subtitle-text="Try changing your search criteria."
          >
            <furo-ui5-button @-click="--registerToDoRequested">Register new item</furo-ui5-button>
          </ui5-illustrated-message>
        </furo-pages>

        <!-- Provides HATEOAS based pagination functionality. -->
        <furo-ui5-pagination-bar
          @-pagination-first="--first"
          @-pagination-last="--last"
          @-pagination-next="--next"
          @-pagination-prev="--prev"
          @-escape-pressed="--escapePaginationBar"
          ƒ-inject="--searchHTS"
        ></furo-ui5-pagination-bar>
      </furo-vertical-flex>

      <!-- Application routing -->
      <furo-app-flow
        event="flow-create-todo-requested"
        ƒ-emit="--registerToDoRequested"
      ></furo-app-flow>
    `;
  }
}

window.customElements.define('todo-listing-panel', TodoListingPanel);
