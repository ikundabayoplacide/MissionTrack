import MissionAction from "../database/models/missionActions";
import { Mission } from "../database/models";
import { User } from "../database/models/users";
import { CreateMissionActionParams, UpdateMissionActionParams } from "../types/managerMissionActions";

class MissionActionService{

     async createAction(data:CreateMissionActionParams){
        const mission=await Mission.findByPk(data.missionId);
        const user=await User.findByPk(data.actorId);

        if(!mission) throw new Error("Mission not found");
        if(!user) throw new Error("User not found");

        const action=await MissionAction.create(data);
        return action;    
    }
     async updateAction(actionId:string, data:UpdateMissionActionParams){
        const action=await MissionAction.findByPk(actionId);
        if(!action) throw new Error ("action not found");
         await action.update(data);
         return action;

    }
    static async getActionByMissionId(missionId:string){
        const action=await MissionAction.findAll({
            where:{missionId},
            include:[{model:User,as:'actor',attributes:['id','name','email']},
                    {model:Mission,as:'mission',attributes:['id','missionTitle','location']}
                     ]
                   });
              if(!action) throw new Error("Action not found");
              return action;
    }

    static async getAllActions(){
        const actions=await MissionAction.findAll({
            include:[{model:User,as:'actor',attributes:['id','name','email']},
                    {model:Mission,as:'mission',attributes:['id','missionTitle','location']}
                     ]
        });
        return actions
    }

    static async deleteAction(actionId:string){
        const action=await MissionAction.findByPk(actionId);
        if(!action) throw new Error ("Action not found");
        await action.destroy();
    }
    static async getActionById(actionId:string){
        const action=await MissionAction.findByPk(actionId);
        if(!action) throw new Error("Action not found");
        return action;
    }
    }
export default MissionActionService;