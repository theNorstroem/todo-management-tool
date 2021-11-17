import { css, html, LitElement } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';

import '@furo/layout/src/furo-vertical-flex.js';

import '@furo/route/src/furo-app-flow.js';
import '@furo/route/src/furo-location-updater.js';
import '@furo/route/src/furo-document-title.js';

import '@furo/data/src/furo-deep-link.js';
import '@furo/data/src/furo-entity-agent.js';
import '@furo/data/src/furo-data-object.js';

import '@furo/form/src/furo-form-layouter.js';

import '@furo/ui5/src/furo-ui5-header-panel.js';
import '@furo/ui5/src/furo-ui5-data-textarea-input-labeled.js';
import '@furo/ui5/src/furo-ui5-message-strip.js';
import '@furo/ui5/src/furo-ui5-message-strip-display.js';
import '@furo/ui5/src/furo-ui5-button.js';

import '@ui5/webcomponents/dist/Title.js';
import '@ui5/webcomponents/dist/Toast.js';

import '@ui5/webcomponents-fiori/dist/ShellBar.js';
import '@ui5/webcomponents-fiori/dist/ShellBarItem.js';
import '@ui5/webcomponents-fiori/dist/Bar.js';

import '../x/layout/furo-ui5-dynamic-page-layout.js';

/**
 * Purpose: Register a new ToDos Item
 *
 * @customElement
 * @appliesMixin FBP
 */
class ViewCreateTodos extends FBP(LitElement) {
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
          icon="create"
          collapsed
          header-text="Add Todo Item"
          secondary-text="Never again forget a task"
        >
        </furo-ui5-header-panel>

        <furo-vertical-flex flex>
          <furo-ui5-dynamic-page-layout flex scroll padding>
            <furo-form-layouter>
              <!-- The message strip is a control that is used as an information bar. It contains information
                   about an object or a status and can be embedded within the detail area of an object or page. -->
              <furo-ui5-message-strip-display full></furo-ui5-message-strip-display>
              <furo-ui5-message-strip
                message="Sorry, the services for the Todo Management WebApp are currently not available. We are working on it."
                ƒ-show-error="--badGateway, --fatalError"
                ƒ-show-grpc-localized-message="--notImplemented, --grpcError"
              ></furo-ui5-message-strip>

              <!-- The ToDos register form -->
              <ui5-title level="H4" full>New Entry</ui5-title>
              <furo-ui5-data-textarea-input-labeled
                ƒ-bind-data="--daoToDoItem(*.data.description)"
              ></furo-ui5-data-textarea-input-labeled>
              <furo-ui5-data-date-picker-labeled
                ƒ-bind-data="--daoToDoItem(*.data.due_date)"
              ></furo-ui5-data-date-picker-labeled>
            </furo-form-layouter>
          </furo-ui5-dynamic-page-layout>

          <!-- The action bar -->
          <ui5-bar design="Footer">
            <furo-ui5-button design="Emphasized" slot="endContent" @-click="--registerRequested"
              >Register
            </furo-ui5-button>
          </ui5-bar>
        </furo-vertical-flex>
      </furo-vertical-flex>

      <!-- A message toast is a small, non-disruptive popup for success messages that disappears automatically after a few seconds.-->
      <ui5-toast ƒ-show="--saveOK" duration="1500">New ToDo item stored.</ui5-toast>

      <!-- Data model of type todos.ItemEntity -->
      <furo-data-object
        type="todos.ItemEntity"
        @-object-ready="--daoToDoItem"
        ƒ-init="--pageActivated, --saveOK"
      ></furo-data-object>

      <!-- resolves hateoas links -->
      <furo-deep-link
        service="TodosService"
        @-hts-out="--htsOut"
        ƒ-qp-in="--pageQueryChanged(*.query), --saveOK"
      ></furo-deep-link>

      <!-- ToDos gRPC Service -->
      <furo-entity-agent
        service="TodosService"
        ƒ-hts-in="--htsOut"
        ƒ-create="--registerRequested"
        ƒ-bind-request-data="--daoToDoItem(*.data)"
        @-response="--saveOK"
        @-response-error-400="--grpcError"
        @-response-error-501="--notImplemented"
        @-response-error-502="--badGateway(*)"
        @-fatal-error="--fatalError"
      ></furo-entity-agent>

      <!-- Display a nice browser tab title and sets a navigation waypoint -->
      <furo-document-title
        prefix="Todo Management Tool"
        title=" : Add new item"
        ƒ-set-waypoint="--pageActivated, --pageHashChanged"
      ></furo-document-title>

      <!-- Application routing -->
      <furo-app-flow ƒ-emit="--searchRequested" event="flow-todo-list-requested"></furo-app-flow>
    `;
  }
}

window.customElements.define('view-create-todos', ViewCreateTodos);
