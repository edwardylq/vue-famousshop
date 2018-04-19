const jwt = require('jsonwebtoken');
const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter.js');

module.exports = {
    register(app){
        app.post('/login', (req, res) => {
            let username = req.body.username;
            let pwd = req.body.password;
            // console.log(username,pwd);
            db.mongodb.select('regs',{username,pwd}).then((result) => {
                let token = '';
                var user = {username};
                if(result.length > 0){
                    token = jwt.sign(user, 'secret', {
                        'expiresIn': 1440 // 设置过期时间
                    })
                }
                res.send(apiResult(result && result.length > 0,token));
            })
        })
        // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        app.post('/backlogin',(req,res)=>{
            let name=req.body.username;
            let pwd =String(req.body.password);
            db.mongodb.select('backend',{name,pwd}).then(result=>{
                let token = '';
                var user = {name};
                if(result.length > 0){
                    token=jwt.sign(user,'secret',{
                        'expiresIn': 1440
                    })
                }
                res.send(apiResult(result && result.length > 0, token));
            })
        })

         app.post('/getproducts',(req,res)=>{
            let params=JSON.parse(req.body.params);
            let pageno=params.pageno;
            let qty=params.qty;
            db.mongodb.select('product').then(result=>{
                var _result=result.slice((pageno-1)*qty,qty*pageno);
                let total=Math.ceil(result.length/qty);
                res.send(apiResult(true,_result,total));
            })
        })

        app.post('/delproducts',(req,res)=>{
            let id=req.body.id;
            let oid=db.mongodb.objectid(id);
            db.mongodb.delete('product',{"_id":oid}).then((result)=>{
                res.send({status:true,data:result});
            }) 
        })
        app.get('/search',(req,res)=>{
            let id=req.query.id;
            let oid=db.mongodb.objectid(id);
            db.mongodb.select('product',{"_id":oid}).then((result)=>{
                res.send({status:true,data:result});
            }) 
        })

        app.post('/editproducts',(req,res)=>{
            let params=JSON.parse(req.body.params);
            let id=params.a0;
            let oid=db.mongodb.objectid(id);
            let name=params.a1;
            let price=params.a2;
            let discounts=params.a3;
            let barand=params.a4;
            let url=params.a5;
            let qty=params.a6;
            let sales=params.a7;
            let type=params.a8;
            let style=params.a9;
            // console.log(id,name,price,discounts,brand,url,sales,type,style);
            db.mongodb.update('product',{"_id":oid},{name,price,discounts,barand,url,qty,sales,type,style}).then(result=>{
                res.send(result);
            })
        })

        app.post('/addproducts',(req,res)=>{
            let params=JSON.parse(req.body.params);
            // console.log(params);
            db.mongodb.insert('product',params).then(result=>{
                res.send(result);
            })
        })
    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        app.post('/getusers',(req,res)=>{
             let params=JSON.parse(req.body.params);
            let pageno=params.pageno;
            let qty=params.qty;
            db.mongodb.select('regs').then(result=>{
                var _result=result.slice((pageno-1)*qty,qty*pageno);
                let total=Math.ceil(result.length/qty);
                res.send(apiResult(true,_result,total));
            })
        })

         app.post('/editusers',(req,res)=>{
            let params=JSON.parse(req.body.params);
            let id=params.a0;
            let oid=db.mongodb.objectid(id);
            let username=params.a1;
            let pwd=params.a2;
            // console.log(id,username,pwd);
            db.mongodb.update('regs',{"_id":oid},{username,pwd}).then(result=>{
                res.send(result);
            })
        })

         app.post('/delusers',(req,res)=>{
            let id=req.body.id;
            let oid=db.mongodb.objectid(id);
            db.mongodb.delete('regs',{"_id":oid}).then((result)=>{
                res.send({status:true,data:result});
            }) 
        })

         app.post('/addusers',(req,res)=>{
            let params=JSON.parse(req.body.params);
            // console.log(params);
            db.mongodb.insert('regs',params).then(result=>{
                res.send(result);
            })
        })


    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

                //模糊搜索
                
        app.get('/product',(req,res)=>{
            var _type = req.query.type
            var _style = req.query.style
            console.log(req.query)
            for(var attr in req.query){
                req.query[attr] =  {$regex:req.query[attr]}

            }

            // console.log(req.query)
            db.mongodb.select('product',req.query).then((result) => {
                
                res.send(apiResult(result && result.length > 0,result));
            })

        })
        /////价格排序
        
         app.get('/sort',(req,res)=>{
            var _type = req.query.type
            var _style = req.query.style
            console.log(req.query)
            for(var attr in req.query){
                req.query[attr] =  {$regex:req.query[attr]}

            }

            // console.log(req.query)
            db.mongodb.sortup('product',req.query).then((result) => {
                
                res.send(apiResult(result && result.length > 0,result));
            })

        })
            //////销量排序
    
         app.get('/qty',(req,res)=>{
            var _type = req.query.type
            var _style = req.query.style
            // console.log(req.query)
            for(var attr in req.query){
                req.query[attr] =  {$regex:req.query[attr]}

            }

            // console.log(req.query)
            db.mongodb.qtyup('product',req.query).then((result) => {
                
                res.send(apiResult(result && result.length > 0,result));
            })

        })

          app.post('/register', (req, res) => {
            let username = req.body.username;
            let pwd = req.body.password;
            // console.log(username,pwd);
            db.mongodb.select('regs',{username}).then((result) => {
                if(result&&result.length>0){
                    res.send(apiResult(false));
                }else{
                    db.mongodb.insert('regs',{username,pwd}).then((result)=>{
                        res.send(result);
                    })
                }
            })
        })

        

        app.post('/getallproducts',(req,res)=>{
            db.mongodb.select('product').then(result=>{
                res.send(result)
            })
        })

        
        app.post('/shoppingcar', (req, res) => {
            let url = req.body.url;
            let qty = req.body.qty*1;
            console.log(qty);
            let goodname = req.body.goodname;
            let username = req.body.username;
            let price = req.body.price;
            // res.send({url,goodname})
            db.mongodb.select('shoppingcart',{url,username,goodname}).then((result) => { 
                console.log(result)
                // res.send(result);
                if(result&&result.length>0){console.log(qty);
                    var num=result[0].qty*1+qty;
                    db.mongodb.update('shoppingcart',{url},{qty:num}).then((res1)=>{console.log(666)
                        res.send(res1);
                    })
                }else{
                    db.mongodb.insert('shoppingcart',{url,qty,goodname,price,username}).then((res2)=>{
                         res.send(res2);
                    })
                }
               
            })
        })


         app.post('/sercar',(req,res)=>{
            let username=req.body.username
            console.log(username);
            db.mongodb.select('shoppingcart',{username}).then((res1)=>{
                res.send(res1);
            })
        })
        // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
        app.post('/operation',(req,res)=>{
            let equal=req.body.equal;
            let username=req.body.username;
            let url =req.body.url;
            console.log(username,url,equal);
            db.mongodb.select('shoppingcart',{username,url}).then(result=>{
                console.log(result);
                let qty=null;
                if(equal=='a'){
                    qty=(result[0].qty)*1+1;
                }else{
                    qty=(result[0].qty)*1-1;
                }
                console.log(result[0].qty,qty);
                db.mongodb.update('shoppingcart',{username,url},{qty:qty}).then(result=>{
                    // console.log(result);
                     res.send(result);
                });
            });
        })

        app.post('/enter',(req,res)=>{
            let username=req.body.username;
            let url =req.body.url;
            let qty=req.body.qty;
             db.mongodb.select('shoppingcart',{username,url}).then(result=>{
                // console.log(result);
                db.mongodb.update('shoppingcart',{username,url},{qty:qty}).then(result=>{
                    res.send(result);
                });
             });
        })

        app.post('/delcarproducts',(req,res)=>{
            // let username=String(req.body.username);
            // let url=String(req.body.url);
            // console.log(username,url);
            // let _id = res.body.aa;
            let id=req.body.id;
            let _id=db.mongodb.objectid(id);
            db.mongodb.delete('shoppingcart',{_id}).then(result=>{
                res.send(result);
            })
        })


        app.post('/payment',(req,res)=>{
            let username=req.body.username;
            db.mongodb.select('shoppingcart',{username}).then(result=>{
                console.log(result);
                let total=0;
                result.map(function(item){
                    total+=item.price*1;
                    return true;
                });
                let order={
                    orderno:parseInt(Math.random()*10000000),
                    total,
                    status:0,
                    products:result
                }
                // console.log(total,result);
                db.mongodb.insert('order',order).then((result)=>{
                    if(result.result.ok==1){
                        res.send({status:true,result});
                    }else{
                        res.send({status:false,error:'加入数据库失败'});
                    }
                });
            });
        })

        app.post('/getcarorder',(req,res)=>{
            let orderno=Number(req.body.orderno);
            console.log(orderno);
            db.mongodb.select('order',{orderno}).then(result=>{
                res.send(result);
            })
        })

        app.post('/delallcarproducts',(req,res)=>{
            let username=req.body.username;
            console.log(username);
            db.mongodb.delete('shoppingcart',{username}).then(result=>{
                res.send(result);
            })
        })
    }

}
