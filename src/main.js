import Vue from 'vue'
import App from './components/App.vue'
import './utils/vueHelpers'

window.axios = require('axios')
window.axios.defaults.baseURL = 'http://localhost:5000/api'
window.axios.defaults.headers.common = {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
}

new Vue({
  el: '#app',
  render: (h) => h(App)
})
