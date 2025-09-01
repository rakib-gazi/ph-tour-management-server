import express, { Request, Response } from "express";
import { Bazar } from "./bazar.model";
export const bazarRoutes = express.Router();

bazarRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const bazar = await Bazar.create(body);
    res.status(201).json({
      success: true,
      message: "Bazar added successfully",
      data: bazar,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

bazarRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const bazars = await Bazar.find()
      .populate("member", "name")
      .sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      message: "Bazar retrieved successfully",
      data: bazars,
    });
  } catch (error: any) {
    res.status(404).json({
      message: "Data Not Found",
      success: false,
      error: error,
    });
  }
});

bazarRoutes.put("/:bazarId", async (req: Request, res: Response) => {
  try {
    const bazarId = req.params.bazarId;
    const updatedBody = req.body;
    const bazar = await Bazar.findByIdAndUpdate(bazarId, updatedBody, {
      new: true,
    });
    if (!bazar) {
      res.status(404).json({
        success: false,
        message: `Bazar not found`,
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Deposit updated successfully",
      data: bazar,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

bazarRoutes.delete("/:bazarId", async (req: Request, res: Response) => {
  try {
    const bazarId = req.params.bazarId;
    const bazar = await Bazar.findByIdAndDelete(bazarId);
    if (!bazar) {
      res.status(404).json({
        success: false,
        message: `Deposit not found`,
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted  successfully",
      data: bazar ? null : bazar,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});
