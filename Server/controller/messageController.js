const MessageModel= require("../model/messagesModel")
module.exports.addMessage=async(req, res, next)=>{
   try {
    const {from, to, message}=req.body;
    const data= await MessageModel.create({
        message:{text:message},
        users:[from, to],
        sender:from,
    });
    if(data) return res.json({msg:"Message Added Successfully"});
    return res.json({msg:"Failed to add msg to the database"});
   } 
   catch (error) {
    next(error);
   } 
}
module.exports.getAllMessages=async(req, res, next)=>{
    try {
        const {from, to}= req.body;
        const messages= await MessageModel.find({
            users:{
                $all:[from, to],
            },
        }).sort({updateAt:1});
        const ProjectMessages= messages.map((msg)=>{
            return{
                fromSelf: msg.sender.toString()===from,
                message:msg.message.text,
            };
        });
        return res.json(ProjectMessages);
    } catch (error) {
        next(error);
    }
    
}