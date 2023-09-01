const { StatusCodes } = require('http-status-codes');
const {User} = require('../models')
const catchAsync = require('../utils/catchAsync')
const UsersServices =  require('../services/user.service');
exports.createUser = catchAsync(async (req, res, next) => {
    try {
      const userData = await UsersServices.createUser(req);
  
      if (!userData) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Something went wrong creating user' });
      }
  
      res.status(StatusCodes.OK).json({ success: true, msg: 'User created Successfully', data: userData });
    } catch (ex) {
      console.error(ex);
      // You can handle the error here or pass it to the next middleware
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Internal server error' });
    }
  });
  

exports.getAll = catchAsync(async(req, res , next)=>{
  try{
    const users = await UsersServices.getAll(req)
res.status(StatusCodes.OK).json({data:users})
  }catch(ex){
    console.error(ex);
  }
})

exports.update = catchAsync(async(req, res, next)=>{
    try{
        const userId = req.params.id
       const user = await UsersServices.updateUser(userId, req)
       if(user){

        res.status(StatusCodes.OK).json({success:true, msg:'User updated Successfully', data:user})
       }else{
        console.log('User not found. ');
       }

    }catch(ex){
        console.error("Error Updating User",ex);
    }
})


exports.deleteUser = catchAsync(async(req, res, next)=>{
    try{
        const userId = req.params.id
        const user = await UsersServices.deleteUser(userId)

        if(user){
            
            res.status(StatusCodes.OK).json({success:true, msg:'User deleted', data:user})
        } else{
            res.status(StatusCodes.BAD_REQUEST).json({msg:"User not found"})
        }
    }catch(ex){
        console.error(ex);
    }
})