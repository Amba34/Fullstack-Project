import User  from "../models/User.js";


export const creatUser = async ( req , res , next ) => {
    const newUser = new User(req.body);
    
        try{
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        }catch(err){
            next();
        }
}



export const updateUser = async ( req , res , next ) => {
      const updatedUser = new User(req.body);
     
         try{
             await User.findByIdAndUpdate(req.params.id, { $set : req.body },{new : true})
             res.status(200).json(updatedUser);
         }catch(err){
             next();
         }
}
export const deleteUser = async ( req , res , next ) => {
      try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User Has been Deleted");
        }catch(err){
             next();
         }
}
export const getUser = async ( req , res , next ) => {

    
    
    try{
            const user = await User.findById(req.params.id)
            res.status(200).json(user);
        }catch(err){
             next();
         }
}
export const getAllUsers = async ( req , res , next ) => {

    console.log("hi");
    
    try{

        const user = await User.find();
                res.status(200).json(user);
            }catch(err){
             next();
         }
}