const resolve = require('path').resolve

module.exports = {
  /*
  ** Headers of the page
  */
  srcDir: 'views/',
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
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
  plugins: ['~plugins/vuetify', '~plugins/ajaxWithToken'],
  transition: {
    name: 'fade',
    mode: 'out-in'
  },
  router: {
    middleware: 'loginCheck',
    extendRoutes (routes) {
      routes.push({
        name: 'editPostPage',
        path: '/admin/post/:postId/edit',
        component: resolve(__dirname, 'views/pages/admin/posts/edit')
      })
      routes.push({
        name: 'editPost',
        path: '/admin/post/:postId',
        component: resolve(__dirname, 'views/pages/admin/posts/post')
      })
    }
  },
  build: {
    vendor: ['axios', 'marked', 'highlight.js'],
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
