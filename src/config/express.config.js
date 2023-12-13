const express = require("express")

const app = express();
require("./db.config")
const cors=require("cors")
const event=require("./event.config")




app.use(cors())
const router = require("../router/");
const { MulterError } = require("multer");
const { ZodError } = require("zod");
const { MongooseError } = require("mongoose");
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");


//body parser
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
//how to get data from client
//for validation we use 
//jod for backend
// and yup for frontend

//routing
// app.get()
// app.post()
// app.put()
// app.patch()
// app.delete()
//  else you can use for all this as
// app.use() //for any middleware to load
//for home page we use "/"

//shared hosting is not done in mongo always use mysql
//node is prefered with mongo db

//category
//CRUD
//http://localhost:3005/api/v1/category
//http://localhost:3005/api/v2/category
app.use('/health',(req, res, next) => {
  

    res.send("Success Ok");
})


app.use(event)
app.use('/api/v1', router);
//app.use('/api/v2',router);

const querySchmea= new GraphQLSchema({
    query:new GraphQLObjectType({
        name:"RootQuery",
        fields:{
            hello:{
                type:GraphQLString,
                resolve:()=>{
                    return "Hello World"
                }
            }
        }
    })})
    app.use("/api/v1/graphql",createHandler({
        schema:querySchmea
    }))

//404 handle
app.use((req, res, next) => {
    next({code:404,message:"Not found"})
 
})



//this is for garbage collector
//error handling midlleware
app.use((error, req, res, next) => {
    console.log("Garbage collector", error)//to see error
    let code = error.code ?? 500;
    let message = error.message ?? "Internal server error..."
    let result = error.result ?? null

    if (error instanceof MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE')
            code = 400;
        message = error.message
    }
    //TODO:Handle different type of exception
    //todo:
    if (error instanceof ZodError) {
        code = 400;
        let ZodErrors = error.errors
        let msg =[]
        ZodErrors.map((err) => {
            msg.push({
                [err.path[0]]: err.message
            })
        })
        message = "Validation failure"
        result = msg;
    }
    
      
        if(error.code === 11000){
            code=400;
            let uniqueKeys=Object.keys(error.keyPattern)
            let msgBody=uniqueKeys.map((key)=>{
                return{
           [key]: key+"should be unique"
           }
        })
        
        result=msgBody;
        message="Validation fail"
        }
    res.status(code).json({
        result: result,
        message: message,
        meta: null
    })
})




module.exports = app;