const express = require('express');
const bodyparser = require('body-parser');
const mongo = require('mongoose');
const dbconfig = require('./config/db.config.js');

mongo.Promise = global.Promise;
mongo.connect(dbconfig.url,{useMongoClient:true},(err,result)=>{
    if(result){console.log('connecteed');}
    else throw err;
})

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json())

app.get('/',(q,s)=>{
    s.json({"msg":"welcome to my App"});
})

require('./app/routes/note.routes.js')(app);
app.listen(3000,()=>{
    console.log('server started');
})
