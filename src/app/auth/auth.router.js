const router = require("express").Router()
const authCtrl = require("./auth.controller")
const uploader = require("../../middlewares/uploader.middleware");
const ValidateRequest = require("../../middlewares/validate-request.middleware");
const { registerSchema, passwordSchema, loginSchema } = require("./auth.validator");
const CheckLogin = require("../../middlewares/auth.middleware");
const CheckPermission = require("../../middlewares/rbac.middleware");

const dirSetup = (req, res, next) => {
    req.uploadDir = "./public/uploads/users";
    next()
}

// Auth and Authorization routes start 
router.post('/register',dirSetup, uploader.single('image'),ValidateRequest(registerSchema), authCtrl.register)

router.get('/verify-token/:token', authCtrl.verifyToken)
router.post("/set-password/:token", ValidateRequest(passwordSchema), authCtrl.setpassWord)

router.post("/login",ValidateRequest(loginSchema), authCtrl.login)

// loggedin All user roles
router.get('/me', CheckLogin, authCtrl.getLoggedInUser)

// Only Admin users
router.get('/admin', CheckLogin,CheckPermission('admin'), (req, res, next) => {
    res.send("I am admin role")
})

router.get("/admin-seller", CheckLogin,CheckPermission(['admin','seller']), (req, res, next) => {
    res.send("I am called by admin or seller")    
} )

router.get("/refresh-token", CheckLogin,  (req, res, next) => {})

router.get('/forget-password', (req, res, next) => {})
// TODO: db data delete token
router.post('/logout', CheckLogin,  authCtrl.logoutUser)

module.exports = router;
