<template>
    <div>
        <div class="lx_register">
        
        <header id="lx_r_head">
          <router-link to="/HomePage" class="lx_reg_back" href="">返回</router-link>
          <p>名鞋库-用户注册</p>
          <router-link to="/Login" class="lx_reg_log" href="">登录</router-link>
        </header>

        <main id="lx_reg_box">
          <form id="lx_reg_form" name="lx_reg_form" action="">
            <input id="lx_username" name="lx_username" type="phone" placeholder="请输入手机号" ref="lx_phone" @change="phonenum"/>
            <p ref="lx_r_ts" class="lx_reg_tishi">请输入正确的手机号</p>
            <input ref="lx_pwd" id="lx_pwd" name="lx_pwd" type="password" placeholder="请输入密码  (以字母开头,长度为6-20)" />
            <p ref="lx_r_ts2" class="lx_reg_tishi" v-show="pwdshow">密码格式错误</p>
            <p ref="lx_r_ts3" class="lx_reg_tishi" v-show="usershow">用户名已存在，请重新注册！</p>
            <input @click="reg" id="lx_regbtn" name="lx_regbtn" type="button" value="注册" />
          </form>
        </main>

        <div ref="lx_tanchuang" class="lx_tanchuang">
          <div class="lx_r_tishi">注册成功！</div>
          <div class="lx_queren" @click="$router.push({path:'/Login'})">确定</div>
        </div>

      </div>
    </div>
</template>

<script>

  import '../homepage/base.css'
  import './register.scss'
  import http from '../../httpClient/httpClient.js';
  import router from '../../router/index.js';
   export default{
       data(){
           return{
               text:'这是注册组件',
               ok:false,
               pwdshow:false,
               usershow:false,
           }
       },
       methods:{
           getmsg(){
               this.$store.dispatch('getmsg_get',{path:'product/',msg:{houseOwner:'Kemo'}});
           },
           postmsg(){
               this.$store.dispatch('getmsg_post',{path:'product',msg:{houseOwner:'Kemo'}});
           },
           phonenum(){
              var lx_username = this.$refs.lx_phone.value;
              var lx_r_ts = this.$refs.lx_r_ts;
              
              // console.log(lx_r_ts);
              if(!/^1[34578]\d{9}$/.test(lx_username)){
                  // alert('手机号码不合法');
                  lx_r_ts.className = '';
                  this.ok = false;
              }else{
                this.ok = true;
                lx_r_ts.className = 'lx_reg_tishi';
              };

           },
           reg(){
                var username = this.$refs.lx_phone.value;
                var password = this.$refs.lx_pwd.value;
                var lx_r_ts2 = this.$refs.lx_r_ts2;
                var lx_r_ts3 = this.$refs.lx_r_ts3;
                var lx_tanchuang = this.$refs.lx_tanchuang;
                // console.log(lx_r_ts2);
                if(!/^[a-z][a-z0-9\-]{2,19}$/.test(password)){
                    lx_r_ts2.className = '';
                    this.pwdshow=true;
                    this.usershow=false;
                    this.ok = false;
                }else{
                  this.ok = true;
                  lx_r_ts2.className = 'lx_reg_tishi';

                };

                // console.log(this);
                if(this.ok){
                    console.log(username,password);
                    http.post('register',{username,password}).then(res=>{
                      console.log(res);
                      if(res.data.status!=false){
                        if(res.data.result.ok==1&&res.data.result.n==1){
                          lx_r_ts3.className = 'lx_reg_tishi';
                          lx_tanchuang.style.display = 'block';
                          // router.push('/HomePage');
                        }
                      }else{
                        // window.alert('用户名已存在！')
                        this.usershow=true;
                        this.pwdshow=false;
                        lx_r_ts3.className = '';
                      }
                    })
                }
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