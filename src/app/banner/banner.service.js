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
    listAllData=async(filter={},paging={offset:0,limit:15},options={sort:{_id:1}})=>{
        try{
            let list=await BannerModel.find(filter)
                        .populate('createdBy',['_id','name','email','role','image'])
                        .sort(options.sort)
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
getById=async(filter)=>{
    try{
        let data=await BannerModel.findOne(filter)
        .populate('createdBy',['_id','name','email','role','image'])
        if(data){
        return data;
        }else{
            throw{code:404,message:"Banner doesnot exist"}
        }
    }catch(exception){
        console.log("getByIdSvc:",exception)
        throw exception
    }
}
updateById=async(bannerId,payload)=>{
    try{
        let response=await BannerModel.findByIdAndUpdate(bannerId,{
            $set:payload
        })
        return response
    }catch(exception){
        throw exception
    }
}
deleteById=async(bannerId)=>{
    try{
        let response=await BannerModel.findByIdAndDelete(bannerId)
        if(response){
            return response
        }else{
            throw {code:404,message:"Banner already deleted or does not exists"}
        }
    }catch(exception){
        throw exception;
    }
}
}
const bannerSvc=new BannerService()
module.exports=bannerSvc