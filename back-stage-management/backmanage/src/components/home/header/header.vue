<template>
	<div class="h_header">
		<h1>网 站 后 台 管 理 系 统</h1>
		<p>
			<i></i>
			<span>当前用户 : <b>{{litoken}}</b></span>
			<input type="button" value="退出" @click="dropout"/>
		</p>
		<div  class="language">
        <select v-model="$store.state.container.lanType">
            <option value="en">en</option>
            <option value="cn">cn</option>
        </select>
    	</div>
	</div>
</template>

<script type="text/javascript">
	import './header.scss';
	import http from '../../../utils/httpclient.js';
	import jwt from 'jsonwebtoken';
	import router from '../../../router/router.js';
	export default{
		data(){
		  return{
		    litoken:null
		  }
		},
		mounted(){
	      var token=window.sessionStorage.getItem('liuser');
	      if(token){
	        token = jwt.verify(token,'secret',(error,result)=>{
		            if(error){
		            	router.push('/login');
		            }else{
		            	return result.name;
		            }
	        	})
		   }
		   this.litoken=token;
		   if(this.litoken==null){
		   		router.push('/login');
		   }
		   console.log(this.litoken);
	    },
	    methods:{
	    	dropout(){
	    		window.sessionStorage.removeItem('liuser');
	    		var token=window.sessionStorage.getItem('liuser');
		   		this.litoken=token;
		   		if(this.litoken==null){
		   			router.push('/login');
		   		}
		   		// console.log(this.litoken);
	    	}
	    }
	}
</script>