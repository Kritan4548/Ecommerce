const slugify= require("slugify");
const CategoryModel = require("./category.module");

class CategoryService{
    create=async (payload)=>{
        try{
            let category=new CategoryModel(payload)
            return await category.save()
        }catch(exception){
            if(exception.code===11000){
                exception={code:400,message:"Category name should be unique"}
            }
            throw exception
        }
    }
    getFilter=(query,user)=>{
        let filter={}
        if(query.search){
            filter={
                $or:[
                    {title:new RegExp(query.search,'i')},
                    {description:new RegExp(query.search,'i')}
                ]
            }
        }
        filter={
            $and:[
                filter,
                {createdBy:user._id}
            ]
        }
        let page=+query.page || 1;
        let limit=+query.limit ||15;
        const skip=(page-1)*limit;
        return {filter,pagination:{page,limit,skip}}
    }
   countData=async(filter)=>{
    try{
        let count= await CategoryModel.count(filter)
        return count;
    }catch(exception){
        throw exception
    }

   }
   getData=async(filter,{limit=15,skip=0})=>{
    try{
        let data=await CategoryModel.find(filter)
            .populate("parentId",['_id','title','slug','status'])
            .populate("createdBy",['_id','name'])
            .sort({_id:"DESC"})
            .skip(skip)
            .limit(limit)
            return data;

    }catch(exception){
        throw exception
    }
   }
   getById=async(filter)=>{
    try{
        let data=await CategoryModel.findOne(filter)
            .populate("parentId",['_id','title','slug','status'])
            .populate("createdBy",['_id','name'])
        return data;
    }catch(exception){
        throw exception
    }
   }
   updateById=async(id,data)=>{
    try{
        const update=await CategoryModel.findByIdAndUpdate(id,{$set:data});
        return update
    }catch(exception){
        throw exception
    }
   }
   deleteById=async(id)=>{
    try{
        let deleted=await CategoryModel.findByIdAndDelete(id)
        if(!deleted){
            throw {code:404,message:"Category does not exists"}
        }
        return deleted
    }catch(exception){
        throw exception
    }
   }
}

const categorySvc=new CategoryService()
module.exports=categorySvc