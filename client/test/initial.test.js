// eslint-disable-next-line import/no-extraneous-dependencies
import { fixture, html } from '@open-wc/testing';
import '../src/app-shell.js';

describe('app-test', () => {
  let app;
  let mainStage;

  beforeEach(async () => {
    app = await fixture(html` <app-shell style="width: 1200px"></app-shell> `);

    mainStage = app.shadowRoot.querySelector('main-stage');
    await mainStage.updateComplete;
  });

  it('should start with the default page, because the test suite url make no sense for the app', done => {
    done();
  });
});
