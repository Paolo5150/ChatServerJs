const fs = require('fs');

module.exports = {

onIndex: function(req, res) {

    fs.readFile('public/index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
},

onUsersRequest: function(req, res, allClients) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    var usersArray = []
    var idArray = []


    Object.keys(allClients).forEach(function(key) {
        usersArray.push(allClients[key].username)
        idArray.push(allClients[key].id)
      });
    var result = {'usernames': usersArray}
    result['ids'] = idArray;
      
    res.write(JSON.stringify(result));
    res.end();   
    
}


}


