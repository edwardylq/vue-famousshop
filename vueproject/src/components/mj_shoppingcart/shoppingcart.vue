<template>
    <div class="mj_body">
        <div class="mj_cart_t">
            <cartt></cartt>
            <ul class="mj_cartList">
<!-- {"_id":"5aaa302ceb7dd22d2c084d2c","url":"16.jpg","qty":10,"goodname":"adidas阿迪达斯 跑步鞋 男 学院藏青蓝+白+学院蓝","price":"799","username":"Tom"} -->
                <li v-for="(obj,idx) in goodslist" :key="idx">
                    <span class="mj_pic">
                        <router-link to=""><img :src="'/src/assets/back-stage-images.shop/'+obj.url" :data-url="obj.url"></router-link>
                    </span>
                    <span class="mj_con">
                        <router-link to="" class="mj_name">{{obj.goodname}}</router-link>
                        <i class="mj_d">尺码:41,颜色:1号黑色+碳黑</i>
                        <p>
                            <label>数量:</label>
                            <span>
                                <i style="cursor: pointer;" class="el-icon-minus" @click="minusqty" :data-url="obj.url"></i>
                                <input type="text" :value="obj.qty" :data-qty="obj.qty" @change="ender">
                                <i style="cursor: pointer;" class="el-icon-plus" @click="plusqty" :data-url="obj.url"></i>
                            </span>
                        </p>
                        <p>
                            <label>售价</label>
                            ￥<span class="mj_price">{{obj.price}}</span>
                            <label style="cursor: pointer;" class="mj_del  el-icon-close" @click="del" :data-id="obj._id">删除</label>
                        </p>
                    </span>
                </li>
            </ul>
            <div class="mj_total">
                <p style="color:#E58B4C; text-align:left; border-bottom:1px dotted #ccc;padding:0 10px 12px;margin:0 -10px 12px;">享受的优惠: 活动价 满300减30 满600减60</p>
                <p>商品总数:<b ref="z_qty">{{zqty}}</b>　商品总额:<b>￥<i ref="t_price">{{totalprice}}</i></b></p>
            </div>
        </div>
        <cartb></cartb>
        <div class="mj_pay">
                <div class="mj_paycon" @click="getpayment">
                   生成订单
                </div>
                <router-link style="color:#fff;" class="mj_checkout" :to ="'/cart_cheackout/' + orderno">
                去结算<!-- （2） -->
                </router-link>
            </div>
            <div  class="mj_popWrap" v-show="show" >
                <div class="mj_warn">生成订单号{{orderno}}成功！！！
                </div>
            </div>
    </div>
    
   

</template>

<script> 
    // import './js/jquery-3.2.1.js'
    import http from '../../httpClient/httpClient.js'
    import './shoppingcart.scss'
    import './css/base.css'
    import './font/icon.css'
    import './font/iconfont.css'
    import './font/bootstrap.css'
    import cartb from './cartb.vue'
    import cartt from './cartt.vue'
    export default{
        mounted(){
            var username=window.sessionStorage.getItem('username')
            http.post('sercar',{username}).then((res) =>{
                this.username = res.data[0].username;
                this.id = res.data[0]._id;
                this.goodslist = res.data;console.log(this.goodslist)
                for(var i=0;i<this.goodslist.length;i++){
                    this.zqty = this.zqty+this.goodslist[i].qty*1;
                    this.totalprice=this.totalprice+this.goodslist[i].qty*this.goodslist[i].price;
                }
            })
        },
        data(){
            return{
                goodslist:[],
                show: false ,
                qty: '',
                username:"",
                zqty:0,
                totalprice:0,
                orderno:'00'
            }
        },
        components:{
            cartb,
            cartt
        },
        methods: {
            getpayment(){
                this.show=true;
                setTimeout(function(){
                    this.show =false;
                }, 2000)
                let username=window.sessionStorage.getItem('username');
                http.post('payment',{username}).then(res=>{
                    console.log(res.data.result.ops[0].orderno);
                    let _orderno=res.data.result.ops[0].orderno;
                    this.orderno=_orderno;
                    console.log(this.orderno);
                })
                setTimeout(function(){
                    http.post('delallcarproducts',{username}).then((res) =>{
                        
                    })
                },2000)
            },
            del(e){
                // let username = this.username;
                // let url =e.target.parentElement.parentElement.previousElementSibling.children[0].children[0].dataset.url;
                // console.log(url);
                let id= e.target.dataset.id;    
                console.log(id);
                 http.post('delcarproducts',{id}).then((res) =>{
                    if(res.data.n ==1){
                        for(var i =0;i<this.goodslist.length;i++){
                            if(id==this.goodslist[i]._id){
                                this.goodslist.splice(i,1);
                            }
                        }
                    }
                 })   
            },
            plusqty(e){
                e.target.previousElementSibling.value=e.target.previousElementSibling.value*1+1;
                let username = this.username;
                let url =e.target.dataset.url;
                http.post('operation',{username,url,equal:'a'}).then((res) =>{
                    this.$refs.z_qty.innerText=this.$refs.z_qty.innerText*1+1;
                    this.$refs.t_price.innerText=this.$refs.t_price.innerText*1+e.target.parentElement.parentElement.nextElementSibling.children[1].innerText*1;
                    // console.log(e.target.parentElement.parentElement.nextElementSibling.children[1])
                    // e.target.parentElement.parentElement.nextElementSibling.children[1].innerText*1+=
                });
            },
            minusqty(e){
                if(e.target.nextElementSibling.value != 0){
                    e.target.nextElementSibling.value=e.target.nextElementSibling.value*1-1;
                };
                let username = this.username;
                let url =e.target.dataset.url;
                http.post('operation',{username,url,equal:'b'}).then((res) =>{
                    // console.log(res)
                    this.$refs.z_qty.innerText=this.$refs.z_qty.innerText*1-1;
                    this.$refs.t_price.innerText=this.$refs.t_price.innerText*1-e.target.parentElement.parentElement.nextElementSibling.children[1].innerText*1;
                });
            },
            ender(e){
                console.log(e.target.value)
                let oldqty=e.target.dataset.qty;
                if(isNaN(e.target.value)){
                    e.target.value=1;
                };
                let qty =e.target.value;
                let username = this.username;
                let url =e.target.nextElementSibling.dataset.url;
                http.post('enter',{username,url,qty}).then((res) =>{
                    console.log(res);
                    this.$refs.z_qty.innerText=this.$refs.z_qty.innerText-oldqty;
                    this.$refs.z_qty.innerText=this.$refs.z_qty.innerText*1+qty*1;
                    this.$refs.t_price.innerText=this.$refs.t_price.innerText*1-e.target.parentElement.parentElement.nextElementSibling.children[1].innerText*oldqty;
                    this.$refs.t_price.innerText=this.$refs.t_price.innerText*1+e.target.parentElement.parentElement.nextElementSibling.children[1].innerText*qty;
                })
            }
        }
    }
</script>