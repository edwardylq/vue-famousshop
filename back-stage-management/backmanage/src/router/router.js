import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Homecomponent from '../components/home/home.vue';
import Logincomponent from '../components/login/login.vue';
import Ordercomponent from '../components/home/order/order.vue';
import Usercomponent from '../components/home/user/user.vue';
import Productcomponent from '../components/home/product/products.vue';

const router=new VueRouter({
	routes :[
		{
			path:'/',
			name:'home',
			component:Homecomponent,
			children:[
				{
					path:'order',
					name:'order',
					component:Ordercomponent
				},
				{
					path:'user',
					name:'user',
					component:Usercomponent
				},
				{
					path:'products',
					name:'products',
					component:Productcomponent
				}
			]
		},
		{path:'/login',name:'login',component:Logincomponent},
	]
}) 

export default router;