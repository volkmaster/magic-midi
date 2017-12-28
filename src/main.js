import Vue from 'vue'
import App from './components/App.vue'
import './utils/vueHelpers'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = process.env.BASE_URL
}
axios.defaults.headers.common = {
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
}

new Vue({
  el: '#app',
  render: (h) => h(App)
})
