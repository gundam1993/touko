const pkg = require('./package')
const resolve = require('path').resolve
console.log(__dirname)
const config = require('config-lite')({
  config_basedir: __dirname,
  config_dir: 'server/config'
})
module.exports = {
  mode: 'universal',
  srcDir: 'views/',
  /*
  ** Headers of the page
  */
  cache: {
    max: 500,
    maxAge: 900000
  },
  head: {
    title: '\\Tommy.H\\',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes' },
      { hid: 'description', name: 'description', content: pkg.description },
      {metaname: 'x5-orientation', content: 'portrait'}
    ],
    script: [],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    baseUrl: config.baseUrl
  },
  /*
  ** Global CSS
  */
  css: ['~assets/css/main.css', '~assets/css/highlight.min.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: false,

 /*
  ** Plugins to load before mounting the App
  */
  plugins: [],
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  router: {
    extendRoutes (routes) {
      routes.push({
        name: 'homepagePostPage',
        path: '/post/:postId',
        component: resolve(__dirname, 'views/pages/post')
      })
    }
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: config.baseURL
  },
  render: {
    resourceHints: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: [],
    analyze: false,
    extend (config, {isDev, isServer}) {
      // Run ESLint on save
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (isServer) {}
    }
  }
}
