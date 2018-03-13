<template>
	<div>
		<h1>container</h1>
	</div>
</template>

<script type="text/javascript">
	import spanner from '../../spinner/spinner.vue';

	export default{
		data(){
			return{
				show:false
			}
		},
		props:['config'],
		mounted(){
			console.log(this.config);
		}
	}
</script>