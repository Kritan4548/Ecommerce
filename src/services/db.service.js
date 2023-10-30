const {MongoClient}=require("mongodb");
class DatabaseService{
    client;

    db;
connect =()=>{
    try{
        this.client=MongoClient.connect("mongodb://127.0.0.1:27017");
    }catch(excecpt){
        next(excecpt)
    }
}
}