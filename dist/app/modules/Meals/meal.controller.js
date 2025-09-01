"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mealRoutes = void 0;
const express_1 = __importDefault(require("express"));
const meal_model_1 = require("./meal.model");
exports.mealRoutes = express_1.default.Router();
exports.mealRoutes.post("/", async (req, res) => {
    try {
        const body = req.body;
        const meal = await meal_model_1.Meal.create(body);
        res.status(201).json({
            success: true,
            message: "Meal added successfully",
            data: meal,
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
// mealRoutes.get("/", async (req: Request, res: Response) => {
//   try {
//     const meals = await Meal.find()
//       .populate("meals.member", "name")
//       .sort({ createdAt: 1 });
//     res.status(200).json({
//       success: true,
//       message: "Meal retrieved successfully",
//       data: meals,
//     });
//   } catch (error: any) {
//     res.status(404).json({
//       message: "Data Not Found",
//       success: false,
//       error: error,
//     });
//   }
// });
exports.mealRoutes.get("/", async (req, res) => {
    try {
        const meals = await meal_model_1.Meal.aggregate([
            { $unwind: "$meals" }, // flatten meals array
            {
                $lookup: {
                    from: "users",
                    localField: "meals.member",
                    foreignField: "_id",
                    as: "memberInfo",
                },
            },
            { $unwind: "$memberInfo" },
            {
                $project: {
                    memberId: "$meals.member",
                    memberName: "$memberInfo.name",
                    meal: { $toInt: "$meals.meal" },
                    day: { $dayOfMonth: "$createdAt" },
                    month: { $month: "$createdAt" },
                    year: { $year: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: {
                        memberId: "$memberId",
                        memberName: "$memberName",
                        day: "$day",
                    },
                    totalMeal: { $sum: "$meal" },
                },
            },
            {
                $group: {
                    _id: { memberId: "$_id.memberId", memberName: "$_id.memberName" },
                    mealsByDay: {
                        $push: {
                            day: "$_id.day",
                            meal: "$totalMeal",
                        },
                    },
                    total: { $sum: "$totalMeal" },
                },
            },
            {
                $project: {
                    _id: 0,
                    memberId: "$_id.memberId",
                    memberName: "$_id.memberName",
                    mealsByDay: 1,
                    total: 1,
                },
            },
            { $sort: { memberName: 1 } },
        ]);
        // Build day headers dynamically (e.g. 16..30)
        const allDays = Array.from(new Set(meals.flatMap((m) => m.mealsByDay.map((d) => d.day)))).sort((a, b) => a - b);
        // Transform to table-like response
        const tableData = meals.map((m, index) => {
            const row = {
                sl: index + 1,
                memberName: m.memberName,
                total: m.total,
            };
            allDays.forEach((day) => {
                const found = m.mealsByDay.find((d) => d.day === day);
                row[day] = found ? found.meal : 0;
            });
            return row;
        });
        // Compute total row
        const totalRow = { sl: "Total", memberName: "Total" };
        allDays.forEach((day) => {
            totalRow[day] = tableData.reduce((sum, r) => sum + (r[day] || 0), 0);
        });
        totalRow.total = tableData.reduce((sum, r) => sum + (r.total || 0), 0);
        tableData.push(totalRow);
        res.status(200).json({
            success: true,
            message: "Meal retrieved successfully",
            days: allDays, // for frontend column headers
            data: tableData, // ready for rendering in table
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Data Not Found",
            success: false,
            error: error.message,
        });
    }
});
exports.mealRoutes.put("/:mealId", async (req, res) => {
    try {
        const mealId = req.params.mealId;
        const updatedBody = req.body;
        const meal = await meal_model_1.Meal.findByIdAndUpdate(mealId, updatedBody, {
            new: true,
        });
        if (!meal) {
            res.status(404).json({
                success: false,
                message: `Meal not found`,
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "Meal updated successfully",
            data: meal,
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
exports.mealRoutes.delete("/:mealId", async (req, res) => {
    try {
        const mealId = req.params.mealId;
        const meal = await meal_model_1.Meal.findByIdAndDelete(mealId);
        if (!meal) {
            res.status(404).json({
                success: false,
                message: `Deposit not found`,
                data: null,
            });
        }
        res.status(200).json({
            success: true,
            message: "User deleted  successfully",
            data: meal ? null : meal,
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
