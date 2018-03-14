import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui'
import VueTouch from 'vue-touch'

import Login from '../components/login/Login'
import Register from '../components/register/register'
import HomePage from '../components/homepage/homepage'
import Detail from '../components/detail/detail'
import ListPage from '../components/listPage/listPage'
import mj_shoppingcart from '../components/shoppingcart/shoppingcart'
import cart_cheackout from '../components/shoppingcart/cart_cheackout.vue'
Vue.use(VueRouter);
Vue.use(ElementUi);
Vue.use(VueTouch, {name: 'v-touch'})

const router = new VueRouter({
       routes:[
           {
               path:'/Login',
               name:'Login',
               component:Login
           },
           {
               path:'/Register',
               name:'Register',
               component:Register
           },
           {
               path:'/homepage',
               name:'homepage',
               component:HomePage,
           },
           {
               path:'/Detail',
               name:'Detail',
               component:Detail,
           },
           {
               path:'/ListPage',
               name:'ListPage',
               component:ListPage,
           },
           {
              path:'/shoppingcart',
              name:'shoppingcart',
              component:mj_shoppingcart
           },
           {
              path:'/cart_cheackout',
              name:'cart_cheackout',
              component:cart_cheackout
           }
       ]
})


export default router;