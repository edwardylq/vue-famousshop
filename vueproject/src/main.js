// import '../src/assets/bootstrap-4.0.0/dist/css/bootstrap.css'
import './common/base.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})