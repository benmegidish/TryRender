const express=require('express');
const router=express.Router();

router.route('/').get((req,res)=>{
    return res.json("Hello There")
})

module.exports=router;