const CheckLogin = require('../../middlewares/auth.middleware');
const CheckPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const ValidateRequest = require('../../middlewares/validate-request.middleware');
const { productRequestSchema } = require('./product.validator');
const productCtrl=require('./product.controller');
const checkAccess = require('../../middlewares/access-check.middleware');
const productSvc = require('./product.service');

const router=require('express').Router()
const dirSetup=(req,res,next)=>{
    req.uploadDir="./public/uploads/product"
    next()
}
router.get('/home',productCtrl.listForHome)
router.get('/:slug/slug',productCtrl.getBySlug)
router.route('/')
.get(
    CheckLogin,
    CheckPermission('admin'),
    productCtrl.listAllProduct
)
.post(
    CheckLogin,
    CheckPermission('admin'),
    dirSetup,
    uploader.array('images'),
    ValidateRequest(productRequestSchema),
    productCtrl.createProduct)

router.route('/:id')
.get(
    CheckLogin,
    CheckPermission('admin'),
    productCtrl.getById
)
.put(
    CheckLogin,
    CheckPermission('admin'),
    checkAccess(productSvc),
    dirSetup,
    uploader.array('images'),
    ValidateRequest(productRequestSchema),
    
    productCtrl.updateById
    )
   .delete(
    CheckLogin,
    CheckPermission('admin'),
    checkAccess(productSvc),
    productCtrl.deleteById
   ) 

module.exports=router;