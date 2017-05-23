import axios from 'axios'
import Vue from 'vue'

var Http = {}

const http = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

Http.install = function (Vue, options) {
  Vue.prototype.$http = http
}

Vue.use(Http)
