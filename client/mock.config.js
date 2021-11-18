module.exports = {
  mockDir: './mock/',
  basePath: '',
  path: {
    '/todos': 1,
    '/todos/{tdi}': 0,
  },
  /**
    * Proxy [Object]: {path: Object} Set the proxy rule, keys are the path for matching, the value should a object to set the detail matching rules.
    * @path [string]: Path that matching, can use glob pattern for matching.
    *   Example:
    *     '/api': matches paths starting with /api
    *     '**': matches any path
    *     '/api/*.html': matches any path ending with .html in the path of /api
    *     '/api/**': matches any path starting with /api
    * @path.target [string]: set the target host. The scheme is necessary (such as 'http://' or 'http://'), even if the target is a IP address, it should write with the shcema.
    * @path.debug [Boolean]: whether print Http headers or not. default false
    * @path.headers [Object]: set fields in the request headers.
    * @path.headers.cookie [String]: set the cookie field in the request headers
    * @path.headers.host [String]: set the host field in the request headers
    */
 proxy: {}
 }
