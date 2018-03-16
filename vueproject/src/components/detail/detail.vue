<template>
    <div id="detail">
        <div id="detailheader">
            <div class="hl iconfont icon-zuojiantou"></div>
            <div class="fen">
                <span class="active" @click="fucker">商品</span>
                <span class="mid" @click="fuck">详情</span>
                <span>评论</span>
            </div>
            <div class="hl iconfont icon-more"></div>
        </div>
        <div id="detailbody">
            <div class="lunbo">
            <slider :pages="pages" :sliderinit="sliderinit">
            </slider>
            </div>
            <div class="dename">
            <b>{{dataset.name}}</b>
            <span>{{dataset.style}} {{dataset.type}}</span>
            </div>
            <div class="deprice">
                <span>销售价：{{dataset.price}}</span>
                <span>吊牌价：<del>{{dataset.discounts}}</del></span>
                <span>销量：{{dataset.qty}}</span>
            </div>
            <div class="cuxiao">
                促销信息：<b>满200减20 满400减50 每人限购3件</b>
            </div>
            <div class="cuxiao">
               100%正品 7天退货
            </div>
            <div class="shoe_color">
                <span>颜色：</span>
                <img :src="'/src/assets/back-stage-images.shop/'+dataset.url">
                <b></b>
            </div>
            <div class="shoe_size">
                <b>尺码：</b>
                <p>
                <span>39</span>
                <span>39.5</span>
                <span>40</span>
                <span>41</span>
                <span>41.5</span>
                <span>42</span>
                <span>43</span>
                <span>43.5</span>
                <i></i>
                </p>
                
            </div>
            <div class="shoe_qty">
                <b>数量：</b>
                <span class="jian" @click="jian">-</span>
                <input type="text" :value="qty" />
                <span class="jia" @click="jia">+</span>
            </div>
            <div class="shoe_detail">
                <h4>商品详细参数</h4>
                <span>商品型号：{{dataset._id}}</span>
                <span>详情：{{dataset.name}}</span>
                <span>品牌：{{dataset.barand}}</span>
                <span>款式：{{dataset.type}}</span>
                <span>性别：{{dataset.style}}</span>
                <span>价格：{{dataset.price}}元</span>
                <span>销量：{{dataset.qty}}件</span>
                <span>款式：{{dataset.style}}</span>
                <span>折前价格：{{dataset.discounts}}元</span>
            </div>
            <div class="shoe_photo">
                <img :src="'/src/assets/img/big'+num+'.jpg'" v-for="num in 11"/>
            </div>
        </div>
        <div id="detailfooter">
            <p><span class="iconfont icon-kefu"></span><span>客服</span></p>
            <p @click="$router.push({path:'/HomePage'})"><span class="iconfont icon-shouye"></span><span>首页</span></p>
            <p @click="$router.push({path:'/shoppingcart'})"><span class="iconfont icon-gouwuche"></span><span>购物车</span></p>
            <b @click="carlist">加入购物车</b>
            <b @click="buy">立即购买</b>
        </div>
        <div id="cover" v-show="show">
            <p>
            <span class="box1">是否确认加入购物车?</span>
            <span class="box2"><b @click="cancel">取消</b><b @click="comfirm">确认</b></span>
            </p>
        </div>
    </div>
