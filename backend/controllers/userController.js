import validator from 'validator'
import bcrypt from 'bcryptjs'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'

//API to register user

const registerUser = async(req,res)=>{
    try {
        
        const {name,email,password} = req.body

        if (!name || !password || !email) {
            return res.json({success:false,message:"Missing Details !!"})
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Enter a valid email"})

        }

        //validating strong password
        if (password.length < 8) {
                        return res.json({success:false,message:"Enter a strong Password"})
        }

        //Hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()
        
        const token =jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true,token})


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message});
    }
}

//API for user login
const loginUser = async(req,res)=>{
    try {
        
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
           return res.json({ success: false, message: "user does not exist"});
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if (isMatch) {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid credentials"})
        }

    } catch (error) {
         console.log(error)
        res.json({ success: false, message: error.message});
    
    }
}

//API to get user profile data
const getProfile = async (req, res) => {
  try {
    const userData = await userModel
      .findById(req.userId)
      .select('-password')

    res.json({ success: true, userData })

  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

//API to update user profile data
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId   // from authUser middleware

    const {
      name,
      phone,
      address,
      gender,
      dob
    } = req.body

    const imageFile = req.file

    const updatedData = {
      name,
      phone,
      address,
      gender,
      dob
    }

    if(!name || !phone || !dob || !gender){
        return res.json({success:false,message:"Data Missing"})
    }

    await userModel.findByIdAndUpdate(
      userId,
      updatedData,
      { new: true }
    ).select('-password')

   if (imageFile) {

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageURL = imageUpload.secure_url

        await userModel.findByIdAndUpdate(userId,{image:imageURL})
   }

    res.json({
      success: true,
      message: 'Profile updated successfully'
    })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}



export {registerUser,loginUser, getProfile,updateProfile}