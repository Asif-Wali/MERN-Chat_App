const UserModel= require("../model/userModel");
const bcrypt= require("bcrypt");
 module.exports.register=async (req, res, next)=>{
    
    try {
        const {username, email, password}= req.body;
        const usernameCheck= await UserModel.findOne({username})
        if(usernameCheck) return res.json({msg:"Username already used", status:false});
        const emailCheck= await UserModel.findOne({email});
      
        if (emailCheck) return res.json({msg:"Email already used", status:false})
       const HashedPassword=await bcrypt.hash(password, 5);
        const user = await UserModel.create({username, email, password:HashedPassword});
        const returnedUserDetail={
            username: user.username,
            email: user.email
        }
        return res.json({status: true, returnedUserDetail});
    } catch (error) {
        next(error);
    }
}
module.exports.login=async (req, res, next)=>{
    
    try {
        const {username, password}= req.body;
        const user= await UserModel.findOne({username})
        if(!user) return res.json({msg:"Incorrect Username or Email.", status:false});
        const PasswordCheck=await bcrypt.compare(password, user.password);
        if (!PasswordCheck){
            return res.json({msg:"Incorrect Password.",status:false})
        }
        const UserPostLogin={
            _id: user._id,
            username: user.username,
            email: user.email,
            avatarImage: user.avatarImage,
            isAvatarImageSet: user.isAvatarImageSet
        }
        return res.json({status: true, UserPostLogin});
    } catch (error) {
        next(error);
    }
}

module.exports.setAvatar= async(req, res, next)=>{
    try {
        const userId= req.params.id;
        const avatarImage= req.body.image;
        const userData= await UserModel.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage
        });
        return res.json({isSet:userData.isAvatarImageSet, image:userData.avatarImage});
    } catch (error) {
        next(error);
    }
}
module.exports.getAllUsers= async (req, res, next)=>{
    try {
        const users= await UserModel.find({_id:{$ne:req.params.id}}).select([
            "_id",
            "username",
            "email",
            "avatarImage"
        ])
       return res.json(users);
    } catch (error) {
        next(error);
    }
}
    
    