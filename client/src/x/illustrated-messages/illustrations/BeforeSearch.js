import { registerIllustration } from '@ui5/webcomponents-base/dist/asset-registries/Illustrations.js';
import { i18n } from '@furo/framework/src/i18n.js';
import sceneSvg from './illus-Scene-BeforeSearch.js';
import dialogSvg from './illus-Dialog-BeforeSearch.js';
import spotSvg from './illus-Spot-BeforeSearch.js';

const name = 'BeforeSearch';
const title = i18n.t('web.core.illustration.beforesearch.titletext');
const subtitle = i18n.t('web.core.illustration.beforesearch.subtitletext');

registerIllustration(name, {
  dialogSvg,
  sceneSvg,
  spotSvg,
  title,
  subtitle,
});

export { dialogSvg, sceneSvg, spotSvg };
