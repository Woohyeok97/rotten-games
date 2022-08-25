const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('bson');

router.use(express.urlencoded({extended: true})) 
router.use(bodyParser.json())

//MongoDB 연결하기
let db;
MongoClient.connect("mongodb://qordngur156:662qor663@cluster0-shard-00-00.yu0ka.mongodb.net:27017,cluster0-shard-00-01.yu0ka.mongodb.net:27017,cluster0-shard-00-02.yu0ka.mongodb.net:27017/todoapp?ssl=true&replicaSet=atlas-dgt8k1-shard-0&authSource=admin&retryWrites=true&w=majority", { useUnifiedTopology: true }, function (에러, client) {
    db = client.db('rotten_games')
})

router.post('/commentUpload', (요청, 응답)=>{
  const comment = {
    parent : 요청.body.parent,
    content : 요청.body.content,
    userID : '준비중 입니다~!',
    userName : '고나우',
    date : '기원전 2333년',
    recommend : 0,
  }  
  db.collection('game_comments').insertOne(comment, (에러, 결과)=>{
    응답.send(결과)
  })
})

router.get('/loadComment/:id', (요청, 응답)=>{
  db.collection('game_comments').find({ parent : 요청.params.id }).toArray((에러, 결과)=>{
    응답.send(결과)
  })
})

router.get('/recommend/:id', (요청, 응답)=>{
  db.collection('game_comments').updateOne({ _id : ObjectId(요청.params.id) }, { $inc : {recommend : 1}}),
  (에러, 결과)=>{
    응답.send(결과)
  }
})



module.exports = router