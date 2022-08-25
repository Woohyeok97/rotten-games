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

//폴더명 수정하기~~
const fs = require('fs');

const modifyDirectory = (a, b)=>{
  const oldDri = `./public/image/${a}`;
  const newDri = `./public/image/${b}`

  fs.rename(oldDri, newDri, (err)=>{
    if(err){ throw err; }
  })
}


router.put('/modifyData/:id', (요청, 응답)=>{
  db.collection('game_data').updateOne({ _id : ObjectId(요청.params.id) },
    { $set : {
      title : 요청.body.게임데이터.title,
      genre : 요청.body.게임데이터.genre,
      platform : 요청.body.게임데이터.platform,
      developer : 요청.body.게임데이터.developer,
      image_main : 요청.body.게임데이터.image_main, 
      tag : 요청.body.게임데이터.tag,
    } },

    (에러, 결과)=>{
      modifyDirectory(요청.body.기존네임, 요청.body.게임데이터.title);
      응답.send(결과)
    })
})

router.put('/modifyImg/:id', (요청, 응답)=>{
  //이미지를 바꾸는 코드
})

module.exports = router