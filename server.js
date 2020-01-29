const User = require('./user')
const Library = require('./library')
const fs = require('fs');
const requests = require('./requests')
const events = require('./events')


var express = require('express'),
    app = express(),
    server = require('http').createServer(app);
    io = require('socket.io').listen(server);


var allClients = new Object();
var myArgs = process.argv.slice(2); //Remove first 2 args

var PORT = 3000; // Default port

if(myArgs.length == 1)
{
  PORT = myArgs[0];
}

PORT = process.env.PORT || PORT;
console.log("Custom port detected: " + PORT);

// Http requests
app.get('/', function (req, res) {
  requests.onIndex(req,res);

})

app.get('/users', function (req, res) {
  requests.onUsersRequest(req,res, allClients)
})  

// Events
io.on(Library.CONNECTION_EVENT, function (client) {

  console.log('SERVER: someone connected, id: ' + client.id)
  
  // Client disconnect
  client.on(Library.DISCONNECTION_EVENT, function () {    
    events.onClientDisconnect(client,allClients)
  })

  client.on(Library.ERROR_EVENT, function (err) {
    console.log('SERVER: received error from client:', client.id)    
    console.log(err)
  })

  client.on(Library.MSG_EVENT, function(msg){
    events.onMessageIn(client,allClients,msg)
   });
})

// Start listening
server.listen(process.env.PORT || PORT, function (err) {
  if (err) throw err
  console.log('SERVER: listening on port ' + PORT)
})


module.exports = app;
