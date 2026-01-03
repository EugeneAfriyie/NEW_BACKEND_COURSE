const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//  register controller

const registerUser = async (req,res) =>{
    try {
        // get user data from req body
    const {username,email,password,role} = req.body;

    // check if user already exists
    const checkUser = await User.findOne({$or:[{email},{username}]})
    if(checkUser){
        return res.status(400).json({
            success: false,
            message: "User already exists with this email or username "
        })
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    // Create new user

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        role: role || 'user'// default role is user
    })

    await newUser.save();

    if(newUser){
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user : {
                id : newUser._id,
                username : newUser.username,
                email : newUser.email,
                role : newUser.role
            }
        })
    }else{
        return res.status(400).json({
            success: false,
            message: "User registration failed"
        })
    }



        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: " something went wrong"
        })
    }
}


// login controller

const loginUser = async (req,res) =>{
       try {

        const {email,password} = req.body;
        // check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid user"
            })
        }

        // check if password is correct

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }
        

        // create session or token here (not implemented)
        const token = jwt.sign({userId: user._id, role: user.role,username: user.username}, process.env.JWT_SECRET_key, {expiresIn: '1h'}) 

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user : {

                id : user._id,
                username : user.username,
                email : user.email,
                role : user.role,
                token : token
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: " something went wrong"
        })
    }
}


const changeUserPassword = async (req,res) =>{
    try {
        const {oldPassword,newPassword} = req.body;
        const userId = req.userinfo.userId;

        // check if user exists
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        // check if old password is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid old Password"
            })
        }
        // hash new password
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false, 
                message: "New password must be at least 6 characters long"
            });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword,salt);

        // update password
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({  
            success: false,
            message: " something went wrong"
        })
    }
}



const getallUsers = async (req,res) =>{
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: "All users fetched successfully",
            users: users
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: " something went wrong"
        })
    }
}



module.exports = {registerUser,loginUser,getallUsers,changeUserPassword};