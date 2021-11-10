import { registerIllustration } from '@ui5/webcomponents-base/dist/asset-registries/Illustrations.js';
import { i18n } from '@furo/framework/src/i18n.js';
import sceneSvg from './illus-Scene-ProcessCompleted.js';
import dialogSvg from './illus-Dialog-ProcessCompleted.js';
import spotSvg from './illus-Spot-ProcessCompleted.js';

const name = 'ProcessCompleted';
const title = i18n.t('web.core.illustration.process.completed.titletext');
const subtitle = i18n.t('web.core.illustration.process.completed.subtitletext');

registerIllustration(name, {
  dialogSvg,
  sceneSvg,
  spotSvg,
  title,
  subtitle,
});

export { dialogSvg, sceneSvg, spotSvg };
