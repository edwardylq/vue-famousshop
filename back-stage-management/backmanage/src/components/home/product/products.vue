<template>
	<div>
		<Containercomponent :config="config"></Containercomponent>
	</div>
</template>

<script>
	import Containercomponent from '../container/container.vue';

	export default{
		data(){
			return{
				config:{
					api1:'getproducts',
					api2:'delproducts',
					cols:['name','price','discounts','barand','url','sales','type','style','qty'],
					params:{pageno:1,qty:6},
					findpro:true
				}
			}
		},
		components:{
			Containercomponent
		}
	}; 
</script>