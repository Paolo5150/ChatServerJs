const address = "http://localhost:3000/users"

setInterval(function(){ 

    $.get(address, function(data, status){
      $("#responseContent").html(data)
  });
  
  
  }, 500);