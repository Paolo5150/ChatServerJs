const address = "http://localhost:3000/users"

setInterval(function(){ 

    $.get(address, function(data, status){
      $("#main").html(data)
  });
  
  
  }, 500);