<template>
    <div id="listdetail">
        <div id="liheader">
            <div class="hl iconfont icon-zuojiantou"></div>
            <div class="hh">
                <input type="text" placeholder="输入关键字搜索"/>
                <!-- <button class="cha iconfont icon-cha"></button> -->
                 <button class="ser iconfont icon-search2" @click="lisearch"></button>
            </div>
        <div class="hl iconfont icon-iconfontcaidan"></div> 
        <div class="hl iconfont icon-more"></div> 
        </div>
        <div id="linav">
            <span class="zonghe" @click="normal">综合</span>
            <span class="xiaolian" @click="qtysort">销量</span>
            <span class="jiage" @click="pricesort">价格</span>
        </div>
        <div id="canshu">
            <span class="sel">已选：</span>
            <span class="style" @click="selstyle">{{style}}</span>
            <span class="type" @click="seltype">{{type}}</span>
        </div>
        <ul id="goodlist">
            <li v-for="(obj,idx) in dataset" :dataId="obj._id" @click="xsearch(obj._id)" :key="obj._id">
                <p class="pic"><img :src="'/src/assets/back-stage-images.shop/'+obj.url"/></p>
                <p class="con">
                    <span>{{obj.name}} {{obj.type}} {{obj.style}}</span>
                    <span><b>￥{{obj.price}}</b><del>￥{{obj.discounts}}</del><i>月销量:{{obj.qty}}件</i></span>
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
    import './listicon.css'
    import './listdetail.scss'
    import http from '../../httpClient/httpClient.js'
    export default{
            data(){
                return {
                    style:'',
                    type:'',
                    name:'',
                    dataset:[],
                }
            },
        mounted(){
             this.style=sessionStorage.getItem('style');
             this.type=sessionStorage.getItem('type');
             this.name=this.$store.state.listpage.name;
            $('#liheader .icon-zuojiantou').on('click',function(){
                history.go(-1);
            })
            $('#linav').on('click','span',function(){
                $(this).addClass('active').siblings().removeClass('active')
            })
           http.get('http://10.3.136.98:8080/product',{style:this.style,type:this.type}).then((res)=>{
                // console.log(res.data.data)
                this.dataset=res.data.data;
           })
           if(this.name){
               http.get('http://10.3.136.98:8080/product',{name:this.name}).then((res)=>{
                // console.log(res.data.data)
                this.dataset=res.data.data;
                })
            }

        },
       
        methods:{
            selstyle(){
                http.get('http://10.3.136.98:8080/product',{style:this.style}).then((res)=>{
                    this.dataset=res.data.data;
                })
            },
            seltype(){
                http.get('http://10.3.136.98:8080/product',{type:this.type}).then((res)=>{
                    this.dataset=res.data.data;
                })
            },
            lisearch(){
                if($('#liheader input').val()){
                    let name=$('#liheader input').val();
                    http.get('http://10.3.136.98:8080/product',{name:name}).then((res)=>{
                    this.dataset=res.data.data;
                        })
                }
            },
            normal(){
                  http.get('http://10.3.136.98:8080/product',{style:this.style,type:this.type}).then((res)=>{
                
                this.dataset=res.data.data;
            })
            },
            pricesort(){
                http.get('http://10.3.136.98:8080/sort',{style:this.style,type:this.type}).then((res)=>{
                     this.dataset=res.data.data;
                })
            },
            qtysort(){
                 http.get('http://10.3.136.98:8080/qty',{style:this.style,type:this.type}).then((res)=>{
                     this.dataset=res.data.data;
                })
            },
            xsearch(Id){
               window.sessionStorage.setItem('objid',Id);
               this.$router.push({path:'/detail'})
            }
        }

    }
</script>