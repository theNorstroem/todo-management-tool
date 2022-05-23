// Initialize application env, theme, api
import { Init, i18n, Env } from '@furo/framework/src/furo.js';

// SAP UI5 custom inits
// import './ui5Init.js';

/**
 * Use the installed spec if you finally have a separate spec project (recommended)
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Services, Types } from './env.js';

/**
 * Import custom icon set
 */
import './iconset.js';

/**
 * Register resource bundle i18n
 */
import { Translations } from './translations.js';

/**
 * Use the installed spec if you finally have a separate spec project (recommended)
 */

/**
 * Register the available types (only needed if you work with @furo/data... components  )
 */
Init.registerApiServices(Services);
Init.registerApiTypes(Types);

// this language config will overwrite the language config in index.html

Env.locale = 'en';

/**
 * register the API prefix based on the APPROOT.
 * This information is used for furo-deep-link and furo-reverse-deep-link to resolve the api address.
 *
 * We use /api here, because we do not have a dedicated host like api.xxx.com for the api services
 * @type {string}
 */
Env.api.prefix = `${window.APPROOT}/api`;

// -- ST4 translations Intl methods
i18n.t = key => {
  const b = i18n.resbundle[Env.locale.toLowerCase().replace('-', '_')] || i18n.resbundle.de_ch;

  if (b === undefined) {
    // eslint-disable-next-line no-console
    console.warn(`No resource bundle with locale ${Env.locale} exists.`);
    return '';
  }

  const res = key.split('.').reduce((acc, part) => acc && acc[part], b);
  return res || `${key}**`;
};

i18n.n = (key, num) => {
  let t = i18n.resbundle[Env.locale.toLowerCase().replace('-', '_')] || i18n.resbundle.de_ch;

  if (t === undefined) {
    // eslint-disable-next-line no-console
    console.warn(`No resource bundle with locale ${Env.locale} exists.`);
    return '';
  }

  const p = key.split('.');
  for (let i = 0; i < p.length; i += 1) {
    if (t[p[i]]) {
      t = t[p[i]];
    } else {
      // eslint-disable-next-line no-console
      console.warn('key does not exist', key);
      return '';
    }
  }

  if (t) {
    if (num === 1) {
      if (t.one) {
        return t.one(num);
      }
      // eslint-disable-next-line no-console
      console.warn('key does not exist', `${key}.one`);
      return num;
    }
    if (num > 1) {
      if (t.many) {
        return t.many(num);
      }
      // eslint-disable-next-line no-console
      console.warn('key does not exist', `${key}.many`);
      return num;
    }
    if (t.none) {
      return t.none(num);
    }
    // eslint-disable-next-line no-console
    console.warn('key does not exist', `${key}.none`);
    return num;
  }
  return '';
};

/**
 * Register ST4 translation module
 */
i18n.registerResBundle(Translations);

/**
 * Grap URL parameters for
 * - theming
 * - language
 * @type {string}
 */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

/**
 * UI language
 * @type {string|string}
 */
let locale = urlParams.get('sap-ui-language') || navigator.language || 'en';
Env.locale = locale;

/**
 * Translate static messages in SPEC
 */
if (i18n.resbundle[Env.locale.toLowerCase().replace('-', '_')]) {
  locale = Env.locale.toLowerCase().replace('-', '_');
}

Init.translateStaticTypeMessages(locale);

/**
 * Apply the prefix to all service deeplinks and to all furo.Reference types with defaults
 */
Init.applyCustomApiPrefixToServicesAndTypes(Env.api.prefix);
