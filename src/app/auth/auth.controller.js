const {z}=require("zod")
const dotenv=require("dotenv")
dotenv.config()
const nodemailer=require("nodemailer")
const {generateRandomString}=require("../../config/helpers");
const mailSvc=require("../../services/mail.service");
const authSvc=require('./auth.services');
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken");
const { MongoClient } = require("mongodb");

class AuthController {
    register = async (req, res, next) => {

        try {
            let payload = req.body;
            let token=req.params.token
            //{name:"",email:"",role:'',image:""}

          

            //valildate
            //zod,joi,yup,ajv,class-validator
            // if(!payload.name===null||payload.name==="null"){
            //     next({code:400,message:"Validation Failure",result:{name:"Name is required"}})
            // }
            // if(!payload.email===null||payload.email==="null"){
            //     next({code:400,message:"Validation Failure",result:{email:"Email"}})
            // }else if()
            //file
            if (req.file) {
                payload.image = req.file.filename;
            } else if (req.files) {
                payload.image = req.files.map((item) => item.filename);
            }
            payload.status="inactive"
            payload.token=generateRandomString();
//TODO DB STORE
const client=await MongoClient.connect("mongodb://127.0.0.1:27017/");
//const conn=client.connect()
const db=client.db("api-24")


//query
let response=await db.collection('users').insertOne(payload)


// let mailMsg=authSvc.registerEmailMessage(payload.name,payload.token)
// await mailSvc.emailSend(
//     payload.email,
//     "Activate your account!",
//     mailMsg
// )
 
//let encPass=bcrypt.hashSync(data.password,10)
        

            res.json({
                result: response,
                msg:"User register succesful",
                meta:null
            })
        } catch (except) {
            next(except)//goes to express.config error handler
            // res.json({
            //     result:except,
            //     message:"error",
            //     meta:null
            // })
        }
    

    }
    async login(req, res, next) {
        try {
            // 
            let credentials = req.body;
            // TODO: Database user fetch, email ===> register 
            let userDetail = {
                _id: "qw12314",
                name: "Sandesh Bhattarai",
                email: "sandesh@broadwayinfosys.com",
                role: "admin",
                status: "active",
                token: null,
                password: "$2a$10$B8i269ef8VVr0BXqJi67k.wQDjRF4CqzHG1h53BnDKHdXJ4ZELQyS"
            }

            if(bcrypt.compareSync(credentials.password, userDetail.password)){
                // user login 
                let token = jwt.sign({
                    userId: userDetail._id
                },process.env.JWT_SECRET, {
                    expiresIn: "1h"
                })

                let refreshToken = jwt.sign({
                    userId: userDetail._id
                },process.env.JWT_SECRET, {
                    expiresIn: "1d"
                })

                res.json({
                    result: {
                        token: token,
                        refreshToken: refreshToken, 
                        type: "Bearer "
                    }
                })   
            } else {
                next({code: 400, message: "Credential does not match."})
            }
        } catch(except) {
            next(except)
        }

    }


        verifyToken = async (req, res, next) => {
            try {
                let token = req.params.token;
                // TODO: DB Query DB
                let client=await MongoClient.connect("mongodb://127.0.0.1:27017")
                const db=client.db('api-24')


                //query
                let userDetail=await db.collection('users').findOne({
                    token:token
                })
                if(userDetail){
                    res.json({
                        result:userDetail,
                        msg:"token verified",
                        meta:null
                    })
                }else{
                    next({code:400,message:"Token does not exists",result:{token}})
                }
              
            } catch(excep) {
                next(excep)
            } 
        }

        

       async setPass(req, res, next) {
        try {
            let data  = req.body
            let token =req.params.token
            let encPass=bcrypt.hashSync(data.password,10)
            res.json({
                result: {
                    password:encPass
                }
            })
        } catch(excecpt){
            next(excecpt)
        }
    }

        
        setLogin = (req, res, next) => {

        }
        forgetPswd = (req, res, next) => {

        }
        checkMe = (req, res, next) => {

        }
        setLogout = (req, res, next) => {

        }

    }
const authCtrl = new AuthController()

module.exports = authCtrl;