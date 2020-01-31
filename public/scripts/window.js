
var currentDiv = '#onlineUsers'

$(currentDiv).show();
$(window).on('hashchange', function(){

    var newDiv = window.location.hash;

    if(newDiv != currentDiv)
    {
        $(currentDiv).hide();
        currentDiv = newDiv;
        $(currentDiv).show();
        console.log('Changed to ' + newDiv)
    }
    
});