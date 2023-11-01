require('dotenv').config()
const jwt = require("jsonwebtoken");

const authSvc = require('../app/auth/auth.services');
const { getTokenFromHeader } = require('../config/helpers');
const CheckLogin = async (req, res, next) => {
    try {
        let token=getTokenFromHeader(req);
        // token => null, "Bearer token", "token"
        if(token === null) {
            next({code: 401, message: "Login required."})
        } else {
            // token => "Bearer token", "token", "Bearer ", ""
            // "Bearer token" => ["Bearer", "token"]
            // "token" => ["token"]
            token = (token.split(" ")).pop();
            if(!token){
                next({code: 401, message: "Token required."})
            } else {
                //TODO: Db exists exists
                let patData =await authSvc.getPatData();
                if(patData){
                    let data = jwt.verify(token, process.env.JWT_SECRET)
                    // let data  = jwt.decode(token)
                    // {userId: "", iat: "", exp: ""}
                    // TODO: DB verify payload 
    
                    let userDetail = await authSvc.getuserByFilter({
                        _id:data.userId
                    })
                       
                
    
                    if(userDetail) {
                        req.authUser = userDetail;
                        next()
                    } else {
                        next({code: 401, message: "User does not exists anymore"})
                    }
                }else{
                    next({code:401,message:"Token already expired or invalid"})
                }
                
         
    
            }
        }
    } catch(exception) {
        console.log(exception)
        next({code: 401, message: exception.message})
    }
}


module.exports = CheckLogin;