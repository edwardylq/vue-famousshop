const mongo = require('mongodb');
const client = mongo.MongoClient;

const ObjectID = mongo.ObjectID;


let db 
client.connect('mongodb://10.3.136.98:27017', (_error,client) => {
    if(_error){
        return false;
    } else {
        db = client.db('famous-shop');
    }
});


module.exports = {
    select(_collection, _condition){
        return new Promise((resolve, reject) => {
            db.collection(_collection).find(_condition || {}).toArray((error, result) => {
                resolve(result);
            })
        })
    },
    insert: (_collection, _data) => {
        return new Promise((resolve, reject) => {
            db.collection(_collection).insert(_data).then((result, error) => {
                resolve(result);
            })
        })
    },
    delete: (_collection, _condition) => {
        return new Promise((resolve, reject) => {
            db.collection(_collection).remove(_condition).then((result, error) => {
                resolve(result);
            })
        })
    },
    update:(_collection,orderno,data)=>{
        // console.log(orderno,data);
        return new Promise((resolve,reject)=>{
            db.collection(_collection).update(orderno,data).then((result,_error)=>{
                resolve(result);
            })
        })
    },
    objectid: (_id) => {
        return _id ? new ObjectID(_id) : new ObjectID();
    },
    sortup(_collection, _condition){
        return new Promise((resolve, reject) => {
            db.collection(_collection).find(_condition || {}).sort({price:1}).toArray((error, result) => {
                resolve(result);
            })
        })
    },
    qtyup(_collection, _condition){
        return new Promise((resolve, reject) => {
            db.collection(_collection).find(_condition || {}).sort({qty:1}).toArray((error, result) => {
                resolve(result);
            })
        })
    }


}