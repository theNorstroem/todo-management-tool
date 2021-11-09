import { registerIllustration } from '@ui5/webcomponents-base/dist/asset-registries/Illustrations.js';
import { i18n } from '@furo/framework/src/i18n.js';
import sceneSvg from './illus-Scene-NotFound404.js';
import dialogSvg from './illus-Dialog-NotFound404.js';
import spotSvg from './illus-Spot-NotFound404.js';

const name = 'NotFound404';
const title = i18n.t('web.core.illustration.notfound404.titletext');
const subtitle = i18n.t('web.core.illustration.notfound404.subtitletext');

registerIllustration(name, {
  dialogSvg,
  sceneSvg,
  spotSvg,
  title,
  subtitle,
});

export { dialogSvg, sceneSvg, spotSvg };
