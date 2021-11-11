import { css, html, LitElement } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';

import '@furo/layout/src/furo-vertical-flex.js';

import '@furo/route/src/furo-app-flow.js';
import '@furo/route/src/furo-location-updater.js';
import '@furo/route/src/furo-document-title.js';

import '@furo/data/src/furo-deep-link.js';
import '@furo/data/src/furo-entity-agent.js';
import '@furo/data/src/furo-data-object.js';

import '@furo/ui5/src/furo-ui5-header-panel.js';
import '@furo/ui5/src/furo-ui5-message-strip.js';
import '@furo/ui5/src/furo-ui5-message-strip-display.js';

import '@ui5/webcomponents/dist/Title.js';

import '@ui5/webcomponents-fiori/dist/ShellBar.js';
import '@ui5/webcomponents-fiori/dist/ShellBarItem.js';

import '../x/layout/furo-ui5-dynamic-page-layout.js';

/**
 * Purpose: Display detail of a ToDos item
 *
 * @customElement
 * @appliesMixin FBP
 */
class ViewDetailTodos extends FBP(LitElement) {
  /**
   * flow is ready lifecycle method
   */
  _FBPReady() {
    super._FBPReady();
    this._FBPTraceWires();
  }

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

      ui5-bar {
        padding: 0.25rem 0;
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
        <!-- The ui5-shellbar is meant to serve as an application header and includes numerous built-in features,
        such as: logo, profile image/icon, title, search field, notifications and so on.-->
        <ui5-shellbar primary-title="ToDo Management Tool">
          <ui5-shellbar-item
            id="search"
            icon="search"
            @-item-click="--searchRequested"
          ></ui5-shellbar-item>
        </ui5-shellbar>

        <furo-ui5-header-panel
          icon="task"
          ƒ-bind-header-text="--daoToDoItem(*.data.id)"
          ƒ-bind-secondary-text="--daoToDoItem(*.data.description)"
        >
        </furo-ui5-header-panel>

        <furo-vertical-flex flex>
          <furo-ui5-dynamic-page-layout flex scroll padding>
            <!-- The message strip is a control that is used as an information bar. It contains information
                   about an object or a status and can be embedded within the detail area of an object or page. -->
            <furo-ui5-message-strip-display full></furo-ui5-message-strip-display>
            <furo-ui5-message-strip
              message="Sorry, the GetTodo services are currently not available. We are working on it."
              ƒ-show-error="--badGateway, --fatalError"
              ƒ-show-grpc-localized-message="--notImplemented, --grpcError"
            ></furo-ui5-message-strip>
          </furo-ui5-dynamic-page-layout>
        </furo-vertical-flex>
      </furo-vertical-flex>

      <!-- Data model of type todos.Item -->
      <furo-data-object
        type="todos.ItemEntity"
        @-object-ready="--daoToDoItem"
        ƒ-inject-raw="--responseOK"
      ></furo-data-object>

      <!-- resolves hateoas links -->
      <furo-deep-link
        service="TodosService"
        @-hts-out="--htsOut"
        ƒ-qp-in="--pageQueryChanged(*.query)"
      ></furo-deep-link>

      <!-- ToDos gRPC Service -->
      <furo-entity-agent
        service="TodosService"
        ƒ-hts-in="--htsOut"
        load-on-hts-in
        @-response="--responseOK"
        @-response-error-400="--grpcError"
        @-response-error-501="--notImplemented"
        @-response-error-502="--badGateway(*)"
        @-fatal-error="--fatalError"
      ></furo-entity-agent>

      <!-- Display a nice browser tab title and sets a navigation waypoint -->
      <furo-document-title
        prefix="Todo Management Tool"
        ƒ-set-title="--response(*.data.description)"
        ƒ-set-waypoint="--pageActivated, --pageHashChanged"
      ></furo-document-title>

      <!-- Application routing -->
      <furo-app-flow ƒ-emit="--searchRequested" event="flow-todo-list-requested"></furo-app-flow>
    `;
  }
}

window.customElements.define('view-detail-todos', ViewDetailTodos);
