const {Sequelize}=require("sequelize")

const sequelize=new Sequelize(
    "mern-25",
    "postgres",
    null,{
        host:"localhost",
        port:5432,
        dialect:"postgtres"
    }
)
const testConnection=async()=>{
    try{
        await sequelize.authenticate();
        console.log("PG server connected...")
    }catch(exception){
        console.log("PG server connection error")
        console.log(exception);
    }
}
testConnection()
module.exports=sequelize