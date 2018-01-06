import Vue from 'vue'
import App from './components/App.vue'

if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = process.env.BASE_URL
}
axios.defaults.headers.common = {
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
}

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App)
})
