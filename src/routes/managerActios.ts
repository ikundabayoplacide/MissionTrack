import { Router } from "express";
import { createMissionAction, getActionByMissionId, updateMissionAction,getActionById,deleteAction,getAllActions} from "../controllers/managerActions";

const ActionsRouter=Router();

ActionsRouter.post("/", createMissionAction);
ActionsRouter.get("/:missionId", getActionByMissionId);
ActionsRouter.get("/action/:actionId", getActionById);
ActionsRouter.patch("/:actionId", updateMissionAction);
ActionsRouter.delete("/:actionId", deleteAction);
ActionsRouter.get("/", getAllActions);

export default ActionsRouter;
