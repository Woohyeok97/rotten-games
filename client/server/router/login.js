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

//로그인 관련 라이브러리 셋팅 & 미들웨어 등록
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

router.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
router.use(passport.initialize());
router.use(passport.session()); 


// router.post('/login', passport.authenticate('local', {failureRedirect : '/fail'}), (요청, 응답)=>{
//   응답.redirect('/')
// })

router.post('/login', (요청, 응답)=>{
  db.collection('login').findOne({ id : 요청.body.아이디 }, function(에러, 결과) {
    if(!결과) return 응답.send('없는 아이디 인디요!?')
    if(결과.pw === 요청.body.비밀번호) {
      return 응답.send('둘다맞아요~')
      //둘다 맞으면 jwt 생성하면 되겠네
    } else {
      응답.send('비번이 틀렸는디요?')
    }
  })
})




//입력한 아이디 & 비번이 DB에 있는것과 같은지 비교하는 코드
passport.use(new LocalStrategy({
  usernameField: 'id', //해당 input의 name
  passwordField: 'pw', //해당 input의 name
  session: true, //세션을 발행해 줄것인지
  passReqToCallback: false, //로그인시 추가적인 정보를 요구할것인지 
  //여기서 부터는 아이디 & 비번 비교
}, function (입력한아이디, 입력한비번, done) {
  //console.log(입력한아이디, 입력한비번);
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)

    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' })
    if (입력한비번 == 결과.pw) { //참고로 비밀번호를 비교할때는 암호화 해서 비교하는게 보안에 더 좋다
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

//세션데이터 발급하기
//▽ '세션데이터' 를 만들어주고 세션데이터의 '세션아이디'를 쿠키로 만들어 사용자의 브라우저에 보내줌
passport.serializeUser(function (user, done) {
  done(null, user.id)
});
//▽
passport.deserializeUser(function (아이디, done) {
  done(null, {})
}); 

module.exports = router