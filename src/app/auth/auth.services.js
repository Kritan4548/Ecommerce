require("dotenv").config()
class AuthService{
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
}
const authSvc=new AuthService()
module.exports=authSvc;