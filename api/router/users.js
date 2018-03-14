const jwt = require('jsonwebtoken');
const db = require('../db');
const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter.js');

module.exports = {
    register(app){
        app.post('/login', (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            console.log(username)
            db.mongodb.select('product').then((result) => {
                let token = '';
                var user = {username};
                if(result.length > 0){
                    token = jwt.sign(user, 'secret', {
                        'expiresIn': 1440 // 设置过期时间
                    })
                }
                res.send(apiResult(result && result.length > 0,result));
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

    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

                //模糊搜索
                
        app.get('/product',(req,res)=>{
            var _type = req.query.type
            var _style = req.query.style
            console.log(req.query)
            for(var attr in req.query){
                req.query[attr] =  {$regex:req.query[attr]}

            }

            console.log(req.query)
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

            console.log(req.query)
            db.mongodb.sortup('product',req.query).then((result) => {
                
                res.send(apiResult(result && result.length > 0,result));
            })

        })
            //////销量排序
    
         app.get('/qty',(req,res)=>{
            var _type = req.query.type
            var _style = req.query.style
            console.log(req.query)
            for(var attr in req.query){
                req.query[attr] =  {$regex:req.query[attr]}

            }

            console.log(req.query)
            db.mongodb.qtyup('product',req.query).then((result) => {
                
                res.send(apiResult(result && result.length > 0,result));
            })

        })


    }

}
