import { registerIllustration } from '@ui5/webcomponents-base/dist/asset-registries/Illustrations.js';
import { i18n } from '@furo/framework/src/i18n.js';
import sceneSvg from './illus-Scene-NoData.js';
import dialogSvg from './illus-Dialog-NoData.js';
import spotSvg from './illus-Spot-NoData.js';

const name = 'NoData';
const title = i18n.t('web.core.illustration.nodata.titletext');
const subtitle = i18n.t('web.core.illustration.nodata.subtitletext');

registerIllustration(name, {
  dialogSvg,
  sceneSvg,
  spotSvg,
  title,
  subtitle,
});

export { dialogSvg, sceneSvg, spotSvg };
