module.exports = {
  // config options can be found here: https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config
  //                                   https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW
  swDest: 'dist/service-worker.js',
  globDirectory: 'dist',
  cacheId: 'ToDo',
  globPatterns: ['favicon.ico', 'assets/**', 'src/configs/**', '**/*.{js,json,webmanifest}'], // , 'index.html' removed to force a initial html load
  globStrict: true,
  navigationPreload: false,
  mode: 'production',
  cleanupOutdatedCaches: true,
  // navigateFallback: 'index.html', // removed to force a initial html load
  navigateFallbackDenylist: [/^.*auth\.html$/],
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/ui5\.sap\.com/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'sap-ui5-fonts-stylesheets',
      },
    },
  ],
};
