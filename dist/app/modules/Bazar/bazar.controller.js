"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bazarRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bazar_model_1 = require("./bazar.model");
exports.bazarRoutes = express_1.default.Router();
exports.bazarRoutes.post("/", async (req, res) => {
    try {
        const body = req.body;
        const bazar = await bazar_model_1.Bazar.create(body);
        res.status(201).json({
            success: true,
            message: "Bazar added successfully",
            data: bazar,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
});
exports.bazarRoutes.get("/", async (req, res) => {
    try {
        const bazars = await bazar_model_1.Bazar.find()
            .populate("member", "name")
            .sort({ createdAt: 1 });
        res.status(200).json({
            success: true,
            message: "Bazar retrieved successfully",
            data: bazars,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Data Not Found",
            success: false,
            error: error,
        });
    }
});
exports.bazarRoutes.put("/:bazarId", async (req, res) => {
    try {
        const bazarId = req.params.bazarId;
        const updatedBody = req.body;
        const bazar = await bazar_model_1.Bazar.findByIdAndUpdate(bazarId, updatedBody, {
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
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
});
exports.bazarRoutes.delete("/:bazarId", async (req, res) => {
    try {
        const bazarId = req.params.bazarId;
        const bazar = await bazar_model_1.Bazar.findByIdAndDelete(bazarId);
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
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
});
