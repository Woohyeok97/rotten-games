const express = require('express')
const app = express();

const http = require('http').createServer(app)
const io =  require('socket.io',{ cors : { origin :"*", credentials :true } })(http)
//현재 서버가 소켓의 서버임을 설정
const cors = require('cors');


const request = require('request');
const cookieParser = require('cookie-parser')

const dataDownload = require('./router/dataDownload')
const dataUpload = require('./router/dataUpload')
const dataModify = require('./router/dataModify')
const comment = require('./router/comment')
const login = require('./router/login')
const mypage = require('./router/mypage');


app.use(cors({origin : true, credentials : true}))
app.use('/', dataDownload);
app.use('/', dataUpload);
app.use('/', dataModify)
app.use('/', comment)
app.use('/', login)
app.use('/', mypage)


//socket을  사용할땐 app.listen 말고 http.listen을 사용함
const port = 3001;
http.listen(port, ()=>{ console.log(`Listening on ${port} port!!`) });

io.on('connetion', (socket)=>{ 
    console.log('연결됬어요');
    socket.on('test', (req) => {
		console.log(req);
	});

    socket.on('disconnetion', ()=>{
        
    })
})

//socket 에서 중요한 함수 2가지
// 1. socket.on('이벤트명', (파라미터)=>{ 실행할코드 })
// > 클라이언트로 부터 이벤트를 받고 코드를 실행함, 파라미터에는 클라이언트가 보낸 데이터가 들어있음!
// 2. socket.emit('이벤트명, data)
// > 서버에서 이벤트명을 지정하고 data 를 클라이언트로 보냄

// 커스텀이벤트명령어가 아닌 socket.io 기본 이벤트명령어
// 1. 'connetion' -> '클라이언트와 연결되었을때'
// 2. 'disconnetion' -> '클라이언트와 연결이 해제되었을때'