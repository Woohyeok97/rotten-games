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

//Multer 셋팅
let multer = require('multer');
let disk = ''
let storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, `./public/image/${disk}`)
  },
  filename : function(req, file, cb){
    cb(null,`${Date.now()}_${file.originalname}` )
  }
})
// let upload = multer({storage : storage}).single('game_image');
let upload = multer({storage : storage}).fields([
  { name : 'main_img' },
  { name : 'background_img' },
  { name : 'images' , maxCount : 6 }
])

//이미지 저장폴더 만들기 함수
const fs = require('fs');
const { ObjectId } = require('bson');
const makeFolder = (dir) => {
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
  }
}

//게임데이터 업로드 요청
router.post('/addgame', function(요청, 응답){
  let 게임데이터 = {
      title : 요청.body.title,
      genre : 요청.body.genre,
      platform : 요청.body.platform,
      developer : 요청.body.developer,
      image_main : '', 
      tag : 요청.body.tag,
    }

  disk = 요청.body.title
  
  db.collection('game_data').insertOne(게임데이터 , function(에러, 결과){
      if(!결과) console.log(에러) 
      makeFolder(`./public/image/${disk}`)
      응답.send(결과)
  })  
})

//이미지 저장요청
router.post('/imageUpload', upload, (요청, 응답)=>{ 
  //요청.file.filename 은 여기서 쓸수있으니까
  //DB 이미지 콜렉션에 저장하는 코드는 여기에 작성해야겠네!
  //그리고 부모 콜렉션 gameData를 가리킬수있게 부모 _id 를 저장해야겠네!
  let gameImage = {
    title : 요청.body.title,
    parent : 요청.body.parentId,
    image_main : 요청.files.main_img[0].filename,
    image_background : 요청.files.background_img[0].filename,
    youtube_url : 요청.body.youtube_url 
  }
  db.collection('game_data_image').insertOne(gameImage, (에러, 결과)=>{
    if(!결과) console.log(에러)
  })
  db.collection('game_data').updateOne({ _id : ObjectId(요청.body.parentId) }, { $set : { image_main : 요청.files.main_img[0].filename }},(에러, 결과)=>{
    if(!결과) console.log(에러)
  })
  
  응답.status(200).send({ message : '이미지 저장성공!' })
  console.log(요청.files.main_img[0].filename)
  console.log(요청.files.background_img[0].filename)
  응답.send()
})






router.delete('/delall', (요청, 응답)=>{
  db.collection('game_data').remove((에러, 결과)=>{})
  db.collection('game_data_image').remove((에러, 결과)=>{})
  응답.send(console.log('삭제완료'))
})

module.exports = router