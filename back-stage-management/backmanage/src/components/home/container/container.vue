<template>
	<div class="libackmanage">
		<p v-if="findpro" class="lifindpro">
			<select class="lifindpro_select" ref="li_select">
				<option v-for="(val,idx) in config.cols" :value="val">{{val}}</option>
			</select>
			<input type="text" class="lifindpro_entry" ref="li_entry">
			<input type="button" value="搜索" class="lifindpro_search" @click="fuzzysearch">
		</p>
		<table class="table table-striped" v-if="dictionary[$store.state.container.lanType]">
            <thead>
                <tr>
                    <th v-for="(val, key) in dataset[0]" v-if="config.cols.indexOf(key) > -1" :class="'li'+key">
                        {{dictionary[$store.state.container.lanType][key] || key}} 
                    </th>
                    <th>{{dictionary[$store.state.container.lanType].manage}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj, idx) in dataset" :class="idx%2!= 0 ?'tractive' : 'aa'">
                    <td v-for="(val, key) in obj" v-if="config.cols.indexOf(key) > -1" :class="'litd'+key">{{val}}</td>
                    <td>
                    	<input type="button" value="编辑" class="_edit" :data-id="obj._id" @click="edit(obj._id)"/>
                    	<input type="button" value="删除" class="_del" :data-id="obj._id" @click="del(obj._id)"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="lipageno">
        	<input type="button" v-for="i in pageno" :value="i" :class=" i ==1 ? 'lipagenocolor' : false" @click="skip">
        	<input type="button" v-for="i in searchpageno" :value="i" :class=" i ==1 ? 'lipagenocolor' : false" v-if="search" 
        	@click="searchskip">
        	<input type="button" @click="searchout" value="退出" v-if="search">
        	<button class="_liadd" @click="add">添加</button>
        </p>
        <spanner v-if="show"></spanner>	
	</div>
</template>
 
<script type="text/javascript">
	import spanner from '../../spinner/spinner.vue';
	import http from '../../../utils/httpclient.js';
	import './container.scss';
	import router from '../../../router/router.js';

	export default{
		data(){
			return{
				show:false,
				dataset:[],
				pageno:null,
				dictionary:{},
				findpro:false,
				search:false,
				searchpageno:0,
				searchdataset:[]
			}
		},
		components:{spanner},
		props:['config'],
		mounted(){
			// console.log(this.config);
			this.show=true;
			this.pageno == 0 ? this.search=true  : this.search=false;
			this.findpro = this.config.findpro ||false;
			http.post(this.config.api1,{params:JSON.stringify(this.config.params)||"aa"}).then(res=>{
				// console.log(res);
				this.dataset=res.data.data;
				console.log(this.dataset);
				console.log(this.config);
				this.pageno=res.data.message;
				this.show=false;
			})

			http.get('http://10.3.136.7:2880/src/dictionary/common.txt').then(res=>{
                this.dictionary=res.data;
            })
		},
		methods:{
			skip(e){
				this.show=true;
				for(var i=0;i<e.target.parentElement.children.length;i++){
					e.target.parentElement.children[i].classList.remove('lipagenocolor');
				}
				e.target.classList.add('lipagenocolor');
				var qty=null;
				if(this.config.cols.indexOf('username')>-1){
					qty=12;
				}else{
					qty=6;
				}
				http.post(this.config.api1,{params:JSON.stringify({pageno:e.target.value || 1,qty})||"aa"}).then(res=>{
					// console.log(res);
					this.dataset=res.data.data;
					this.pageno=res.data.message;
					this.show=false;
				})
			},
			del(objid){
				var id=objid;
				var len=this.dataset.length;
				http.post(this.config.api2,{id:objid}).then(res=>{
					for(var i=0;i<len;i++){
						if(this.dataset[i]._id ==id){
							this.dataset.splice(i,1);
							break;
						}
					}
				})
			},
			edit(objid){
				var id=objid;
				for(var i=0;i<this.dataset.length;i++){
					if(this.dataset[i]._id ==id){
						var edit=this.dataset[i];
						break;
					}
				}
				this.$store.state.container.edata=edit;
				this.$store.state.container.ecols=this.config.cols;
				router.push('edit');
			},
			add(){
				this.$store.state.container.ecols=this.config.cols;
				router.push('add');
			},
			fuzzysearch(){
				var obj={};
				obj[this.$refs.li_select.value]=this.$refs.li_entry.value;
				console.log(obj);
				if(this.$refs.li_entry.value.trim()!=''){
					http.get('product',obj).then(res=>{
						this.searchdataset=res.data.data;
						this.dataset=res.data.data.slice(0,6);
						this.pageno=0;
						this.search=true;
						this.searchpageno=Math.ceil(res.data.data.length/6);
					})
				}
			},
			searchskip(e){
				for(var i=0;i<e.target.parentElement.children.length;i++){
					e.target.parentElement.children[i].classList.remove('lipagenocolor');
				}
				e.target.classList.add('lipagenocolor');
				this.dataset=this.searchdataset.slice((e.target.value-1)*6,e.target.value*6);	
			},
			searchout(){
				window.location.reload();
			}
		}
	} 
</script> 