// see http://vuejs-templates.github.io/webpack for documentation.
var childProcess = require('child_process')
var path = require('path')
var merge = require('webpack-merge')

// const commitCount = childProcess.execSync('git rev-list HEAD --count').toString()
const versionStringFull = childProcess.execSync('git for-each-ref refs/tags --sort=-taggerdate --format=\'%(refname)\' --count=1').toString()
const version = (versionStringFull.split('/') || ['0.0.0']).pop()
  .replace(/'\s+/, '')

console.log(versionStringFull, version, version.length)

var baseEnv = {
  version: JSON.stringify(version)
}

module.exports = {
  build: {
    env: merge(
      baseEnv,
      require('./prod.env')
    ),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: merge(baseEnv,
      require('./dev.env')
    ),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
