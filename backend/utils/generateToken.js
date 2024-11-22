import jwt from 'jsonwebtoken';
const generateTokenAndSetcookie = (userId,res)=>{
  const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
        expiresIn: '15d'
  });
  res.cookie("jwt",token,{
    maxAge: 15*24*60*60*1000, // 15 days in milliseconds
    httpOnly: true, // prevents JavaScript on website from accessing the cookie
    sameSite: "strict", // prevents CSRF attacks
    secure : process.env.NODE_ENV !== "development"
  });
};

export default generateTokenAndSetcookie;