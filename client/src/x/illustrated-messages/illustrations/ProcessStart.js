import { registerIllustration } from '@ui5/webcomponents-base/dist/asset-registries/Illustrations.js';
import { i18n } from '@furo/framework/src/i18n.js';
import sceneSvg from './illus-Scene-ProcessStart.js';
import dialogSvg from './illus-Dialog-ProcessStart.js';
import spotSvg from './illus-Spot-ProcessStart.js';

const name = 'ProcessStart';
const title = i18n.t('web.core.illustration.process.start.titletext');
const subtitle = i18n.t('web.core.illustration.process.start.subtitletext');

registerIllustration(name, {
  dialogSvg,
  sceneSvg,
  spotSvg,
  title,
  subtitle,
});

export { dialogSvg, sceneSvg, spotSvg };
