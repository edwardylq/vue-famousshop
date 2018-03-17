<template>
	<div class="liadd">
		<label v-for="(val,idx) in cols"> <span>{{val}}:</span>
			<input type="text" ref="lival" />
		</label>
		<p><input type="button" value="确认" @click="add"/></p>
	</div>
</template>
<script>
	import './add.scss';
	import http from '../../../utils/httpclient.js';
	import router from '../../../router/router.js';
	export default{
		data(){
			return {
				cols:[]
			}
		},
		mounted(){
			this.cols=this.$store.state.container.ecols;
		},
		methods:{
			add(){
				var pro={};
				for(var i=0;i<this.$refs.lival.length;i++){
					pro[this.cols[i]]=this.$refs.lival[i].value;
				}
				console.log(pro);
				var api=null;
				if(this.cols.indexOf('username')>-1){
					api='addusers';
				}else{
					api='addproducts';
				}
				http.post(api,{params:JSON.stringify(pro)}).then(res=>{
					console.log(res);
					if(res.data.result.ok==1&&res.data.result.n==1){
						if(api=='addusers'){
							router.push('user');
						}else{
							router.push('products');
						}
					}
				})
			}
		}
	}
</script>