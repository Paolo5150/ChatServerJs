const io = require('socket.io-client')



//const socket = io.connect('https://chat-serverjs.herokuapp.com/')
const socket = io.connect('http://localhost:3000');

socket.on('error', function (err) {
  console.log('received socket error:')
  console.log(err)
})

socket.on('connect', function (err) {
  console.log('Client connected')
  socket.emit('intro','Zazabazula')
 // setInterval(myFunc,1000,'');

})

socket.on('msg', function (m) {
  console.log(m)
})

function CheckConnection(arg) {
  console.log('Connection status: ' + socket.connected);
}

socket.on('disconnect', function (err) {
  console.log('Client disconnected')

})


