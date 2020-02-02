function OnChatLinkClicked(id)
{
    event.stopPropagation();
    event.stopImmediatePropagation();

    var request = {clientId:id}
    $.post(ServerAddress + "/userInfo", request ,function(data, status){  
        
        var msgObj = JSON.parse(data)

        if(msgObj.status == 'ok')
        {
            var payloadObj = JSON.parse(msgObj.payload)
            var username = payloadObj.username;
            $("#modalTitle").html("Chat with " + username)
            $('#chatModal').modal('show')
        }
        else
        {
            console.log('Error while fetching user info: ' + msgObj.info)
        }
    });    

    $('#chatSend').off(); //Remove previous click listener
    $('#chatSend').click(function(e){
        e.preventDefault();
        
        var txt = {"type" : "chat-message", "from" : "server", "to" : id, "payload" : $("#chatWriteArea").val()}

        socket.emit("message", JSON.stringify(txt))
        $("#chatWriteArea").val("")
       // console.log("Send message to " + id)

    })
  // 
}