</template>
<script>
    import slider from 'vue-concise-slider'// 引入slider组件
    import './detail.scss'
    import './detailicon.css'
    import http from '../../httpClient/httpClient.js'
    export default{
         mounted(){
            this.objid=window.sessionStorage.getItem('objid');
            $('#detail #detailheader .icon-zuojiantou').on('click',function(){
                history.go(-1);
            })
            $('#detail #detailheader .fen span').on('click',function(){
                $(this).addClass('active').siblings().removeClass('active')

            })
            //  $('#detail #detailheader .fen .mid').on('click',function(){
                    

            // })
            http.get('http://10.3.136.98:8080/search',{id:this.objid}).then((res)=>{
                this.dataset=res.data.data[0];
                this.url=this.dataset.url;
                this.goodname=this.dataset.name;
                this.price=this.dataset.price;
                console.log(this.dataset)
                 this.pages.unshift({
                        title: '1',
                        style:{
                            background:'url(/src/assets/back-stage-images.shop/'+this.url+')'
                        }
                    })
            })

            $('#detailbody .shoe_color img').on('click',function(){
                $(this).attr('class')?$(this).removeClass('active'):$(this).addClass('active')
                $('#detailbody .shoe_color b').text('')
            })
            $('#detailbody .shoe_size').on('click','span',function(){
                $(this).attr('class')?$(this).removeClass('active'):$(this).addClass('active').siblings().removeClass('active')
                $('#detailbody .shoe_size i').text('')
            })
            // $('#detailbody').on('scorll',function(){
            //     console.log($('#detailbody').scroll())
            // })
          
        },
        data(){
            return {
                dataset:[],
                objid:'',
                url:'',
                qty:1,
                goodname:'',
                price:'',
                username:'',
                show:false,
                // color:false;
                // size:false;
                //图片列表[arr]
                pages:[
                    {
                        title: '2',
                        style:{
                            background:'url(/src/assets/img/lunbo2.jpg)',
                        }
                    },
                    {
                        title: 'slide3',
                        style:{
                            background:'url(/src/assets/img/lunbo1.jpg)',
                        },
                    }
                ],
                //滑动配置[obj]
                sliderinit: {
                    currentPage: 0,//当前页码
                    thresholdDistance: 500,//滑动判定距离
                    thresholdTime: 2000,//滑动判定时间
                    autoplay:2000,//自动滚动[ms]
                    loop:true,//循环滚动
                    direction:'horizontal',//方向设置，垂直滚动
                    infinite:1,//无限滚动前后遍历数
                    slidesToScroll:1,//每次滑动项数
                }
            }
        },
        components: {
            slider
        },
        methods:{
            jian(){

                this.qty=$('#detailbody .shoe_qty input').val();
                this.qty--;
                
                if(this.qty<=1){this.qty=1}
            },
            jia(){
                this.qty=$('#detailbody .shoe_qty input').val();
                this.qty++;
                 
            },
            cancel(){
                this.show=false;
            },
            comfirm(){

                 this.username=window.sessionStorage.getItem('username');
                if(this.username){
                 $('#detailbody .shoe_color img').each((a,color)=>{
                    if(!$(color).attr('class')){
                        $('#detailbody .shoe_color b').text('请选择颜色！')
                       return false
                    }
                     $('#detailbody .shoe_size span').each((b,color)=>{
                        if($(color).attr('class')){
                            
                             console.log(this.url,this.qty,this.goodname,this.price)
                             http.post('http://10.3.136.98:8080/shoppingcar',{url:this.url,qty:this.qty,goodname:this.goodname,price:this.price,username:this.username}).then((res2)=>{
                                    console.log(res2);
                                 $('#detailbody .shoe_size i').text('');
                                 this.show=false;
                                 this.$router.push({path:'/shoppingcart'})
                            })
                        }else{
                            $('#detailbody .shoe_size i').text('请选择尺码');
                        }   
                    })
                 })
                }else{
                   this.$router.push({path:'/Login'})
                } 
            },
            carlist(){
                  this.show=true;
                   this.qty=$('#detailbody .shoe_qty input').val()*1
            },
            fuck(){
                var a=document.getElementById('detailbody')
                a.scrollTo(0, 1000)
            },
            fucker(){
                var a=document.getElementById('detailbody')
                a.scrollTo(0, 0)
            },
            buy(){
                 this.username=window.sessionStorage.getItem('username');
                 if(this.username){
                    this.$router.push({path:'/shoppingcart'})
                }else{
                    this.$router.push({path:'/Login'})
                }
            }



        }
    }
</script>