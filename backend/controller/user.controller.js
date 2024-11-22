 import User from "../model/user.model.js";

export const getUsersForSidebar = async (req,res) => {
  try {
    
    const loggedInUserId = req.user._id;

    const filterdUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    return res.status(200).json(filterdUsers);

  } catch (error) {
    console.log("Error in getUsersForSidebar: ", error.messsage);
    
    res.status(500).json({error: "Internal server error"})
  }
}