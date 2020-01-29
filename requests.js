const fs = require('fs');

module.exports = {

onIndex: function(req, res) {

    fs.readFile('public/index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
},

onHello: function(req, res, allClients) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('Clients ' + Object.keys(allClients).length);
    res.end();
    
    console.log("Got a hello")
}


}


