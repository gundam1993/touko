import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    noticeDisplay: false,
    noticeInfo: ''
  },
  mutations: {
    noticeOn (state) {
      state.noticeDisplay = true
    },
    noticeOff (state) {
      state.noticeDisplay = false
    },
    noticeChange (state, payload) {
      state.noticeInfo = payload.msg
    }
  }
})

export default store
