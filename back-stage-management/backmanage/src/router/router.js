import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Homecomponent from '../components/home/home.vue';
import Containercomponent from '../components/home/container/container.vue';
import Logincomponent from '../components/login/login.vue';

const router=new VueRouter({
	routes :[
		{
			path:'/',
			name:'home',
			component:Homecomponent,
			children:[
				{
					path:'container',
					name:'container',
					component:Containercomponent
				}
			]
		},
		{path:'/login',name:'login',component:Logincomponent},
	]
}) 

export default router;