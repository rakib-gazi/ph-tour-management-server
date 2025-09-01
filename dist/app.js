"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const users_controller_1 = require("./app/modules/users/users.controller");
const deposit_controller_1 = require("./app/modules/Deposits/deposit.controller");
const bazar_controller_1 = require("./app/modules/Bazar/bazar.controller");
const meal_controller_1 = require("./app/modules/Meals/meal.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"]
}));
app.use('/api/members', users_controller_1.userRoutes);
app.use('/api/deposits', deposit_controller_1.depositRoutes);
app.use('/api/bazars', bazar_controller_1.bazarRoutes);
app.use('/api/meals', meal_controller_1.mealRoutes);
app.get('/', (req, res) => {
    res.send('Meal Management System Is Running');
});
exports.default = app;
