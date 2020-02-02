
const User = require('./user')

module.exports = {

onClientDisconnect: function(client, allClientsById,allClientsByUsername) {

    if(allClientsById[client.id] != undefined)
    {

        console.log('SERVER: client ' + allClientsById[client.id].username + ' disconnected' )
        delete allClientsByUsername[allClientsById[client.id].username]
        delete allClientsById[client.id]
        
        console.log('SERVER: Client deleted, total size ' + Object.keys(allClientsById).length)
    }

},

onMessageIn: function(client, allClientsById, allClientsByUsername,msg) {
    try {
        var msgObj = JSON.parse(msg);
        
        // Intro type: the user just connected and it's sending username
        if(msgObj.type === 'intro')
        {
            var username = msgObj.username;

            // Check if client already connected
            if(allClientsById[client.id] != undefined)
            {
                console.log('Client already connected!')
            }
            else if(allClientsByUsername[username] != undefined)
            {
                console.log('Username'  + username +' already taken!')

                var msg = {'type' : 'intro-status', 'status' : 'fail', 'info':'Username already taken'}
                client.emit('message',JSON.stringify(msg))
            }
            else{
                // Username and client id accepteds
                AddUser(msgObj,client,allClientsById,allClientsByUsername)
          }
  
          
          //client.broadcast.emit('message','hello from ' + us.username); 
        }  
        else if(msgObj.type === 'message')
        {
            console.log(msgObj.payload)
        }
        else if(msgObj.type === 'server-broadcast')
        {
            console.log("Broadcasting")
            console.log(msgObj.payload)
            var broad = {"type" : "server-message", "payload" : msgObj.payload}
            io.emit('message', JSON.stringify(broad))
        }
  
    } catch (e) {
        console.log("SERVER: received a massege, but not JSON");
        console.log("SERVER: " + JSON.stringify(msg));
    }
  
}

}

function AddUser(msgObj,client,allClientsById,allClientsByUsername )
{
      // Username and client id accepteds

                // Create user
                var us = new User(client.id);
        
                // Create additional variables
                us.username = msgObj.username;
                us.socket = client;
        
                // Add to lists
                allClientsById[client.id] = us;
                allClientsByUsername[us.username] = us;
                
                console.log('SERVER: Added client')
                console.log('\tUsername: ' + us.username)
                console.log('\tId: ' + client.id)
                console.log('SERVER: Total clients: ' + Object.keys(allClientsById).length)

                var msg = {'type' : 'intro-status', 'status' : 'ok'}
                client.emit('message',JSON.stringify(msg))
}


