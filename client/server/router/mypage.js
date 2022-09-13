const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken')
const { ObjectId } = require('bson');
// const cookieParser = require('cookie-parser')

router.use(express.urlencoded({extended: true})) 
router.use(bodyParser.json())
// router.use(cookieParser());

let db;
MongoClient.connect("mongodb://qordngur156:662qor663@cluster0-shard-00-00.yu0ka.mongodb.net:27017,cluster0-shard-00-01.yu0ka.mongodb.net:27017,cluster0-shard-00-02.yu0ka.mongodb.net:27017/todoapp?ssl=true&replicaSet=atlas-dgt8k1-shard-0&authSource=admin&retryWrites=true&w=majority", { useUnifiedTopology: true }, function (에러, client) {
    db = client.db('rotten_games')
})



router.get('/myInfo',middle, (요청, 응답)=> {
    응답.send()
})

//토큰이 DB에 있는 데이터와 맞는지 중간에 검사하는 미들웨어~
//이걸 모듈화하면 다른 요청에도 쉽게 써먹을수 있겠지??
function middle(요청, 응답, next) {
    let token = 요청.cookies.x_auth;//이것이 우리가 쿠키에 저장한 JWT 토큰
    //이제 토큰을 jwt.verify()함수로 까봐서(decoded) DB에 있는 _id 와 일치하면 프론트한테 DB데이터를 줄거임!
    jwt.verify(token, 'secretToken', (err, decoded)=>{ //여기서 decoded 는 _id 를 말하는듯, (복호화 - 암호화전 상태)
        if(err) return 응답.send('에러~')
        db.collection('login').findOne({ _id : ObjectId(decoded) }, (에러, 결과)=>{
            응답.send(결과)
        })
    })
}



// const jwtMiddleware = async (요청, 응답, next)=>{

//     let token = 요청.cookies.x_auth;

//     jwt.verify(token, 'sceretToken', function(err, decoded){
//         if(err) return 응답.send({ message : '토큰인증 실패잖슴~' })

//         db.collection('login').findOne({ _id : decoded }, (에러, 결과)=>{
//             응답.send(결과)
//         })
//     })
// }

module.exports = router