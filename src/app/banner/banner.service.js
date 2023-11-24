const BannerModel = require("./banner.module");

class BannerService{
    transformCreateRequest=(request)=>{
     let data={  
         ...request.body
     }
     if(!request.file){
        throw{code:400,message:"Image is required",result}
     }
     else{
        data.image=request.file.filename;
     }
     data.createdBy=request.authUser._id;
     return data;
    }
    transformEditRequest=(request)=>{
        let data={  
            ...request.body
        }
        if(request.file){
       
           data.image=request.file.filename;
        }
       
        return data;
       }
 
    storeBanner=async(payload)=>{
        try{
            let banner=new BannerModel(payload)
            let response=await banner.save()
            return response
        }catch(exception){
            throw exception
        }
    }
    listAllData=async(filter={},paging={offset:0,limit:15})=>{
        try{
            let list=await BannerModel.find(filter)
                        .populate('createdBy',['_id','name','email','role','image'])
                        .sort({_id:1})
                        .skip(paging.offset)
                        .limit(paging.limit)
        return list;
    }catch(exception){
        next(exception)
    
    }
}
countData=async(filter={})=>{
    try{
        
        let count=await BannerModel.count(filter)
    return count;
}catch(exception){
    next(exception)

}
}
}
const bannerSvc=new BannerService
module.exports=bannerSvc