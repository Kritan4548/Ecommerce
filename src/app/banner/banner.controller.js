const bannerSvc=require("../banner/banner.service")
class BannerController{
    bannerCreate=async (req,res,next)=>{
        try{
            const payload=bannerSvc.transformCreateRequest(req)
            const created=await bannerSvc.storeBanner(payload)
        res.json({
            result:created,
            message:"Banner Created Successfully",
            meta:null
        })
            
        }catch(except){
        next(except)}
    }

    listAllBanners=async(req,res,next)=>{
        try{
            let filter={};
            if(req.query['search']){
                filter={
                    $or:[
                        {title:new RegExp(req.query['search'],'i')},
                        {url:new RegExp(req.query['search'],'i')},
                        {status:new RegExp(req.query['search'],'i')}
                    ]
                }
            }

            filter={
                $and:[
                    {createdBy:req.authUser._id},
                    {...filter}
                ]
            }
            let page=req.query['page'] || 1;
            let limit=req.query['limit'] || 15;

            let total =await bannerSvc.countData(filter)
            let skip=(page-1)*limit

            let list=await bannerSvc.listAllData(filter,{offset:skip,limit:limit})
            res.json({
                result:list,
                message:"Banner fetched successfully",
                meta:{
                    total:total,
                    currentPage:page,
                    limit:limit
                }
            })

        }catch(exception){
            next(exception)
        }
    }
    getById=async(req,res,next)=>{
    try{
        let id=req.params.id;
        let data=await bannerSvc.getById({
            id:id,
            createdBy:req.authUser._id
        })
        res.json({
            result:data,
            message:"Bannner fetched",
            meta:null
        })
    }catch(exception){
        console.log("getDataById:",exception)
      
        next(exception)
    }
}
    updateById=async(req,res,next)=>{
        try{
            const bannerId=req.params.id;
            const bannerDetail=await bannerSvc.getById({
                _id:bannerId,
                createdBy:req.authUser._id
            })

           const payload=bannerSvc.transformEditRequest(req);
           const update=await bannerSvc.updateById
        }catch(exception){
            next(exception)
        }
    }
}
const bannerCtrl=new BannerController()
module.exports=bannerCtrl