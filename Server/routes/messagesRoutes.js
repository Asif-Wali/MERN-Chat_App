const {addMessage
,getAllMessages}=require("../controller/messageController");
const router= require("express").Router();
router.post("/addmsg/", addMessage);
router.post("/getmsgs/", getAllMessages)
module.exports =router;
