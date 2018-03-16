<template>
<div>
    <div class="mj_nav">
        <div @click="back"><router-link to="" class="el-icon-back mj_back"></router-link></div>
        <div @click="categoryNavshow"><router-link to="" class="el-icon-menu mj_mean" ></router-link></div>
        <div class="t">A.J名鞋库 我的购物车</div>
        <div><router-link to="/cart_cheackout/00" class="glyphicon glyphicon-user"></router-link></div>
        <div><router-link to="/shoppingcart" class="glyphicon glyphicon-shopping-cart"></router-link></div>
    </div>
     
    <div class="mj_categoryCon"  v-show="show">
        <transition-group  tag="div" name="mj_categoryNav1" > 
               <div class="mj_categoryNav" key="1" v-show="show">
                <router-link to="homepage"><i class="glyphicon glyphicon-home"></i>首页</router-link>
                <router-link to="">
                <i class="glyphicon glyphicon-star"></i>会员日</router-link>
                <router-link to=""><i class="iconfont icon-yundongxie"></i>休闲鞋</router-link>
                <router-link to=""><i class="iconfont icon-lanqiu"></i>篮球馆</router-link>
                <router-link to=""><i class="glyphicon glyphicon-lock"></i>包包/配件</router-link>
            </div> 
        </transition-group> 
        <div class="mj_categoryMask"  @click="categoryMaskshow"></div>
    </div>
    

</div>
    
</template>

<script>
    
    export default {
        data(){
            return{
                show: false
            }
        },
        methods: {
            categoryNavshow(){
                this.show = true ;
            },
            categoryMaskshow(){
                this.show = false ;
            },
            back(){
                this.$router.go(-1);
            }
        }
    }
</script>