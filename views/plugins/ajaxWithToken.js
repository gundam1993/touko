import Vue from 'vue'
import axios from 'axios'

var AjaxWithToken = {}

AjaxWithToken.install = function (Vue, options) {
  Vue.prototype.$awtGet = function (path) {
    let token = localStorage['touko-blog-token']
    return axios({
      method: 'get',
      url: path,
      headers: {'x-access-token': token}
    })
  }
  Vue.prototype.$awtPost = function (path, data) {
    let token = localStorage['touko-blog-token']
    return axios({
      method: 'post',
      url: path,
      headers: {'x-access-token': token},
      data: data
    })
  }
}

Vue.use(AjaxWithToken)
