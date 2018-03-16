import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui'
import VueTouch from 'vue-touch'

import Login from '../components/login/Login'
import reg from '../components/register/reg.vue'
import HomePage from '../components/homepage/homepage'
import Detail from '../components/detail/detail'
import ListPage from '../components/listpage/listpage.vue'
import mj_shoppingcart from '../components/mj_shoppingcart/shoppingcart.vue'
import cart_cheackout from '../components/mj_shoppingcart/cart_cheackout.vue'
import Listdetail from '../components/listdetail/listdetail.vue'

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
               path:'/reg',
               name:'reg',
               component:reg
           },
           {
               path:'/HomePage',
               name:'HomePage',
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
              component:mj_shoppingcart,
           },
           {
              path:'/cart_cheackout/:orderno',
              name:'cart_cheackout',
              component:cart_cheackout
           },
           {
              path:'/Listdetail',
              name:'Listdetail',
              component:Listdetail,
           },
            {
              path:'/shoppingcart/:orderno',
              name:'shoppingcart',
              component:mj_shoppingcart
           },

       ]
})


export default router;