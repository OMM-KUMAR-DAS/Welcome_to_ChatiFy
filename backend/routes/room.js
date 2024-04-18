const express=require("express")
const router=express.Router()



const{specificroom,roomadd,allrooms,deletechat} = require("../controllers/Room")

router.post("/room",specificroom)

router.post("/room1",roomadd)

router.get("/room2",allrooms)

router.delete("/delete_chat",deletechat)

module.exports=router;