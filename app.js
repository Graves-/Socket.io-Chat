var express = require("express");
var exphbs  = require('express-handlebars');
var app = express();
var port = 3700;

//EXPRESS
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//SERVE STATIC CONTENT
app.use(express.static('public'));

app.get("/", function(req, res){
    //res.sendFile(__dirname + '/index.html');
    res.render('home');
});

var io = require('socket.io').listen(app.listen(port));
console.log("Listening on port " + port);

io.on('connection', function(socket){

  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

});