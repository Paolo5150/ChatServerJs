var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
    io = require('socket.io').listen(server);

class User {
  constructor(id, username,socket) {
    this.id = id;
    this.username = username;
    this.socket = socket;
  }
}

var allClients = new Object();
var myArgs = process.argv.slice(2); //Remove first 2 args

var PORT = 3000;

if(myArgs.length == 1)
{
  PORT = myArgs[0];
}

PORT = process.env.PORT || PORT;
console.log("Custom port detected: " + PORT);

io.on('connection', function (client) {
  
  client.on('disconnect', function () {    
    console.log('SERVER: client disconnect...', allClients[client.id].username)
    delete allClients[client.id]
    console.log('SERVER: Client deleted, total size ' + Object.keys(allClients).length)
    
  })

  client.on('error', function (err) {
    console.log('SERVER: received error from client:', client.id)
    console.log(err)
  })

  client.on('chat-msg', function(msg){

  });

  function CheckConnection(arg) {

    Object.keys(allClients).forEach(function(key) {
      console.log('SERVER: Connection with ' + allClients[key].username + ': '  +  allClients[key].socket.connected);
      
    });

  }

  client.on('intro', function(msg){

    var us = new User();
    us.id = client.id;
    us.username = msg;
    us.socket = client;
    allClients[client.id] = us;    

    console.log('SERVER: Client ' + us.username +' added, total size ' + Object.keys(allClients).length)
    client.broadcast.emit('msg','hello from ' + us.username);

   
    setInterval(CheckConnection,1000,'');




  });
})

server.listen(process.env.PORT || PORT, function (err) {
  if (err) throw err
  console.log('SERVER: listening on port ' + PORT)
})

