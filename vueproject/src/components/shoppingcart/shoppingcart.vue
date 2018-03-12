<template>
    <div class="mj_body">
        <div class="mj_cart_t">
            <div class="mj_nav">
                <div class="el-icon-back"></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
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
                                <i style="cursor: pointer;" class="el-icon-minus"></i>
                                <input type="text" value="1">
                                <i style="cursor: pointer;" class="el-icon-plus></i>
                            </span>
                        </p>
                        <p>
                            <label>促销价</label>
                            <span class="mj_price">￥559</span>
                            <label style="cursor: pointer;" class="mj_del">删除</label>
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
        <div class="mj_cart_b">
            <div class="mj_b_t">
                <div class="mj_lr">
                <router-link to="">登录</router-link>
                <router-link to="">注册</router-link>
                </div> 
                <router-link to="" class="mj_shouye">首页</router-link>
            </div>
            <div class="mj_menu">
                <router-link to="">正品保证</router-link>
                <router-link to="">满399包邮</router-link>
                <router-link to="">自由退货</router-link>
                <router-link to="">货到付款</router-link>
            </div>
            <div class="mj_b_c">
                <router-link to=""><span>8008008</span></router-link>
                <router-link to=""><span>scnmall</span></router-link>
            </div>
            <div class="mj_b_b">
                <div class="mj_switch">
                    <router-link to="">触平板</router-link>
                    <router-link to="">电脑版</router-link>
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
        <div class="mj_pay">
            <div class="mj_paycon">
                合计: <span id="payMoney" style="font-size:18px;">￥1068</span>
            </div>
            <router-link to="" class="mj_checkout">
                去结算（2）
            </router-link>
        </div>
    </div>
    
    
</template>

<script> 
    
    import './shoppingcart.scss'
    import './css/base.css'
    import './font/icon.css'
   
    export default{

    }
</script>