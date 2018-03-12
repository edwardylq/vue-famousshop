const filter = require('../utils/filter')
const db = require('../db')

module.exports = {
    register(app){
        app.post('/generateorder', (req, res) => {
            let pros = JSON.parse(req.body.pros);
            console.log(pros)
            let total = 0;
            for(let item of pros){
                total += item.price;
            }
            let order = {
                orderno: parseInt(Math.random() * 1000000),
                total,
                status: 0,
                products: pros
            }
            db.mongodb.insert('order', order).then((result) => {
                res.send(result);
            })
        })

        app.get('/aa', (req, res) =>{
            console.log("999");
            let aa=req.query.aa;
            console.log(aa);
            res.send(aa);
        })
    }
}