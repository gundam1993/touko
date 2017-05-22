import axios from 'axios'

// var AjaxWithToken = {}

const http = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

// AjaxWithToken.install = function (Vue, options) {
//   Vue.prototype.$http = http
// }

export default http
