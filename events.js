
const User = require('./user')

module.exports = {

onClientDisconnect: function(client, allClients) {

    console.log('SERVER: client ' + allClients[client.id].username + ' disconnected' )
    delete allClients[client.id]
    console.log('SERVER: Client deleted, total size ' + Object.keys(allClients).length) 
},

onMessageIn: function(client, allClients, msg) {
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
        else if(msgObj.type == 'join')
        {
            var idToJoin = msgObj.payload;

            // Check that is valid room (client id)
            var clientsInRoom = io.sockets.adapter.rooms[idToJoin].sockets;
            if(Object.keys(clientsInRoom) > 0)
            {
                client.join(idToJoin);
                console.log('Client ' + allClients[client.id].username + ' joined ' + allClients[idToJoin].username);
            }
        }
   
  
  
    } catch (e) {
        console.log("SERVER: received a massege, but not JSON");
        console.log("SERVER: " + JSON.stringify(msg));
    }
  
}


}


