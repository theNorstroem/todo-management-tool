import { registerIllustration } from '@ui5/webcomponents-base/dist/asset-registries/Illustrations.js';
import { i18n } from '@furo/framework/src/i18n.js';
import sceneSvg from './illus-Scene-NoSearchResults.js';
import dialogSvg from './illus-Dialog-NoSearchResults.js';
import spotSvg from './illus-Spot-NoSearchResults.js';

const name = 'NoSearchResults';
const title = i18n.t('web.core.illustration.nosearchresults.titletext');
const subtitle = i18n.t('web.core.illustration.nosearchresults.subtitletext');

registerIllustration(name, {
  dialogSvg,
  sceneSvg,
  spotSvg,
  title,
  subtitle,
});

export { dialogSvg, sceneSvg, spotSvg };
