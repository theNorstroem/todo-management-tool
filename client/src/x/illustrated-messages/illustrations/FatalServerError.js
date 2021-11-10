import { registerIllustration } from '@ui5/webcomponents-base/dist/asset-registries/Illustrations.js';
import { i18n } from '@furo/framework/src/i18n.js';
import sceneSvg from './illus-Scene-FatalServerError.js';
import dialogSvg from './illus-Dialog-FatalServerError.js';
import spotSvg from './illus-Spot-FatalServerError.js';

const name = 'FatalServerError';
const title = i18n.t('web.core.illustration.fatalservererror.titletext');
const subtitle = i18n.t('web.core.illustration.fatalservererror.subtitletext');

registerIllustration(name, {
  dialogSvg,
  sceneSvg,
  spotSvg,
  title,
  subtitle,
});

export { dialogSvg, sceneSvg, spotSvg };
