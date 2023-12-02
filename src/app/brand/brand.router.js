const router=require('express').Router()
const CheckLogin = require('../../middlewares/auth.middleware');
const CheckPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const ValidateRequest = require('../../middlewares/validate-request.middleware');
const brandCtrl=require('./brand.controller');
const {brandRequestSchema} = require('./brand.validator');


const dirSet=(req,res,next)=>{
    req.uploadDir="./public/uploads/brand/"
    next()
}
router.get("/:slug/slug",brandCtrl.getDetailBySlug)
router.get('/home',brandCtrl.listHome)
router.route('/')
.get(
    CheckLogin,
    CheckPermission('admin'),
    brandCtrl.listAllBrands

)
.post(
    CheckLogin,
    CheckPermission('admin'),
    dirSet,
    uploader.single('image'),
    ValidateRequest(brandRequestSchema),
    brandCtrl.brandCreate)

router.route('/:id')
.get(
    CheckLogin,
    CheckPermission('admin'),
    brandCtrl.getDataById
)
.put(
    CheckLogin,
    CheckPermission('admin'),
    dirSet,
    uploader.single('image'),
    ValidateRequest(brandRequestSchema),
    brandCtrl.updateById
)
.delete(
    CheckLogin,
    CheckPermission('admin'),
    brandCtrl.deleteById
)
module.exports=router;