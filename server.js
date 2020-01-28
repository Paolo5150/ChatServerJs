const User = require('./user')
const Library = require('./library')
const fs = require('fs');

var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
    io = require('socket.io').listen(server);

const fileWriter = require('fs');
const LOG_FILE = "log.txt";

var allClients = new Object();
var myArgs = process.argv.slice(2); //Remove first 2 args

var PORT = 3000; // Default port

if(myArgs.length == 1)
{
  PORT = myArgs[0];
}

PORT = process.env.PORT || PORT;
console.log("Custom port detected: " + PORT);

app.get('/', function (req, res) {
  fs.readFile('public/index.html',function (err, data){
    res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
    res.write(data);
    res.end();
});

})

app.get('/hello', function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Clients ' + Object.keys(allClients).length);
  res.end();
  
  console.log("Got a hello")
})

io.on(Library.CONNECTION_EVENT, function (client) {

  console.log('SERVER: someone connected, id: ' + client.id)
  
  // Define client event handlers
  client.on(Library.DISCONNECTION_EVENT, function () {    
    console.log('SERVER: client ' + allClients[client.id].username + ' disconnected' )
    delete allClients[client.id]
    console.log('SERVER: Client deleted, total size ' + Object.keys(allClients).length)    
  })

  client.on(Library.ERROR_EVENT, function (err) {
    console.log('SERVER: received error from client:', client.id)
    
    console.log(err)
  })

  client.on(Library.MSG_EVENT, function(msg){

    try {
      var msgObj = JSON.parse(msg);
      
      // Intro type: the user just connected and it's sending username
      if(msgObj.type === 'intro')
      {
        // Create user
        var us = new User(client.id);

        // Create additional variables
        us.username = msgObj.payload;
        us.socket = client;

        // Add to list
        allClients[client.id] = us;
        
        console.log('SERVER: Client ' + us.username+' added, total size ' + Object.keys(allClients).length)
        
        //client.broadcast.emit('message','hello from ' + us.username); 
      }
 


  } catch (e) {
      console.log("SERVER: received a massege, but not JSON");
      console.log("SERVER: " + JSON.stringify(msg));
  }


  });
})

// Start listening
server.listen(process.env.PORT || PORT, function (err) {
  if (err) throw err
  console.log('SERVER: listening on port ' + PORT)
})

