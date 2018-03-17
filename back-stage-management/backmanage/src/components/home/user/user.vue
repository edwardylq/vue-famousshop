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
					api1:'getusers',
					api2:'delusers',
					cols:['username','pwd'],
					params:{pageno:1,qty:12}
				} 
			}
		},
		components:{
			Containercomponent
		}
	};
</script> 