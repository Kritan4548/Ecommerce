//const express=require('express')
const router=require('express').Router()
const authRouter=require("../app/auth/auth.router");

const categoryRouter=require('../app/category/category.router')
const bannerRouter=require('../app/banner/banner.router')
const brandRouter=require('../app/brand/brand.router')
const productRouter=require('../app/product/product.router')
const userRouter=require('../app/user/user.router')
const cartRouter=require('../app/cart/cart.router')
router.use(authRouter);

router.use('/banner',bannerRouter);
router.use('/brand',brandRouter)
router.use('/category',categoryRouter)
router.use('/product',productRouter)
router.use('/user',userRouter)

router.use('/cart',cartRouter)

// router.route('product')
// .post ((req,res,next)=>{ })
// .get((res,req,next)=>{})

// router.route('/product/:id')
// .get((req,res,next)=>{ })
// .put((req,res,next)=>{ })
// .delete((req,res,next)=>{ })
// router.post('/category',(req,res,next)=>{ })
// router.get('/category',(req,res,next)=>{ })


// router.get('/category/:id',(req,res,next)=>{ })
// router.put('/category/:id',(req,res,next)=>{ })
// router.delete('/category',(req,res,next)=>{ })

// router.use((req,res,next)=>{
//     //always execute
//     //manipulate req,
//     //respond to client
//     //next middleware
//     req.aboutUsContent="data here"
//     next()
//     // res.json({

//     // })
// })
// router.get('/',(request,response)=>{
//     //home page fetch
//     response.json({
// result:"Hello World",
// msg:"Sucess",
// meta:null
//     })
   

// })
// const checkLogin=(req,res,next)=>{
//     let loggedIn=true;
//     if(loggedIn){
//         next()
//     }else{
//         res.status(401).json({
//             result:null,
//             msg:"not logged in",
//             meta:null
//         })
//     }
// }
// router.post('/about',checkLogin,(request,response)=>{
//     //home page fetch
//     let abouUsContnet=req.aboutUsContent;
//     response.send("<h1>Hello there</h1>")
// // result:"This is my about page",
// // msg:"Sucess",
// // meta:null
// //     })

// })
// router.get("/user/detail",(req,res)=>{

// })

// router.get("/user/:userId",(req,res)=>{
//     let userId=req.params.userId
// })

module.exports=router;