
$( "#broadcastBtn" ).click(function(e) {

  e.preventDefault()
  var msg = {"type" : "server-broadcast", "payload" : $("#textArea").val()}
  socket.emit("message",JSON.stringify(msg))
  $("#textArea").val("")
  
});

setInterval(function(){ 

    $.get(ServerAddress + "/users", function(data, status){

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
            if(dataObj.usernames[i] == 'server') continue;

            result += `         
            <a href="#">
            <tr>
              <td>${dataObj.ids[i]} </td>
              <td>${dataObj.usernames[i]}</td>     
              <td><button type="button" class="ChatLink btn btn-link" id="${dataObj.ids[i]}" onClick="OnChatLinkClicked(this.id)">Chat</button></td>              

            </tr>
            </a>`

        }
      }

      $("#usersTable").html(result)

      
  });
  
  
  }, 500);