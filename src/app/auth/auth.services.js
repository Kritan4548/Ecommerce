
const UserModel=require("../user/user.model")
const PATModel = require("./personal-access-token.model")
require("dotenv").config()
class AuthService {
    registerEmailMessage(name,token){
        //todo:db table msg
        return `
        <b>Dear ${name}</b><br/>
        <p>Your account has been succesfully registered.Please copy or click the link below to activate your account:</p>
        <a href="${process.env.FRONTEND_URL}/activate/${token}">
        ${process.env.FRONTEND_URL}/activate/${token}
        </a>
        <br/>
        <p>
        <b>Regards</b>
        </p>
        <p>
        <b>System Admin</b>
        </p>
        <em><small>please do not respond to this email</small></em>
        </p>
        `
    }
    forgetPasswordMessage(name,token){
        //todo:db table msg
        return `
        <b>Dear ${name}</b><br/>
        <p>Please check the link below for resetting your password</p>
        <a href="${process.env.FRONTEND_URL}/activate/${token}">
        ${process.env.FRONTEND_URL}/activate/${token}
        </a>
        <br/>
        <p>
        <b>Regards</b>
        </p>
        <p>
        <b>System Admin</b>
        </p>
        <em><small>please do not respond to this email</small></em>
        </p>
        `
    }
    registerUser = async (payload) => {
        try {
            let user=new UserModel(payload)
            let response=await user.save();
           // let response = await this.db.collection('users').insertOne(payload)
            return response;
        } catch(excpetion) {
            throw excpetion
        }
    }

    getuserByFilter = async(filter) => {
        try {
            let userDetail = await  UserModel.findOne(filter) 
            return userDetail;
        } catch(exception) {
            throw exception;
        }
    }
    storePAT=async(data)=>{
        try{
            let patObj =new PATModel(data)
            return await patObj.save()
        }catch(exception){
            throw(exception)
        }
    }
    getPatByToken=async(token)=>{
        try{
            let parData=await PATModel.findOne({
                token:token
            })
            return parData;
        }catch(exception){
            throw exception
        }
    }
    deletePatData=async(token)=>{
        try{
            let deleted=await PATModel.findOneAndDelete({
                token:token
            })
            if(deleted){
                return deleted;
            }else{
                throw{code:404,message:"Token doesnot exist"}
            }

        }catch(excecpt){
            throw(excecpt)
        }
    }

    updateUser = async(filter, data) => {
        try {
            let response = await UserModel.updateOne(filter, {
                $set: data
            })
            return response;
        } catch(exception) {
            throw exception;
        }
    }
}



const authSvc=new AuthService()
module.exports=authSvc;