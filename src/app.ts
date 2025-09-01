import express, { Application, Request, Response } from 'express';
import cors from "cors";
import { userRoutes } from './app/modules/users/users.controller';
import { depositRoutes } from './app/modules/Deposits/deposit.controller';
import { bazarRoutes } from './app/modules/Bazar/bazar.controller';
import { mealRoutes } from './app/modules/Meals/meal.controller';
const app: Application = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"]
}));
app.use('/api/members', userRoutes);
app.use('/api/deposits', depositRoutes);
app.use('/api/bazars', bazarRoutes);
app.use('/api/meals', mealRoutes);
app.get('/',(req:Request,res:Response)=>{
    res.send('Meal Management System Is Running');
})


export default app;
