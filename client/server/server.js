const express = require('express')
const app = express();
const cors = require('cors');
const request = require('request');

const dataDownload = require('./router/dataDownload')
const dataUpload = require('./router/dataUpload')

app.use(cors())
app.use('/', dataDownload);
app.use('/', dataUpload);


const port = 3001;
app.listen(port, ()=>{ console.log(`Listening on ${port} port!!`) });