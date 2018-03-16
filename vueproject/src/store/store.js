import Vue from 'vue'
import Vuex from 'vuex'
// import httpClient from '../httpClient/httpClient'
import listpage from '../components/listpage/listpage.js'
console.log(listpage);
Vue.use(Vuex);

var store = new Vuex.Store({
    modules:{
        listpage,
    }
})

export default store;