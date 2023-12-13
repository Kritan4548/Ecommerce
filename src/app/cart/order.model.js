const mongoose=require("mongoose")
const OrderSchmea=new mongoose.Schema({
    billNo:{
        type:Number,
        required:true
    },
    buyer:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    subTotal:{
        type:Number,
         required:true,
         min:1
    },
    discount:{
        type:Number,
        min:0
    },
    vatAmt:{
        type:Number
    },
    serviceCharge:{
        type:Number
    },
    amount:{
        type:Number
    },
    status:{
        type:String,
        enum:['new','pending','cancelled','delivered'],
        default:'new'
    }
},{
    timestamps:true,
    autoCreate:true,
    autoIndex:true
})
const OrderModel=mongoose.model("Order",OrderSchmea)
module.exports=OrderModel