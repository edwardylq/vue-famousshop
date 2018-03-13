<template>
    <div class="mj_body" @click="show">
        <div class="mj_cart_t">
            <cartt></cartt>
            <ul class="mj_cartList">
                <li>
                    <span class="mj_pic">
                        <router-link to=""><img src="./images/mj_text1.jpg"></router-link>
                    </span>
                    <span class="mj_con">
                        <router-link to="" class="mj_name">adidas阿迪达斯男子跑步鞋18新款ALP   HABOUNCE小椰子运动鞋CQ0781</router-link>
                        <i class="mj_d">尺码:41,颜色:1号黑色+碳黑</i>
                        <p>
                            <label>数量:</label>
                            <span>
                                <i style="cursor: pointer;" class="el-icon-minus" @click="minusqty"></i>
                                <input type="text" :value="qty">
                                <i style="cursor: pointer;" class="el-icon-plus" @click="plusqty"></i>
                            </span>
                        </p>
                        <p>
                            <label>促销价</label>
                            <span class="mj_price">￥559</span>
                            <label style="cursor: pointer;" class="mj_del  el-icon-close">删除</label>
                        </p>
                    </span>
                </li>
                 <li>
                    <span class="mj_pic">
                        <router-link to=""><img src="./images/mj_text1.jpg"></router-link>
                    </span>
                    <span class="mj_con">
                        <router-link to="">adidas阿迪达斯男子跑步鞋18新款ALP   HABOUNCE小椰子运动鞋CQ0781</router-link>
                        <i class="mj_d">尺码:41,颜色:1号黑色+碳黑</i>
                        <p>
                            <label>数量:</label>
                            <span>
                                <i style="cursor: pointer;" ></i>
                                <input type="text" value="1">
                                <i style="cursor: pointer;" ></i>
                            </span>
                        </p>
                        <p>
                            <label>促销价</label>
                            <span class="mj_price">￥559</span>
                            <label style="cursor: pointer;" class="mj_del">删除</label>
                        </p>
                    </span>
                </li>
            </ul>
            <div class="mj_total">
                <p style="color:#E58B4C; text-align:left; border-bottom:1px dotted #ccc;padding:0 10px 12px;margin:0 -10px 12px;">享受的优惠: 活动价 满300减30 满600减60</p>
                <p>商品总数:<b>2</b>　商品总额:<b>￥1068</b></p>
            </div>
        </div>
        <cartb></cartb>
    </div>
    
   

</template>

<script> 
    
    import './shoppingcart.scss'
    import './css/base.css'
    import './font/icon.css'
    import './font/iconfont.css'
    import './font/bootstrap.css'
    import cartb from './cartb.vue'
    import cartt from './cartt.vue'
    export default{
        data(){
            return{
                show: false ,
                qty: 1
            }
        },
        components:{
            cartb,
            cartt
        },
        methods: {
            plusqty(){
                this.qty +=1 ;
            },
            minusqty(){
                if(this.qty != 0){
                    this.qty -= 1;
                }
            }
        }
    }
</script>