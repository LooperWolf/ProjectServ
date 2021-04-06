var dbo
const ObjectID = require('mongodb').ObjectID
const express = require('express')
const cors = require('cors')
const bp = require('body-parser')
var app = express()
const MongoClient = require('mongodb').MongoClient
var url = "mongodb://poom:potato@cluster0-shard-00-00.lvxjb.mongodb.net:27017,cluster0-shard-00-01.lvxjb.mongodb.net:27017,cluster0-shard-00-02.lvxjb.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-rwr553-shard-0&authSource=admin&retryWrites=true&w=majority"
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
MongoClient.connect(url, function (err, db) {
    if (err) throw err
    dbo = db.db("Userdb")
})
app.get('/home/update', function (req, res) {
    console.log(req.query)
    var query = { _id: ObjectID(req.query._id) };
    dbo.collection("slaves").find(query).toArray(function (err, result) {
        if (err) throw err
        console.log(result)
        res.send(JSON.stringify(result))
    })
})

app.put('/pg/update', function (req, res) {
    console.log('\n\n\n\n\n\n\n\nupdate')
    console.log(req.query)
    var myquery = { _id: ObjectID(req.query._id) };
    console.log(myquery)
    var newvalues;
    switch (req.query.id) {
        case '1': newvalues = {
            $set: {
                1: req.query.data,
            }
        }; break;
        case '2': newvalues = {
            $set: {
                2: req.query.data,
            }
        }; break;
        case '3': newvalues = {
            $set: {
                3: req.query.data,
            }
        }; break;
        case '4': newvalues = {
            $set: {
                4: req.query.data,
            }
        }; break;
        case '5': newvalues = {
            $set: {
                5: req.query.data,
            }
        }; break;
    }
    console.log(newvalues)
    dbo.collection("slaves").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " document(s) updated");
    });
    console.log('newvalues')
    return res.send(myquery)
});
app.post('/slaves', function (req, res) {
    // var myquery = {  };
    console.log(req.query)
    dbo.collection("slaves").find(req.query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(JSON.stringify(result));
    })
})

app.listen(9000, 'localhost')