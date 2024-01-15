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
        delete user.password;
        return res.json({status: true, user});
    } catch (error) {
        next(error);
    }
}


module.exports.login=async (req, res, next)=>{
    
    try {
        const {username, password}= req.body;
        const usernameCheck= await UserModel.findOne({username})
        if(!usernameCheck) return res.json({msg:"Incorrect Username or Email.", status:false});
        const PasswordCheck=await bcrypt.compare(password, 5);
        if (!PasswordCheck){
            return res.json({msg:"Incorrect Password.",status:false})
        }
        delete user.password;
        return res.json({status: true, user});
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
    
    