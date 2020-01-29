const io = require('socket.io-client')
const Message = require('./message')
var USERNAME;

//const socket = io.connect('https://chata-serverjs.herokuapp.com/')
const socket = io.connect('http://localhost:3000');

var myArgs = process.argv.slice(2); //Remove first 2 args

if(myArgs.length == 1)
{
  USERNAME = myArgs[0];
}

socket.on('error', function (err) {
  console.log('received socket error:')
  console.log(err)
})

socket.on('connect', function (err) {
  console.log('Client connected')

  var msg = {'type':'intro'};
  msg['payload'] = USERNAME

  socket.emit('message',JSON.stringify(msg))

})

socket.on('message', function (m) {
  console.log(m)
})

function CheckConnection(arg) {
  console.log('Connection status: ' + socket.connected);
}

socket.on('disconnect', function (err) {
  console.log('Client disconnected')

})


