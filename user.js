class User{

    constructor(id){
       this.id = id ;
    }
   
    print(){
       console.log(JSON.stringify(this));
    }

   }

module.exports = User;