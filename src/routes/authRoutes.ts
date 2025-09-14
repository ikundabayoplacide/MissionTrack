import Router from "express";
import { AuthController } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";


const authRouter=Router();

authRouter.post("/login",AuthController.loginUser);
authRouter.post("/logout",authenticate,AuthController.logoutUser);
authRouter.post("/forgotPassword",AuthController.forgotPassword);
authRouter.post("/resetPassword",AuthController.resetPassword);
authRouter.post("/changePassword",authenticate,AuthController.changePassword);

export default authRouter;