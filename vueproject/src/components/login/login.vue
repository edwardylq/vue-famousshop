<template>
   <div>
      
      <div class="lx_login">
        
        <header id="lx_l_head">
          <router-link to="/HomePage" class="lx_reg_back" href="">返回</router-link>
          <p>名鞋库-用户登录</p>
          <router-link to="/reg" class="lx_login_log" href="">注册</router-link>
        </header>

        <main id="lx_login_box">
          <ul class="lx_fangshi">
            <li class="lx_login_active">账号登录</li>
            <li>短信验证登录</li>
          </ul>
          <form id="lx_login_form" name="lx_login_form" action="">
            <input id="lx_login_username" name="lx_login_username" ref="lx_login_username" type="phone" placeholder="请输入手机号" />
            <p ref="lx_login_ts" class="lx_login_tishi">用户名或密码错误</p>
            <input id="lx_login_pwd" ref="lx_login_pwd" name="lx_login_pwd" type="password" placeholder="请输入您的密码" />
            <input id="lx_mdl" name="lx_mdl" checked type="checkbox" /><label for="lx_mdl">一个月内免登录</label>
            <span>忘记密码？</span>
            <input id="lx_login_btn" name="lx_login_btn" type="button" value="登录" @click="login" />
          </form>
        </main>
        
        <div ref="lx_tanchuang" class="lx_tanchuang">
          <div class="lx_l_tishi">登录成功！</div>
          <div class="lx_queren" @click="$router.push({path:'/HomePage'})">确定</div>
        </div> 

      </div>

           

   </div>
</template>

<script>

  import '../homepage/base.css'
  import './login.scss'
  import http from '../../httpClient/httpClient.js';
  import router from '../../router/index.js'
   export default{
       mounted(){
          window.sessionStorage.removeItem('username');
       },
       data(){
           return{
               text:'这是登录组件',
           }
       },
       methods:{
           getmsg(){
               this.$store.dispatch('getmsg_get',{path:'product/',msg:{houseOwner:'Kemo'}});
           },
           postmsg(){
               this.$store.dispatch('getmsg_post',{path:'product',msg:{houseOwner:'Kemo'}});
           },
           login(){
                var username = this.$refs.lx_login_username.value;
                var password = this.$refs.lx_login_pwd.value;
                var tishi = this.$refs.lx_login_ts;
                var lx_tanchuang = this.$refs.lx_tanchuang;
                // console.log(lx_login_pwd);
                http.post('login',{username,password}).then(res=>{
                  console.log(res);
                  if(res.data.status){
                    window.sessionStorage.setItem('lx_token',res.data.data);
                    window.sessionStorage.setItem('username',username);
                    lx_tanchuang.style.display = 'block';
                    // router.push('/HomePage');
                    tishi.className = 'lx_login_tishi';
                  }else{
                    window.sessionStorage.removeItem('username');
                    tishi.className = '';
                  }
                })
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