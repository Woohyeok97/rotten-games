const express = require('express')
const app = express();
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


const port = 3001;
app.listen(port, ()=>{ console.log(`Listening on ${port} port!!`) });