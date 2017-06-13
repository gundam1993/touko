const resolve = require('path').resolve
const config = require('config-lite')

module.exports = {
  /*
  ** Headers of the page
  */
  srcDir: 'views/',
  head: {
    title: '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
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
  ** Build configuration
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
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
