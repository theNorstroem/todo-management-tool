import proxy from 'koa-proxies';


export default {

  plugins: [],
  port: 8480,
  hostname: 'localhost',
  rootDir:'dist',
  appIndex: 'dist/index.html',
  http2: false,
  nodeResolve: true,
  preserveSymlinks: true,
  open: true,
  debug: true,

  middlewares: [
    proxy('/api/', {
      target: 'http://127.0.0.1:8481/',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api\//, '/'),
    }),
  ],
};
