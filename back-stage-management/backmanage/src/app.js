import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import './common/common.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.css';
import store from './store/store.js';
var vm=new Vue({
	el:'#app',
	router,
	store,
	render : h => h(App)
})
