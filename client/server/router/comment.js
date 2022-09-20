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

let recommend = 0

// router.get('/loadComment/:id', (요청, 응답)=>{
//   db.collection('game_comments').find({ parent : 요청.params.id }).toArray((에러, 결과)=>{
//     응답.send(결과)
//   })
// })

router.get('/loadComment/:id', (요청, 응답)=>{
  db.collection('game_comments')
  .find({ $and : [{ parent : 요청.params.id }]})
  .sort({ recommend : -1 })
  .skip(recommend)
  .limit(3)
  .toArray((에러, 결과)=>{
    recommend = recommend + 3
    응답.send(결과)
  })
})

router.post('/reset', (요청, 응답)=>{
  recommend = 0;
  응답.send()
})
//db.컬렉션명.find()
//쿼리문으로 DB에서 조건검색을 해야한다. 무슨 조건을줄까?
// 1. 코멘트콜렉션에서 parent 가 params.id와 일치하는 게시물 중에서
// 2. 추천수 높은 순으로 3개 를 가져옴
// 3. 3개중에 추천수가 가장낮은 게시물의 추천수를 변수에 저장함(let)
// 4. 그래서 다음에 요청을 할때 변수에 저장한 추천수보다는 낮은 게시물 3개를 추천높은순으로 가져옴 -> 그리고 변수수정

router.get('/recommend/:id', (요청, 응답)=>{
  db.collection('game_comments').updateOne({ _id : ObjectId(요청.params.id) }, { $inc : {recommend : 1}}),
  (에러, 결과)=>{
    응답.send(결과)
  }
})



module.exports = router