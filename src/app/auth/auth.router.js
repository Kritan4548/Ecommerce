const router=require("express").Router()
const authCtrl=require("./auth.controller")
const uploader=require("../../middlewares/uploader.middleware")
const ValidateRequest=require("../../middlewares/validate-request.middleware")
const {registerSchema,passwordSchema,loginSchema} = require("./auth.validator")

const dirSetup=(req,res,next)=>{
    req.uploadDir="./public/uploads/user";
    next()
}
//Auth and Authorization route starts
//uploade.none() has no parameter
//uploader.single() is use to set only one image at one time
//uploader.array() is use to select multiple image
router.post('/register',dirSetup,uploader.single('image'),ValidateRequest(registerSchema),authCtrl.register)
router.get('/verify-token/:token',authCtrl.verifyToken)
router.post("/set-password/:token",ValidateRequest(passwordSchema),authCtrl.setPass)

router.get("/refresh-token", (req, res, next) => {}, (req, res, next) => {})
router.post("/login",ValidateRequest(loginSchema),authCtrl.setLogin)

router.get('/forget-password',authCtrl.forgetPswd)
router.get('/me',authCtrl.checkMe,(req,res,next)=>{})
router.post('logout',authCtrl.setLogout,(req,res,next)=>{})

module.exports=router;
