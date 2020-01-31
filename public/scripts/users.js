const address = "http://localhost:3000/users"

setInterval(function(){ 

    $.get(address, function(data, status){

      var dataObj = JSON.parse(data);
      var result = ""
      if(dataObj.usernames == null || dataObj.usernames.length == 0)
        {

        }
      else
        {
         
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