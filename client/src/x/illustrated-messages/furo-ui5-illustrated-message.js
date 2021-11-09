import * as IllustratedMessage from '@ui5/webcomponents-fiori/dist/IllustratedMessage.js';
import IllustrationMessageType from './FuroIllustrationMessageType.js';

export class FuroUi5IllustratedMessage extends IllustratedMessage.default {
  constructor() {
    super();
    this.name = IllustrationMessageType;
  }
}
window.customElements.define('furo-ui5-illustrated-message', FuroUi5IllustratedMessage);
