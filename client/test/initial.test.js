// eslint-disable-next-line import/no-extraneous-dependencies
import { fixture, html } from '@open-wc/testing';
import { assert } from '@esm-bundle/chai'; // eslint-disable-next-line import/no-extraneous-dependencies

import '@furo/fbp/src/flow-bind.js'; // for testing with wires and hooks
import '../src/app-shell.js';

describe('app-test', () => {
  let host;
  let app;

  beforeEach(async () => {
    const testBind = await fixture(html`
      <flow-bind>
        <template>
          <app-shell style="width: 1200px"></app-shell>
        </template>
      </flow-bind>
    `);

    await testBind.updateComplete;
    host = testBind._host;
    [, app] = testBind.parentNode.children;
    await host.updateComplete;
    await app.updateComplete;
  });

  it('should be a app-shell element', done => {
    // keep this test on top, so you can recognize a wrong assignment
    assert.equal(app.nodeName.toLowerCase(), 'app-shell');
    done();
  });
});
