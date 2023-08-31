const { StatusCodes } = require('http-status-codes');
const {User} = require('../models')
const catchAsync = require('../utils/catchAsync')

exports.createUser = catchAsync(async(req, res)=>{
    const {fullname, email, password} = req.body;
    const newUser = await User.create({fullname, email, password})

    if(!newUser){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({status:'false', msg:"unable to create user "})
    }
    res.status(StatusCodes.OK).json({success:true, msg:'User reated Successfully', data:newUser})
})

exports.getAll = catchAsync(async(req, res , next)=>{
  try{
const users = await User.findAll()
res.status(StatusCodes.OK).json({data:users})
  }catch(ex){
    console.error(ex);
  }
})

exports.update = catchAsync(async(req, res, next)=>{
    try{
        const userId = req.params.id
       const user = await User.findByPk(userId) 
       if(user){
        await user.update({...req.body})

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
        const user = await User.findByPk(userId)

        if(user){
            await user.destroy()
            res.status(StatusCodes.OK).json({success:true, msg:'User deleted', data:user})
        } else{
            res.status(StatusCodes.BAD_REQUEST).json({msg:"User not found"})
        }
    }catch(ex){
        console.error(ex);
    }
})