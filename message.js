class Message{

    constructor(type,payload){
       this.type = type ;
       this.payload = payload;
    }
   
    print(){
       console.log(JSON.stringify(this));
    }

   }

module.exports = Message;