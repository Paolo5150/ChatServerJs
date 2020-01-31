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


    Object.keys(allClients).forEach(function(key) {
        usersArray.push(allClients[key].username)
      });

    var result = {'users': usersArray}
      
    res.write(JSON.stringify(result));
    res.end();   
    
}


}


