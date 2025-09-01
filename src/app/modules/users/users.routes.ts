import { Router } from "express";
import { UserControllers } from "./users.controller";

const router= Router();

router.post("/register",UserControllers.createUser);
router.get("/all-users",UserControllers.getAllUsers);

export const userRoutes = router;