<template>
  
  <div>
<!-- 
    <h1>{{text}}</h1>
    <p>{{get_msg}}</p>
    <p></p>
    <button @click='getmsg'>get请求点我</button>
    <button @click="postmsg">post请求点我</button> -->

    <div class="lx_home">
      <header id="lx_head">
        <ul>
          <li></li>
          <li>
            <input type="text" />
            <button><i></i></button>
          </li>
          <li>
            <i></i>
          </li>
        </ul>

      </header>

      <main id="lx_main">
        <img src="./img/lx_banner2.jpg" alt="" />
        <img src="./img/lx_jianhuo.jpg" alt="" />
        <img src="./img/lx_jxpinpai.jpg" alt="" />
        <img src="./img/lx_zhiIN.jpg" alt="" />
      </main>
      <footer id="lx_footer">
        
      </footer>
    </div>

  </div>

</template>


<script>

  import './css/base.css'
  import './sass/homepage.scss'
  // import './lib/flexible.debug.js'
  // import './lib/flexible_css.debug.js'

  export default{
      data(){
          return{
              text:'这是首页组件',
          }
      },
      methods:{
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