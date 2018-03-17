import Vue from 'vue';
import Vuex from 'vuex';
import container from '../components/home/container/container.js';
Vue.use(Vuex);
const store=new Vuex.Store({
	modules:{
		container
	}
})
export default store;