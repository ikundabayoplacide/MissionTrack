import { Mission } from "../database/models/mission";
import {MissionAction} from "../database/models/missionActions";
import { User } from "../database/models/users";
import { Mailer } from "../utils/mailer";
import { CreateMissionActionParams, UpdateMissionActionParams } from "../types/managerMissionActions";

class MissionActionService {

 async createActionAndUpdateMission(data: CreateMissionActionParams) {
    const mission = await Mission.findByPk(data.missionId);
    const user = await User.findByPk(data.actorId);

    if (!mission) throw new Error("Mission not found");
    if (!user) throw new Error("User not found");

    const creator = await User.findByPk(mission.userId);
    if (!creator) throw new Error("Mission creator not found");
    const action = await MissionAction.create(data);



    let missionStatus = mission.status;
    let subject="";
    let message="";
    
    switch (data.action) {
        case 'Approve':
            missionStatus='manager_approved';
            subject=`Mission to go ${mission.location}  have been Approved 👍`;
            message=`The mission "${mission.missionTitle}" has been approved by ${user.role}. Thank you!
            <br/><br/>  <strong>Comment:  </strong>${data.comment || 'No comment provided'}`;
            break;
        case 'Reject':
            missionStatus = 'rejected';
            subject=`Mission to go ${mission.location}  have been Rejected 👎`;
            message=`The mission "${mission.missionTitle}" has been rejected by ${user.role}.
            <br/><br/>  <strong>Comment:  </strong>${data.comment || 'No comment provided'}`;
            break;
        case 'Complete':
            missionStatus = 'completed';
            subject=`Mission to go ${mission.location}  have been Completed 🎉`;
            message=`The mission "${mission.missionTitle}" has been completed by ${user.role}. Congratulations! 
            <br/><br/>  <strong>Comment:  </strong>${data.comment || 'No comment provided'}`;
            break;
        case 'Update':
            missionStatus = mission.status;
            subject=`Mission to go ${mission.location}  have been Updated ✏️`;
            message=`The mission "${mission.missionTitle}" has been updated by ${user.role}.
            <br/> <br/>  <strong>Comment:  </strong>${data.comment || 'No comment provided'}`;
            break;
        case 'Cancel':
            missionStatus = 'canceled';
            subject=`Mission to go ${mission.location}  have been Canceled ❌`;
            message=`The mission "${mission.missionTitle}" has been canceled by ${user.role}.
            <br/> <br/>  <strong>Comment:  </strong>${data.comment || 'No comment provided'}`;
            break;
    }
    await Mission.update({ status: missionStatus }, { where: { id: data.missionId } });
    await Mailer.notifyManager(creator.companyId, subject, message);

    return action;
}
    async updateAction(actionId: string, data: UpdateMissionActionParams) {
        const action = await MissionAction.findByPk(actionId);
        if (!action) throw new Error("action not found");
        await action.update(data);
        return action;

    }
    async getActionByMissionId(missionId: string) {
        const action = await MissionAction.findAll({
            where: { missionId },
            include: [{ model: User, as: 'actor', attributes: ['id', 'fullName', 'email'] },
            { model: Mission, as: 'mission', attributes: ['id', 'missionTitle', 'location'] }
            ]
        });
        if (!action) throw new Error("Action not found");
        return action;
    }

    async getAllActions() {
        const actions = await MissionAction.findAll({
            include: [{ model: User, as: 'actor', attributes: ['id', 'fullName', 'email'] },
            { model: Mission, as: 'mission', attributes: ['id', 'missionTitle', 'location'] }
            ]
        });
        return actions
    }

    async deleteAction(actionId: string) {
        const action = await MissionAction.findByPk(actionId);
        if (!action) throw new Error("Action not found");
        await action.destroy();
    }
    async getActionById(actionId: string) {
        const action = await MissionAction.findByPk(actionId);
        if (!action) throw new Error("Action not found");
        return action;
    }
}
export default MissionActionService;