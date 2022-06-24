const express = require('express')
const app = express();
const cors = require('cors');
const request = require('request');

const basic = require('./router/index')
const upload = require('./router/dataUpload')

app.use(cors())
app.use('/', basic);
app.use('/', upload);


const port = 3001;
app.listen(port, ()=>{ console.log(`Listening on ${port} port!!`) });