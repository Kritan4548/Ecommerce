const express = require("express")
const app = express();
const router = require("../router/");
const { MulterError } = require("multer");
const { ZodError } = require("zod");


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




app.use('/api/v1', router);
//app.use('/api/v2',router);

//404 handle
app.use((req, res, next) => {
    res.status(404).json({
        result: null,
        message: "Not found",
        meta: null
    })
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
    res.status(code).json({
        result: result,
        message: message,
        meta: null
    })
})




module.exports = app;