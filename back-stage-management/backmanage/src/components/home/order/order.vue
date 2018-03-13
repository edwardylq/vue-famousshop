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
					api:'',
					cols:[],
					params:{}
				}
			}
		},
		components:{
			Containercomponent
		}
	};
</script>