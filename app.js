var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var config = require('./config') 

app.set('port',config.port);

app.get('/', function(req, res){
    res.status(200).send({
        'Messsage':'App Works!!!'
    });
});

server.listen(config.port, ()=>{
    console.log(`Server listen on ${config.domain}:${config.port}`)
})
