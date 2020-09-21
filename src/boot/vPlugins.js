// import 'font-awesome/css/font-awesome.css'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// import BootstrapVue from 'bootstrap-vue'

// Vue.use(BootstrapVue)
import DisableAutocomplete from '@aacassandra/vue-disable-autocomplete'

Vue.use(DisableAutocomplete)

import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 960,
    lg: 1140,
    xl: Infinity
  }
})

import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
  iconPack: 'fontawesome',
  duration: 3000
})

Vue.toasted.register(
  'defaultSuccess',
  payload => !payload.msg ? 'Operação realidada com sucesso!' : payload.msg,
  { type: 'success', icon: 'check' }
)

Vue.toasted.register(
  'defaultError',
  payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
  { type: 'error', icon: 'times' }
)

import ScrollAnimation from '../directives/scrollanimation'

Vue.directive('scrollanimation', ScrollAnimation);
