const {generateRandomString}=require("../../config/helpers");
class AuthRequest{
    body;
    file;
    files;

    constructor(req){
        this.body=req.body;
        this.file=req.file;
        this.files=req.files
    }
    transformRequestData=()=>{
        let payload = this.body;
            
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
            if (this.file) {
                payload.image = this.file.filename;
            } else if (this.files) {
                payload.image = this.files.map((item) => item.filename);
            }
            payload.status="inactive"
            payload.token=generateRandomString();
            return payload;
    }
}
module.exports=AuthRequest;