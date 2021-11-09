import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';
import { registerThemePropertiesLoader } from '@ui5/webcomponents-base/dist/asset-registries/Themes.js';

setTheme('sap_fiori_3');

const loadThemeProperties = async themeName => {
  switch (themeName) {
    case 'sap_belize':
      return (
        await import(
          '@ui5/webcomponents-theme-base/dist/generated/themes/sap_belize/parameters-bundle.css.js'
        )
      ).default;
    case 'sap_belize_hcb':
      return (
        await import(
          '@ui5/webcomponents-theme-base/dist/generated/themes/sap_belize_hcb/parameters-bundle.css.js'
        )
      ).default;
    case 'sap_belize_hcw':
      return (
        await import(
          '@ui5/webcomponents-theme-base/dist/generated/themes/sap_belize_hcw/parameters-bundle.css.js'
        )
      ).default;
    case 'sap_fiori_3_dark':
      return (
        await import(
          '@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3_dark/parameters-bundle.css.js'
        )
      ).default;
    case 'sap_fiori_3_hcb':
      return (
        await import(
          '@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3_hcb/parameters-bundle.css.js'
        )
      ).default;
    case 'sap_fiori_3_hcw':
      return (
        await import(
          '@ui5/webcomponents-theme-base/dist/generated/themes/sap_fiori_3_hcw/parameters-bundle.css.js'
        )
      ).default;
    default:
      // eslint-disable-next-line no-throw-literal
      throw 'unknown theme';
  }
};

const loadAndCheck = async themeName => {
  const data = await loadThemeProperties(themeName);
  if (typeof data === 'string' && data.endsWith('.json')) {
    throw new Error(
      `[themes] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use 'import ".../Assets-static.js"'. Check the "Assets" documentation for more information.`,
    );
  }
  return data;
};

[
  'sap_belize',
  'sap_belize_hcb',
  'sap_belize_hcw',
  'sap_fiori_3_dark',
  'sap_fiori_3_hcb',
  'sap_fiori_3_hcw',
].forEach(themeName =>
  registerThemePropertiesLoader('@ui5/webcomponents', themeName, loadAndCheck),
);
