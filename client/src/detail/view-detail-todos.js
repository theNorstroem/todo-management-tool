import { css, html, LitElement } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';

import '@furo/layout/src/furo-vertical-flex.js';
import '@furo/layout/src/furo-form-layouter.js';

import '@furo/route/src/furo-app-flow.js';
import '@furo/route/src/furo-location-updater.js';
import '@furo/route/src/furo-document-title.js';

import '@furo/data/src/furo-deep-link.js';
import '@furo/data/src/furo-reverse-deep-link.js';
import '@furo/data/src/furo-entity-agent.js';
import '@furo/data/src/furo-data-object.js';

import '@furo/ui5/src/furo-ui5-header-panel.js';
import '@furo/ui5/src/furo-ui5-message-strip.js';
import '@furo/ui5/src/furo-ui5-message-strip-display.js';
import '@furo/ui5/src/furo-ui5-typerenderer-labeled.js';
import '@furo/ui5/src/furo-ui5-button.js';
import '@furo/ui5/src/furo-ui5-section.js';
import '@furo/ui5/src/furo-ui5-subsection.js';

import '@ui5/webcomponents/dist/Title.js';

import '@ui5/webcomponents-fiori/dist/ShellBar.js';
import '@ui5/webcomponents-fiori/dist/ShellBarItem.js';

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

      .padding {
        padding: var(--FuroUi5MediaSizeIndentation, 0.625rem 2rem 0 2rem);
      }

      .padding-lr {
        padding-left: var(--FuroUi5MediaSizeIndentationLeft, 2rem);
        padding-right: var(--FuroUi5MediaSizeIndentationRight, 2rem);
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
            @-click="--searchRequested"
          ></ui5-shellbar-item>
        </ui5-shellbar>

        <furo-ui5-header-panel icon="task" ƒ-bind-header-text="--daoToDoItem(*.data.id)">
          <furo-ui5-button slot="action" design="Emphasized" @-click="--requestObjUpdate(toDoHTS)"
            >Edit</furo-ui5-button
          >
        </furo-ui5-header-panel>

        <!-- The message strip is a control that is used as an information bar. It contains information
                   about an object or a status and can be embedded within the detail area of an object or page. -->
        <furo-ui5-message-strip-display class="padding-lr"></furo-ui5-message-strip-display>
        <furo-ui5-message-strip
          message="Sorry, the GetTodo services are currently not available. We are working on it."
          ƒ-show-error="--badGateway, --fatalError"
          ƒ-show-grpc-localized-message="--notImplemented, --grpcError"
        ></furo-ui5-message-strip>

        <furo-vertical-flex flex>
          <furo-ui5-section flex scroll>
            <furo-ui5-subsection heading="ToDo Item Detail">
              <furo-form-layouter two>
                <furo-ui5-typerenderer-labeled
                  ƒ-bind-data="--daoToDoItem(*.data.id)"
                ></furo-ui5-typerenderer-labeled>
                <furo-ui5-typerenderer-labeled
                  ƒ-bind-data="--daoToDoItem(*.data.description)"
                ></furo-ui5-typerenderer-labeled>
                <furo-ui5-typerenderer-labeled
                  ƒ-bind-data="--daoToDoItem(*.data.due_date)"
                ></furo-ui5-typerenderer-labeled>
              </furo-form-layouter>
            </furo-ui5-subsection>
          </furo-ui5-section>
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
        @-hts-out="--htsOut, ((toDoHTS))"
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

      <!-- Required to create query params based on the set data record. -->
      <furo-reverse-deep-link
        rel="self"
        service="TodosService"
        @-converted="--queryParams"
        ƒ-convert="--requestObjUpdate"
      ></furo-reverse-deep-link>

      <!-- Application routing -->
      <furo-app-flow event="flow-todo-list-requested" ƒ-emit="--searchRequested"></furo-app-flow>
      <furo-app-flow event="flow-update-todo-requested" ƒ-emit="--queryParams"></furo-app-flow>
    `;
  }
}

window.customElements.define('view-detail-todos', ViewDetailTodos);
