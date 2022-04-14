import { css, html, LitElement } from 'lit';
import { FBP } from '@furo/fbp/src/fbp.js';

import '@furo/layout/src/furo-vertical-flex.js';
import '@furo/layout/src/furo-form-layouter.js';

import '@furo/route/src/furo-app-flow.js';
import '@furo/route/src/furo-location-updater.js';
import '@furo/route/src/furo-document-title.js';

import '@furo/data/src/furo-deep-link.js';
import '@furo/data/src/furo-entity-agent.js';
import '@furo/data/src/furo-data-object.js';

import '@furo/ui5/src/furo-ui5-header-panel.js';
import '@furo/ui5/src/furo-ui5-typerenderer-labeled.js';
import '@furo/ui5/src/furo-ui5-message-strip.js';
import '@furo/ui5/src/furo-ui5-message-strip-display.js';
import '@furo/ui5/src/furo-ui5-section.js';
import '@furo/ui5/src/furo-ui5-subsection.js';
import '@furo/ui5/src/furo-ui5-button.js';
import '@furo/ui5/src/furo-ui5-date-picker-labeled.js';
import '@furo/ui5/src/furo-ui5-text-input-labeled.js';

import '@ui5/webcomponents/dist/Title.js';
import '@ui5/webcomponents/dist/Toast.js';

import '@ui5/webcomponents-fiori/dist/ShellBar.js';
import '@ui5/webcomponents-fiori/dist/ShellBarItem.js';
import '@ui5/webcomponents-fiori/dist/Bar.js';

/**
 * Purpose: Update a new ToDos Item
 *
 * @customElement
 * @appliesMixin FBP
 */
class ViewUpdateTodos extends FBP(LitElement) {
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

        <furo-ui5-header-panel icon="edit" collapsed ƒ-bind-header-text="--daoToDoItem(*.data.id)">
        </furo-ui5-header-panel>

        <!-- The message strip is a control that is used as an information bar. It contains information
             about an object or a status and can be embedded within the detail area of an object or page. -->
        <furo-ui5-message-strip-display class="padding-lr"></furo-ui5-message-strip-display>
        <furo-ui5-message-strip
          message="Sorry, the services for the Todo Management WebApp are currently not available. We are working on it."
          ƒ-show-error="--badGateway, --fatalError"
          ƒ-show-grpc-localized-message="--notImplemented, --grpcError"
        ></furo-ui5-message-strip>

        <furo-vertical-flex flex>
          <furo-ui5-section flex scroll>
            <furo-ui5-subsection heading="Update Entry">
              <furo-form-layouter>
                <!-- The ToDos register form -->
                <furo-ui5-textarea-input-labeled
                  ƒ-bind-data="--daoToDoItem(*.data.description)"
                ></furo-ui5-textarea-input-labeled>
                <furo-ui5-date-picker-labeled
                  ƒ-bind-data="--daoToDoItem(*.data.due_date)"
                ></furo-ui5-date-picker-labeled>
              </furo-form-layouter>
            </furo-ui5-subsection>
          </furo-ui5-section>

          <!-- The action bar -->
          <ui5-bar design="Footer">
            <furo-ui5-button design="Emphasized" slot="endContent" @-click="--registerRequested"
              >Update
            </furo-ui5-button>
          </ui5-bar>
        </furo-vertical-flex>
      </furo-vertical-flex>

      <!-- A message toast is a small, non-disruptive popup for success messages that disappears automatically after a few seconds.-->
      <ui5-toast ƒ-show="--responseOK">ToDo item saved.</ui5-toast>

      <!-- Data model of type todos.Item -->
      <furo-data-object
        type="todos.ItemEntity"
        @-object-ready="--daoToDoItem"
        ƒ-inject-raw="--getResponseOK"
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
        ƒ-save="--registerRequested"
        ƒ-bind-request-data="--daoToDoItem(*.data)"
        @-load-success="--getResponseOK"
        @-save-success="--responseOK"
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

window.customElements.define('view-update-todos', ViewUpdateTodos);
