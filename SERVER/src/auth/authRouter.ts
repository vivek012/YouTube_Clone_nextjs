
import { Router } from "express";
import {login , updateProfile}from "./authController";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.patch("/update-profile/:id", updateProfile)


export default authRouter;