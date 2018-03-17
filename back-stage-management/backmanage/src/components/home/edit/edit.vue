<template>
	<div class="liedit">
		<label v-for="(val,key) in dataset" v-if="cols.indexOf(key)>-1" > <span>{{key}}:</span>
			<input type="text" :value="val" ref="lival" />
		</label>
		<p><input type="button" value="确认修改" @click="revise"/></p>
	</div>
</template>

<script>
	import './edit.scss';
	import http from '../../../utils/httpclient.js';
	import router from '../../../router/router.js';
	export default{
		data(){
			return{
				dataset:{},
				cols:[]
			}
		},
		methods:{
			revise(){
				var pro={};
				for(var i=0;i<this.$refs.lival.length;i++){
					pro['a'+i]=this.$refs.lival[i].value;
				}
				// console.log(pro);
				var api=null;
				if(this.cols.indexOf('username')>-1){
					api='editusers';
				}else{
					api='editproducts';
				}
				http.post(api,{params:JSON.stringify(pro)}).then(res=>{
					if(res.data.n==1&&res.data.nModified==1){
						if(api=='editusers'){
							router.push('user');
						}else{
							router.push('products');
						}
					}
				})
			}
		},
		
		mounted(){
			this.dataset=this.$store.state.container.edata;
			this.cols=this.$store.state.container.ecols;
			this.cols.push('_id');
		}
	}
</script> 