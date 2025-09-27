import { Router } from "express";
import { createMissionAction, getActionByMissionId, FinanceUpdateMissionAction,getActionById,deleteAction,getAllActions} from "../controllers/managerActions";
import { checkRoleMiddleware } from "../middlewares/checkRoleMiddleware";
import { authenticate } from "../middlewares/authMiddleware";

const ActionsRouter=Router();

ActionsRouter.post("/actions/create",authenticate,checkRoleMiddleware(["manager"]), createMissionAction);
ActionsRouter.get("/actions",authenticate,checkRoleMiddleware(["manager"]), getAllActions);
ActionsRouter.get("/actions/:missionId",authenticate,checkRoleMiddleware(["manager"]), getActionByMissionId);
ActionsRouter.get("/actions/action/:actionId",authenticate,checkRoleMiddleware(["manager"]), getActionById);
ActionsRouter.patch("/actions/action/:actionId",authenticate,checkRoleMiddleware(["finance_manager"]), FinanceUpdateMissionAction);
ActionsRouter.delete("/actions/action/:actionId",authenticate,checkRoleMiddleware(["manager"]), deleteAction);

export default ActionsRouter;
