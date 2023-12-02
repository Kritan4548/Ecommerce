const CheckLogin = require('../../middlewares/auth.middleware');
const CheckPermission = require('../../middlewares/rbac.middleware');
const uploader = require('../../middlewares/uploader.middleware');
const ValidateRequest = require('../../middlewares/validate-request.middleware');
const { categoryRequestSchema } = require('./category.validator');
const categoryCtrl=require('./category.controller');
const checkAccess = require('../../middlewares/access-check.middleware');
const categorySvc = require('./category.service');

const router=require('express').Router()
const dirSetup=(req,res,next)=>{
    req.uploadDir="./public/uploads/category"
    next()
}

router.route('/')
.get(
    CheckLogin,
    CheckPermission('admin'),
    categoryCtrl.listAllCategory
)
.post(
    CheckLogin,
    CheckPermission('admin'),
    dirSetup,
    uploader.single('image'),
    ValidateRequest(categoryRequestSchema),
    categoryCtrl.createCategory)

router.route('/:id')
.get(
    CheckLogin,
    CheckPermission('admin'),
    categoryCtrl.getById
)
.put(
    CheckLogin,
    CheckPermission('admin'),
    checkAccess(categorySvc),
    dirSetup,
    uploader.single('image'),
    ValidateRequest(categoryRequestSchema),
    
    categoryCtrl.updateById
    )
   .delete(
    CheckLogin,
    CheckPermission('admin'),
    checkAccess(categorySvc),
    categoryCtrl.deleteById
   ) 

module.exports=router;