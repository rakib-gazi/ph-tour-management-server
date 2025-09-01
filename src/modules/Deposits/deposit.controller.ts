import express, { Request, Response } from "express";
import { Deposit } from "./deposit.model";
export const depositRoutes = express.Router();

depositRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const deposit = await Deposit.create(body);
    res.status(201).json({
      success: true,
      message: "Deposited successfully",
      data: deposit,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

depositRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const deposits = await Deposit.find()
      .populate("member", "name")
      .sort({ createdAt: 1 });
    res.status(200).json({
      success: true,
      message: "Deposits retrieved successfully",
      data: deposits,
    });
  } catch (error: any) {
    res.status(404).json({
      message: "Data Not Found",
      success: false,
      error: error,
    });
  }
});

depositRoutes.put("/:depositId", async (req: Request, res: Response) => {
  try {
    const depositId = req.params.depositId;
    const updatedBody = req.body;
    const deposit = await Deposit.findByIdAndUpdate(depositId, updatedBody, {
      new: true,
    });
    if (!deposit) {
      res.status(404).json({
        success: false,
        message: `Deposit not found`,
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Deposit updated successfully",
      data: deposit,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

depositRoutes.delete("/:depositId", async (req: Request, res: Response) => {
  try {
    const depositId = req.params.depositId;
    const deposit = await Deposit.findByIdAndDelete(depositId);
    if (!deposit) {
      res.status(404).json({
        success: false,
        message: `Deposit not found`,
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted  successfully",
      data: deposit ? null : deposit,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});
