const mongo = require('mongodb');
const client = mongo.MongoClient;
const ObjectID = mongo.ObjectID;
var db = null;
var col =null;
const url = 'mongodb://127.0.0.1:27017/';

client.connect(url, (_error, _db) => {
    if(_error){
        console.log(_error);
        return false;
    }

    db = _db;
    const dbName = '1707';

    col = db.db(dbName);
})

module.exports = {
    select: (_collection, _condition) => {
        if(db){
            return new Promise((resolve, reject) => {
                col.collection(_collection).find(_condition || {}).toArray((_error, _data) => {
                    if(_error){
                        reject(_error)
                    } else {
                        resolve(_data);
                    }
                })
            })
            
        }
    },
    update: () => {},
    insert: (_collection, _data) => {
        return new Promise((resolve, reject) => {
            col.collection(_collection).insert(_data).then((result, error) => {
                resolve(result);
            })
        })
    },
    delete: (_collection, _condition) => {
        return new Promise((resolve, reject) => {
            col.collection(_collection).remove(_condition).then((result, error) => {
                resolve(result);
            })
        })
    },
    objectid: (_id) => {
        return _id ? new ObjectID(_id) : new ObjectID();
    }
}