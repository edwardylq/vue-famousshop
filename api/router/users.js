const jwt = require('jsonwebtoken');
const db = require('../db');
const apiResult = require('../utils/apiResult')

module.exports = {
    register(app){
        app.post('/login', (req, res) => {
            // let username = req.body.username;
            // let password = req.body.password;
            // console.log(username)
            db.mongodb.select('product').then((result) => {
                // let token = '';
                // var user = {username};
                // if(result.length > 0){
                //     token = jwt.sign(user, 'secret', {
                //         'expiresIn': 1440 // 设置过期时间
                //     })
                // }
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
    }
}