import Vue from 'vue'

Vue.filter('capitalize', (value) => value[0].toUpperCase() + value.slice(1))
Vue.filter('uppercase', (value) => value.toUpperCase())
Vue.directive('focus', { inserted: (el) => el.focus() })
Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    let delay = 0 // delay to let Vue evaluate v-if directive
    el.event = (event) => {
      if (++delay > 1) {
        if (!(el === event.target || el.contains(event.target))) {
          vnode.context[binding.expression](event)
        }
      }
    }
    document.body.addEventListener('click', el.event)
  },
  unbind (el) {
    document.body.removeEventListener('click', el.event)
  },
})
