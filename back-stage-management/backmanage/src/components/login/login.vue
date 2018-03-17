<template>
	<div class="libigbox">
	<div class="loginbox">
		<h2>后台管理系统登录平台</h2>
		<div class="inputbox">
		<label>用户名:<input type="text" ref="liuser"></label>
		<label>密 码:<input type="password" ref="lipwd"></label>
		</div>
		<input type="button" value="登录" class="btn" @click="login">
	</div>
	</div>
</template>

<script type="text/javascript">
	import './login.css';
	import http from '../../utils/httpclient.js';
	import router from '../../router/router.js';
	export default{
		methods:{
			login(){
				http.post('backlogin',{username:this.$refs.liuser.value,password:this.$refs.lipwd.value}).then(res=>{
					// console.log(res);
					if(res.data.status){
						window.sessionStorage.setItem('liuser',res.data.data);
						router.push('/');
					}else{
						window.alert('用户名不存在或密码错误');
						this.$refs.liuser.value='';
						this.$refs.lipwd.value='';
					}
				})
			}
		}
	}
</script> 