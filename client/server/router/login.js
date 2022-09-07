const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const cookieParser = require('cookie-parser')

router.use(express.urlencoded({extended: true})) 
router.use(bodyParser.json())
router.use(cookieParser());

//MongoDB 연결하기
let db;
MongoClient.connect("mongodb://qordngur156:662qor663@cluster0-shard-00-00.yu0ka.mongodb.net:27017,cluster0-shard-00-01.yu0ka.mongodb.net:27017,cluster0-shard-00-02.yu0ka.mongodb.net:27017/todoapp?ssl=true&replicaSet=atlas-dgt8k1-shard-0&authSource=admin&retryWrites=true&w=majority", { useUnifiedTopology: true }, function (에러, client) {
    db = client.db('rotten_games')
})


//JWT 토큰 발행하기!
const jwt = require('jsonwebtoken')

router.post('/login', (요청, 응답)=>{
  db.collection('login').findOne({ id : 요청.body.아이디 }, (에러, 결과)=>{
    if(!결과) return 응답.send('없는 아이디 인디요?');
    if(결과.pw == 요청.body.비밀번호) {
      let token = jwt.sign(결과._id.toHexString(), 'secretToken')
      return 응답.cookie("x_auth", token).send({ message : '쿠키를 확인해보세요!', data : token })

    } else {
      return 응답.send('비번이 틀린뎁쇼?')
    }
  })
})




module.exports = router