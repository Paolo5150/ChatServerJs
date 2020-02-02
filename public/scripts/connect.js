

const socket = io.connect(ServerAddress, {
    'reconnection': false,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax' : 2000,
    'reconnectionAttempts': 1
});

socket.on('connect', function (err) {
    console.log('Connected')
    var msg = {'type': 'intro', 'username' : 'server'}
    socket.emit('message',JSON.stringify(msg))


  })

  socket.on('disconnect', function (err) {
    console.log('Disconnected')


  })