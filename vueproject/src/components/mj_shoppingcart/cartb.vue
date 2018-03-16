<template>
     <div class="mj_cart_b">
            <transition  tag="div" name="mj_pw"  >
            
            </transition>
            <div class="mj_b_t">
                <!-- <div class="mj_lr">
                <router-link to="Login">登录</router-link>
                <router-link to="Register">注册</router-link>
                </div>  -->
                <router-link to="homepage" class="mj_shouye">首页</router-link>
            </div>
            <div class="mj_menu">
                <router-link to="">正品保证</router-link>
                <router-link to="">满399包邮</router-link>
                <router-link to="">自由退货</router-link>
                <router-link to="">货到付款</router-link>
            </div>
            <div class="mj_b_c">
                <router-link to="">
                    <i class="el-icon-phone"></i><br/><span>8008008</span>
                </router-link>
                <router-link to="" style="color:skyblue">
                    <i class="glyphicon glyphicon-comment"></i><br/>
                    <span>scnmall</span>
                </router-link>
            </div>
            <div class="mj_b_b">
                <div class="mj_switch">
                <router-link to="">触平板<i class="glyphicon glyphicon-phone"></i></router-link>
                    <router-link to=""><i class="glyphicon glyphicon-globe"></i>电脑版</router-link>
                </div>
                <router-link to="">意见反馈 </router-link>
                <router-link to="">商圈  </router-link>
                <router-link to="">问答  </router-link>
                <router-link to="">标签  </router-link>
                <router-link to="">主题  </router-link>
                <router-link to="">长尾词</router-link>
                <br/><span style="color:#999;">©2008-2015 s.cn 名鞋库 闽ICP备08106896号</span>
            </div>

            
            
        </div>
</template>

<script>
    import './css/base.css'
    import './shoppingcart.scss'
    import './font/icon.css'
    import './font/bootstrap.css'
    import http from '../../httpClient/httpClient.js';
    export default {
        data(){
            return{
                show: false,
                
                
            }
        },
        methods:{
            
        }
    }
</script>