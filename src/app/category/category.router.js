const router=require("express").Router()

router.route('/')
.post ((req,res,next)=>{
    res.json({
        result:"Category post",
        msg:"Sucess",
        meta:null
    })
})
.get((res,req,next)=>{})
// router.post('/category',(req,res,next)=>{ })
// router.get('/category',(req,res,next)=>{ })

router.route('/:id')
.get((req,res,next)=>{ })
.put((req,res,next)=>{ })
.delete((req,res,next)=>{ })
 
module.exports=router;