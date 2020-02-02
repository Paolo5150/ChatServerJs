const address = "http://localhost:3000/users"


$( "#broadcastBtn" ).click(function(e) {

  e.preventDefault()
  var msg = {"type" : "server-broadcast", "payload" : $("#textArea").val()}
  socket.emit("message",JSON.stringify(msg))
  $("#textArea").val("")
  
});

setInterval(function(){ 

    $.get(address, function(data, status){

      var dataObj = JSON.parse(data);
      var result = ""
      if(dataObj.usernames == null || dataObj.usernames.length == 0)
        {
            // Should display 'no users'?
            $("#broadcastForm").hide();
        }
      else
        {
          // Display edit text for broadcasting from server
          $("#broadcastForm").show();
          for (var i=0; i<dataObj.usernames.length; i++) {

            result += `         
            <a href="#">
            <tr>
              <td>${dataObj.ids[i]} </td>
              <td>${dataObj.usernames[i]}</td>     
              <td><a href="#">Chatlink</a></td>              

            </tr>
            </a>`

        }
      }

      $("#usersTable").html(result)

      
  });
  
  
  }, 500);