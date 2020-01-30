const address = "http://localhost:3000/users"

setInterval(function(){ 
      console.log('diocane' )
    $.get(address, function(data, status){
      $("#main").html(data)
  });
  
  
  }, 500);