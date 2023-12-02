const mongoose  = require("mongoose")
const CategorySchemaDef=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        min:3
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    parentId:{
        type:mongoose.Types.ObjectId,
        ref:'Category',
        nullable:true
    },
    description:String,
    image:String,
    status:{
        type:String,
        enum:['active','inactive'],
        default:"inactive"
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        default:null
    }
},{
    autoCreate  :true,
    autoIndex:true,
    timestamps:true
})
const CategoryModel=mongoose.model('Category',CategorySchemaDef)
module.exports=CategoryModel