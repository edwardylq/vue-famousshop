import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import './common/common.css';
import '../node_modules/bootstrap/dist/css/bootstrap-grid.css';
new Vue({
	el:'#app',
	router,
	render : h => h(App)
})
