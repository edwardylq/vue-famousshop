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
      <cartb></cartb>
   </div>
</template>

<script>
  import cartb from './cartb.vue'
  import './shoppingcart.scss'
  import './css/base.css'
  import cartt from './cartt.vue'
  import citytext from './citytext.js'
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
              arr: citytext.arrAll
            } 
       },
       components:{
            cartb,
            cartt
        },
       methods:{
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