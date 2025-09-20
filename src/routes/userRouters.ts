import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController";
import { validationMiddleware } from "../middlewares/validationMiddleware";
import { addUserSchema, updateUserSchema } from "../schemas/userSchema";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";
import { authenticate } from "../middlewares/authMiddleware";

const userRouter=Router();

userRouter.get("/users",authenticate,checkRoleMiddleware(["manager"]),getAllUsers);
userRouter.get("/users/:id",authenticate,checkRoleMiddleware(["manager"]),getUserById);
userRouter.post("/users",authenticate, validationMiddleware({ type: "body", schema: addUserSchema }), createUser);
userRouter.patch("/users/:id",authenticate,checkRoleMiddleware(["manager"]), validationMiddleware({ type: "body", schema: updateUserSchema }), updateUser);
userRouter.delete("/users/:id",authenticate,checkRoleMiddleware(["manager"]),deleteUser);

export default userRouter;