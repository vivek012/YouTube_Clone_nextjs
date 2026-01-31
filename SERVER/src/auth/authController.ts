import User from "./authModel";
import mongoose from "mongoose";
import { Request, Response } from "express";

export const login = async (req: Request, res: Response) => {
  const { email, name, image } = req.body;

  try {
    if (!email || !name) {
      return res.status(400).json({ message: "Email and name are required" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const newUser = await User.create({ email, name, image });

      return res.status(201).json({
        message: "User created successfully",
        result: newUser,
      });
    } else {
      return res.status(200).json({
        message: "User logged in successfully",
        result: existingUser,
      });

    }

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });

  }

}


export const updateProfile = async (req: Request, res: Response) => {
  const { id: _id } = req.params;
  const { channelName, description } = req.body;
  try {
    if (typeof _id !== 'string' || !mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).send("User not found");
    }

    const updateUser = await User.findByIdAndUpdate(
      _id,
      { channelName, description },
      { new: true }
    )

    return res.status(200).json({
      message: "Profile updated successfully",
     updateUser
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}






