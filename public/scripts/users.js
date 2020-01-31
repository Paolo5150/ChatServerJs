const address = "http://localhost:3000/users"


$( "#broadcastBtn" ).click(function() {

  var message = $("#textArea").val();
  $.post("http://localhost:3000/msg", {Request: message}, function(result){
    $("#textArea").val("")

  });
  
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
            <tr>
              <td>${dataObj.ids[i]}</td>
              <td>${dataObj.usernames[i]}</td>
            </tr>`

        }
      }

      $("#usersTable").html(result)

      
  });
  
  
  }, 500);