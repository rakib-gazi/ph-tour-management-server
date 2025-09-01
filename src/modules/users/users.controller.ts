import express, { Request, Response } from "express";
import { User } from "./users.model";
export const userRoutes = express.Router();

userRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = await User.create(body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

userRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: users,
    });
  } catch (error: any) {
    res.status(404).json({
      message: "Data Not Found",
      success: false,
      error: error,
    });
  }
});

userRoutes.put("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedBody = req.body;
    const user = await User.findByIdAndUpdate(userId, updatedBody, {
      new: true,
    });
    if (!user) {
      res.status(404).json({
        success: false,
        message: `User not found`,
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).json({
        success: false,
        message: `user not found`,
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "user deleted  successfully",
      data: user ? null : user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});
