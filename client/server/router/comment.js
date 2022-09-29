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
  const date = new Date();
  const nowDate = new Intl.DateTimeFormat('kr',{ dateStyle : 'long' , timeStyle : 'medium' }).format(date)

  const comment = {
    parent : 요청.body.parent,
    content : 요청.body.content,
    userID : '준비중 입니다~!',
    userName : 요청.body.userName,
    date : nowDate,
    recommend : 0,
  }  
  db.collection('game_comments').insertOne(comment, (에러, 결과)=>{
    응답.send(결과)
  })
})

//게시물총개수를 프론트한테 주는코드
router.get('/total/:id', (요청, 응답)=>{
  db.collection('game_comments').find({ parent : 요청.params.id }).toArray((에러, 결과)=>{
    응답.send(결과)
  })
})

let slice = 0
//컴포넌트 처음 등장시 프론트한테 보내줄 게시물데이터
router.get('/firstload/:id', (요청, 응답)=>{
  slice = 0
  db.collection('game_comments')
  .find({ parent : 요청.params.id })
  .sort({ recommend : -1 }) // sort() -> -1은 오름차순 1은 내림차순
  .skip(slice) // skip() 파라미터 만큼 스킵하고보여줌(number)
  .limit(3) // limit() 갯수제한 파라미터 만큼만 보여줌
  .toArray((에러, 결과)=>{
    응답.send(결과)
  })
})
//더보기 버튼 클릭시 프론트한테 추가로 보내줄 게시물데이터
router.get('/moreload/:id', (요청, 응답)=>{
  slice = slice + 3
  db.collection('game_comments')
  .find({ parent : 요청.params.id })
  .sort({ recommend : -1 })
  .skip(slice)
  .limit(3)
  .toArray((에러, 결과)=>{
    응답.send(결과)
  })
})



//db.컬렉션명.find()
//쿼리문으로 DB에서 조건검색을 해야한다. 무슨 조건을줄까?
// 1. 코멘트콜렉션에서 parent 가 params.id와 일치하는 게시물 중에서
// 2. 추천수 높은 순으로 3개 를 가져옴
// 3. 3개중에 추천수가 가장낮은 게시물의 추천수를 변수에 저장함(let)
// 4. 그래서 다음에 요청을 할때 변수에 저장한 추천수보다는 낮은 게시물 3개를 추천높은순으로 가져옴 -> 그리고 변수수정

router.put('/recommend/:id', (요청, 응답)=>{
  db.collection('game_comments').updateOne({ _id : ObjectId(요청.params.id) }, { $inc : {recommend : 1}}), (에러, 결과)=>{
    응답.send(결과)
  }
})


module.exports = router