const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;

router.use(express.urlencoded({extended: true})) 
router.use(bodyParser.json())

//MongoDB 연결하기
let db;
MongoClient.connect("mongodb://qordngur156:662qor663@cluster0-shard-00-00.yu0ka.mongodb.net:27017,cluster0-shard-00-01.yu0ka.mongodb.net:27017,cluster0-shard-00-02.yu0ka.mongodb.net:27017/todoapp?ssl=true&replicaSet=atlas-dgt8k1-shard-0&authSource=admin&retryWrites=true&w=majority", { useUnifiedTopology: true }, function (에러, client) {
    db = client.db('rotten_games')
})

//멀터로 이미지 올리기
let multer = require('multer');
let storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './public/image')
    },
    filename : function(req, file, cb){
        cb(null,`${Date.now()}_${file.originalname}` )
    }
})
let upload = multer({storage : storage}).single('game_image');

// router.post('/imageUpload', upload, (요청, 응답)=>{
//     응답.send({ filename : 응답.req.file.filename })
// })
router.post('/imageUpload', upload, (요청, 응답)=>{
    응답.send({ filename : 요청.file.filename })
})

router.post('/addgame', function(요청, 응답){
    let 게임데이터 = {
        title : 요청.body.게임데이터.title,
        genre : 요청.body.게임데이터.genre,
        image_main : 요청.body.url,
        platform : 요청.body.게임데이터.platform,
        developer : 요청.body.게임데이터.developer,
        tag : 요청.body.게임데이터.tag
    }
    db.collection('game_data').insertOne(게임데이터 , function(에러, 결과){
        if(!결과) { console.log(에러) }
        console.log(결과)
    })
    응답.send(게임데이터)
})

router.get('/aa', (요청, 응답)=>{
    응답.sendStatus(200)
})
module.exports = router