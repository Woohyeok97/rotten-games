const express = require('express');
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;

let db;
MongoClient.connect("mongodb://qordngur156:662qor663@cluster0-shard-00-00.yu0ka.mongodb.net:27017,cluster0-shard-00-01.yu0ka.mongodb.net:27017,cluster0-shard-00-02.yu0ka.mongodb.net:27017/todoapp?ssl=true&replicaSet=atlas-dgt8k1-shard-0&authSource=admin&retryWrites=true&w=majority", { useUnifiedTopology: true }, function (에러, client) {
    db = client.db('rotten_games')
})

router.get('/', function(요청, 응답){
    응답.send('여기는 3001 포트~')
})
router.get('/requireGameData', function(요청, 응답){
    db.collection('game_data').find().toArray(function(에러, 결과){
        응답.send({ game : 결과 })
        if(!결과) console.log(에러)
    })
})
//아이디를 넣을 방법을 생각해보자!
router.get('/requireImage/:id', (요청, 응답)=>{
    db.collection('game_data_image').findOne({ title : 요청.params.id }, function(에러, 결과){
        응답.send(결과)
    })
})

module.exports = router