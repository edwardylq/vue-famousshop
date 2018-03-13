<template>
	<div class="manage">
        <ul class="li_item_box" @click="getproduct">
            <li class="li_item"><router-link to="products">商品管理</router-link></li>
            <li class="li_item"><router-link to="user">用户管理</router-link></li>
            <li class="li_item"><router-link to="order">订单管理</router-link></li>
        </ul>    
	</div>
</template>

<script type="text/javascript">
	import './nav.scss';
	import http from 'axios';
	export default{
		methods:{
			getproduct(e){
				for(var i=0;i<e.target.parentElement.parentElement.children.length;i++){
					e.target.parentElement.parentElement.children[i].classList.remove('active');
				}
				e.target.parentElement.classList.add('active');
			}
		}
	}
</script>