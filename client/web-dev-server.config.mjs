import proxy from 'koa-proxies';
import rollupJson from "@rollup/plugin-json";
import { fromRollup } from '@web/dev-server-rollup';
const json = fromRollup(rollupJson);

export default {
  mimeTypes: {
    '**/*.json': 'js',
    '**/*.module.css': 'js',
  },
  plugins: [json({})],
  port: 8480,
  http2: false,
  watch: true,
  nodeResolve: true,
  appIndex: 'index.html',
  preserveSymlinks: true,
  open: true,
  debug: true,
  rootDir: './',
  middlewares: [
    proxy('/api/', {
      target: 'http://127.0.0.1:8481/',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api\//, '/'),
    }),
  ],
};
