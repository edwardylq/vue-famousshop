<template>
   <div class="mj_cart_t">
      <cartt></cartt>
      <form role="form" class="mj_form">
        <div class="form-group" id="example">
          <label for="name">收货地区</label>
          <select class="form-control" v-model="prov">
            <option v-for="option in arr" :value="option.name">
              {{ option.name }}
            </option>
          </select>
          <select class="form-control" v-model="city">
            <option v-for="option in cityArr" :value="option.name">
              {{ option.name }}
            </option>
          </select>
          <select class="form-control" v-model="district" v-if="district">
            <option v-for="option in districtArr" :value="option.name">
              {{ option.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="name">详细收货地址</label>
          <input type="text" class="form-control" v-model="mj_site" placeholder="请输详细收货地址">
        </div>
        <div class="form-group">
          <label for="name">收货人姓名</label>
          <input type="text" class="form-control" v-model="mj_name" placeholder="请输收货姓名">
        </div>
        <div class="form-group">
          <label for="phone">手机</label>
          <input type="text" class="form-control" v-model="mj_phone" placeholder="请输入收货人电话号码">
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox">保存本次收货地址
          </label>
        </div>
        <button type="submit" class="btn btn-default" @click="mj_submit">提交</button>
      </form>
      <h1 class="mj_qingdan">商品清单</h1>
      <ul class="mj_cartgoods">
<!-- {"_id":"5aaa302ceb7dd22d2c084d2c","url":"16.jpg","qty":10,"goodname":"adidas阿迪达斯 跑步鞋 男 学院藏青蓝+白+学院蓝","price":"799","username":"Tom"} -->
                <li v-for="(obj,key) in goods">
                    <span class="mj_pic">
                        <router-link to=""><img :src="'/src/assets/back-stage-images.shop/'+obj.url" :data-url="obj.url"></router-link>
                    </span>
                    <span class="mj_con">
                        <router-link to="" class="mj_name">{{obj.goodname}}</router-link>
                        <i class="mj_d">尺码:41,颜色:1号黑色+碳黑</i>
                        <p>
                            <label>数量:</label>
                            <span>
                                {{obj.qty}}
                            </span>
                            <label>售价</label>
                            ￥<span class="mj_price">{{obj.price}}</span>
                        </p>
                    </span>
                </li>
            </ul> 
            <div class="mj_total">
                <p style="color:#E58B4C; text-align:left; border-bottom:1px dotted #ccc;padding:0 10px 12px;margin:0 -10px 12px;">享受的优惠: 活动价 满300减30 满600减60</p>
                <p>商品总数:<b ref="z_qty">{{zqty}}</b>　商品总额:<b>￥<i ref="t_price">{{totalprice}}</i></b></p>
            </div>  
      <div class="mj_pay">
                <div class="mj_paycon">
                   <!--  合计: <span id="payMoney" style="font-size:18px;">￥1068</span> -->
                </div>
                <div  class="mj_checkout" @click="mj_output"><router-link to="" >
                    立即付款
                </router-link>
                </div>
                
            </div>
        <cartb></cartb>
        <div  class="mj_popWrap" v-show="show" >
                <div class="mj_warn">支付成功！！！
                </div>
            </div>
     
   </div>
</template>

<script>
  import cartb from './cartb.vue'
  import './shoppingcart.scss'
  import './css/base.css'
  import cartt from './cartt.vue'
  import citytext from './citytext.js'
  import http from '../../httpClient/httpClient.js';
  import router from '../../router/index.js'
   export default{
      data(){
           return{
              mj_site: "",
              mj_name: "",
              mj_phone: "",
              prov: '广东',
              city: '广州',
              district: '越秀区',
              cityArr: [],
              districtArr: [],
              arr: citytext.arrAll,
              goods:[],
              zqty:0,
              totalprice:0,
              show:false
            } 
       },
       mounted(){
              let orderno=(location.href).split('cart_cheackout')[1].slice(1);
              console.log(orderno);
              http.post('getcarorder',{orderno}).then((res)=>{
                console.log(res);
                if(res.data.length>0){
                  this.goods=res.data[0].products;
                  for(var i=0;i<this.goods.length;i++){
                    this.zqty = this.zqty+this.goods[i].qty*1;
                    this.totalprice=this.totalprice+this.goods[i].qty*this.goods[i].price;
                  }
                }
                console.log(this.goods)
              })
       },
       components:{
            cartb,
            cartt
        },
       methods:{
            mj_output(){
                this.show = true;
                setTimeout(function(){
                  router.push('/shoppingcart');
                }, 2000)
            },
            mj_submit(){
              http.post('users',{username: this.mj_name, site: this.mj_site, phone: this.mj_phone}).then((res) => {
                console.log(res)
              })
            },
              updateCity: function () {
              for (var i in this.arr) {
                var obj = this.arr[i];
                if (obj.name == this.prov) {
                  this.cityArr = obj.sub;
                  break;
                }
              }
              this.city = this.cityArr[1].name;
            },
            updateDistrict: function () {
              for (var i in this.cityArr) {
                var obj = this.cityArr[i];
                if (obj.name == this.city) {
                  this.districtArr = obj.sub;
                  break;
                }
              }
              if(this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
                this.district = this.districtArr[1].name;
              } else {
                this.district = '';
              }
            }
          },
          beforeMount: function () {
            this.updateCity();
            this.updateDistrict();
          },
          watch: {
            prov: function () {
              this.updateCity();
              this.updateDistrict();
            },
            city: function () {
              this.updateDistrict();
            }
          }
   }
</script>