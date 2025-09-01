import express, { Application, Request, Response } from 'express';
import { booksRoutes } from './app/controllers/books.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';
import cors from "cors";
import { userRoutes } from './modules/users/users.controller';
import { depositRoutes } from './modules/Deposits/deposit.controller';
import { bazarRoutes } from './modules/Bazar/bazar.controller';
import { mealRoutes } from './modules/Meals/meal.controller';
const app: Application = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"]
}));
app.use('/api/books', booksRoutes);
app.use('/api/borrow', borrowRoutes);
// MMS Start HERE
app.use('/api/members', userRoutes);
app.use('/api/deposits', depositRoutes);
app.use('/api/bazars', bazarRoutes);
app.use('/api/meals', mealRoutes);
app.get('/',(req:Request,res:Response)=>{
    res.send('Meal Management System Is Running');
})


export default app;
