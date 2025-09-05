
import express, { Application, Request, Response } from 'express';
import cors from "cors";
import { router } from './app/routes';
import { globalErrorHandler } from './app/middlewares/global.errorHandaler';
import notFound from './app/middlewares/notFound';
import cookieParser  from "cookie-parser";
import passport from 'passport';
import exressSession from "express-session";
import "./app/config/passport"
import { envVariable } from './app/config/env';
const app: Application = express();
app.use(exressSession({
    secret: envVariable.Express_SESSION,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"]
}));

app.use('/api/v1', router);
app.get('/',(req:Request,res:Response)=>{
    res.send('Tour Management System Is Running');
});
//// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
app.use(globalErrorHandler);
app.use(notFound);


export default app;
