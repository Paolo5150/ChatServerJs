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

    var result = `
    <h2>Online</h2>
    <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody id="usersTable">    
    `;

    Object.keys(allClients).forEach(function(key) {
        var val = allClients[key];
        result += `
        <tr>
            <td>${val.id}</td>
            <td>${val.username}</td>
        </tr>
        `
      });

      result += `
      </tbody>
      </table>
    </div>`
    res.write(result);
    res.end();
    
    console.log("Got a user request")
}


}


