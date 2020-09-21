import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

const success = res => res
const error = err => {
  if (err.response.status === 401) {
    window.location = '/'
  } else {
    return Promise.reject(err)
  }
}

axios.interceptors.response.use(success, error)

Vue.prototype.$axios = axios
