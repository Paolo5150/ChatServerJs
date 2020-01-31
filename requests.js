const fs = require('fs');

module.exports = {

onIndex: function(req, res) {

    fs.readFile('public/index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
},

onUsersRequest: function(req, res, allClientsById) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    var usersArray = []
    var idArray = []


    Object.keys(allClientsById).forEach(function(key) {
        usersArray.push(allClientsById[key].username)
        idArray.push(allClientsById[key].id)
      });
    var result = {'usernames': usersArray}
    result['ids'] = idArray;
      
    res.write(JSON.stringify(result));
    res.end();   
    
}


}


