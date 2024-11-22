import User from '../model/user.model.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetcookie from '../utils/generateToken.js';

export const signup = async(req,res)=>{

  try {
    const {fullname,username,password,confirmPassword,gender} = req.body;
    //this check that the password and confirm password are the same
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    // this check that the user already exist
    const user = await User.findOne({ username})
    if (user) {
      return res.status(400).json({ msg: "Username already exists" });
    }

    //Hash password here for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //generate picture for profile. this is an api
    const boyProfilepic = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const girlProfilepic = `https://avatar.iran.liara.run/public/girl?username=${username}`
   // this create a new user after all the checks are done
    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilepic: gender === 'male' ? boyProfilepic : girlProfilepic
    })
    // this save the new user to the database
  if (newUser){
     generateTokenAndSetcookie(newUser._id,res);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      profilepic:newUser.profilepic
    })
  } else{
    res.status(400).json({ msg: "Failed to create user" })
  }


  } catch (error) {
    console.log("Error in signup", error.message);
    
    res.status(500).json({error:"internal server error"})
  }
  
}




export const login = async (req,res)=>{
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password||"");

    if(!user || !isPasswordCorrect){
      return res.status(400).json({ error: "Invalid credentials" })
    }

    generateTokenAndSetcookie(user._id,res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilepic:user.profilepic
    });

  } catch (error) {
    console.log("Error in login", error.message);
    
    res.status(500).json({error:"internal server error"})
  }
  
}


export const logout = async (req,res)=>{
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout", error.message);
    
    res.status(500).json({error:"internal server error"})
  }
  
}

// soubhik 