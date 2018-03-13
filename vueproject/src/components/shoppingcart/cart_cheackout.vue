<template>
   <div class="mj_cart_t">
      <cartt></cartt>
      <form role="form" class="mj_form">
        <div class="form-group">
          <label for="site">详细地址</label>
          <input type="text" class="form-control" v-model="mj_site" placeholder="请输收货地址">
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
   export default{
      data(){
           return{
              mj_site: "",
              mj_name: "",
              mj_phone: ""
           }
       },
       components:{
            cartb,
            cartt
        },
       methods:{
            mj_submit(){
              http.post('users',{name: this.mj_name, site: this.mj_site, phone: this.mj_phone}).then((res) => {
                console.log(res)
              })
            },
           getmsg(){
               this.$store.dispatch('getmsg_get',{path:'product/',msg:{houseOwner:'Kemo'}});
           },
           postmsg(){
               this.$store.dispatch('getmsg_post',{path:'product',msg:{houseOwner:'Kemo'}});
           }
       },
       computed:{
           get_msg:{
               get:function(){
                   console.log(11555);
                   return this.$store.getters.getmsg_get;
               }
           }
       }
   }
</script>