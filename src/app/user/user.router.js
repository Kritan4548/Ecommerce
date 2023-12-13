const CheckLogin = require('../../middlewares/auth.middleware');
const CheckPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const ValidateRequest = require('../../middlewares/validate-request.middleware');
//const { userRequestSchema } = require('./user.validator');
const userCtrl=require('./user.controller');
const checkAccess = require('../../middlewares/access-check.middleware');
const userSvc = require('./user.service');

const router=require('express').Router()
const dirSetup=(req,res,next)=>{
    req.uploadDir="./public/uploads/user"
    next()
}
// router.get('/home',userCtrl.listForHome)
// router.get('/:slug/slug',userCtrl.getBySlug)
router.get("/by-status/:status",userCtrl.getUserByStatus)
router.get("/by-role/:role",userCtrl.getUserByRole)
router.route('/')
.get(
    CheckLogin,
    CheckPermission('admin'),
    userCtrl.listAllUser
)


// router.route('/:id')
// .get(
//     CheckLogin,
//     CheckPermission('admin'),
//     userCtrl.getById
// )
// .put(
//     CheckLogin,
//     CheckPermission('admin'),
//     checkAccess(userSvc),
//     dirSetup,
//     uploader.array('images'),
//     ValidateRequest(userRequestSchema),
    
//     userCtrl.updateById
//     )
//    .delete(
//     CheckLogin,
//     CheckPermission('admin'),
//     checkAccess(userSvc),
//     userCtrl.deleteById
//    ) 

module.exports=router;