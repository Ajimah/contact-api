const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//register a user

const registerUser = asyncHandler( async (req , res)  => {
   const {username, email, password} = req.body;
   if (!username || !password || !email){
    res.status(400);
    throw new Error("all fields are required");
   }
    const userAvailable = await User.findOne({email})
    if (userAvailable){
        res.status(400);
        throw new Error("user is already available");
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user){
        res.status(201).json({_id: user.id,email:user.email}); 
    }else{
        res.status(400)
        throw new Error("user data is not valid");
    }
    res.json ({message:"register the user"})
});



const loginUser = asyncHandler( async (req , res)  => {
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("all fields are required");
    }
    const user = await User.findOne({email});

    //compare password with hashpassword

    if (user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN, {expiresIn : "15m"}
    );
        res.status(200).json({accessToken});
    }else {
        res.status(401)
        throw new Error("email or password not valid");
    }
})


const currentUser = asyncHandler( async (req , res)  => {
   

    res.json (req.user)
})

module.exports = {registerUser, loginUser, currentUser};