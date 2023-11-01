const dotenv = require('dotenv')
dotenv.config();

const {z} = require("zod")

const mailSvc = require('../../services/mail.service');
const authSvc = require('./auth.services');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const AuthRequest = require('./auth.request');
const { getTokenFromHeader } = require('../../config/helpers');

class AuthController {
    register = async (req, res, next) => {
        try {
       let payload=(new AuthRequest(req)).transformRequestData();
            
            // let response = await dbSvc.db.collection('users').insertOne(payload)
            let response = await authSvc.registerUser(payload)
            
            
            let mailMsg = authSvc.registerEmailMessage(payload.name, payload.token)
            await mailSvc.emailSend(
                payload.email,
                "Activate your account!",
                mailMsg
            )

            res.json({
                result: response, 
                msg: 'User registered successfully.',
                meta: null
            })
            // business  ... excep
            // next()
        } catch(except) {
            // ZodError
            next(except)
        }
    }

    verifyToken = async (req, res, next) => {
        try {
            let token = req.params.token;
            
            // query 
            let userDetail = await authSvc.getuserByFilter({
                token: token
            });

            if(userDetail) {
                res.json({
                    result: userDetail, 
                    msg: "token verified",
                    meta: null
                })
            } else {
                next({code: 400, message: "Token does not exists", result: {token}})
            }
        } catch(excep) {
            next(excep)
        } 
    }

    async setpassWord(req, res, next) {
        try {
            let data  = req.body
            let token = req.params.token
            let userDetail= await authSvc.getuserByFilter({
                token: token
            })
            if(userDetail){

                let encPass = bcrypt.hashSync(data.password, 10);
            
                const updateData = {
                    password: encPass,
                    token: null, 
                    status: 'active'
                }

                let updateResponse = await authSvc.updateUser({token:token}, updateData)

                res.json({
                    result: updateResponse, 
                    message: "User Activated successfully",
                    meta: null
                })

            } else {
                next({code: 400, message: "User does not exists/token expired/broken", result: data})
            }
        } catch(excecpt){
            next(excecpt)
        }
    }

    async login(req, res, next) {
        try {
            // 
            let credentials = req.body;

            let userDetail=await authSvc.getuserByFilter({
                email:credentials.email
            })
           
            // TODO: Database user fetch, email ===> register 
            // let userDetail = {
            //     _id: "qw12314",
            //     name: "Sandesh Bhattarai",
            //     email: "sandesh@broadwayinfosys.com",
            //     role: "admin",
            //     status: "active",
            //     token: null,
            //     password: "$2a$10$B8i269ef8VVr0BXqJi67k.wQDjRF4CqzHG1h53BnDKHdXJ4ZELQyS"
            // }

           
           if(userDetail){
if(userDetail.token===null && userDetail.status ==="active"){
if(bcrypt.compareSync(credentials.password,userDetail.password)){
//user login
let token=jwt.sign({
    userId:userDetail._id
},process.env.JWT_SECRET,{
    expiresIn:"1h"
})
let refreshToken=jwt.sign({
    userId:userDetail._id
},process.env.JWT_SECRET,{
    expiresIn:"1d"
})
let patData={
    userId:userDetail._id,
    token:token,
    refreshToken:refreshToken
}
await authSvc.storePAT(patData)
res.json({
    result:{
        token:token,
        refreshToken:refreshToken,
        type:"Bearer"
    }
})
}else{
    next({code:400,message:"Credential does not match."})
}
}else{
    next({code:401,message:"User not activated.Check your email for activation process."})
}
           }else{
            next({code:400,message:"User does not exists"})
           }
        } catch(except) {
            next(except)
        }

    }

    getLoggedInUser(req, res, next) {
        //
        res.json({
            result: req.authUser
        })
    }
    logoutUser=async(req,res,next)=>{
        try{
            let user=req.authUser
            let token=getTokenFromHeader(req);
            let loggedout=await authSvc.deletePatData(token);
        }catch(exception){
            next(exception)
        }
    }
}


const authCtrl = new AuthController()
module.exports = authCtrl;