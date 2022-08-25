const express = require('express')
const app = express();
const cors = require('cors');
const request = require('request');

const dataDownload = require('./router/dataDownload')
const dataUpload = require('./router/dataUpload')
const dataModify = require('./router/dataModify')
const comment = require('./router/comment')

app.use(cors())
app.use('/', dataDownload);
app.use('/', dataUpload);
app.use('/', dataModify)
app.use('/', comment)


const port = 3001;
app.listen(port, ()=>{ console.log(`Listening on ${port} port!!`) });