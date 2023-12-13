const userSvc = require("./user.service")

class UserController{
    getUserByStatus=async(req,res,next)=>{
        try{
            let status=req.params.status
            const {filter,pagination}= userSvc.getFilter({
                status:status
            },req.query)
            let count=await userSvc.getCount(filter)
            let data=await userSvc.getAllDataByFilter(filter,{skip:pagination.skip,limit:pagination.limit})
            res.json({
                result:data,
                message:"User listed by status",
                meta:{
                    page:pagination.page,
                    limit:pagination.limit,
                    total:count
                }
            })
        }catch(exception){
            next(exception)
        }
    }
    getUserByRole=async(req,res,next)=>{
        try{
            let role=req.params.role
            const {filter,pagination}= userSvc.getFilter({
                role:role
            },req.query)
            let count=await userSvc.getCount(filter)
            let data=await userSvc.getAllDataByFilter(filter,{skip:pagination.skip,limit:pagination.limit})
            res.json({
                result:data,
                message:"User listed by status",
                meta:{
                    page:pagination.page,
                    limit:pagination.limit,
                    total:count
                }
            })
        }catch(exception){
            next(exception)
        }

    }
    listAllUser=async(req,res,next)=>{
        try{

        }catch(exception){
            next(exception)
        }
    }
}
const userCtrl=new UserController()
module.exports=userCtrl;