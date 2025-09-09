import { Mission, missionModel } from "./mission";
import { MissDoc, MissionDocumentModel } from "./missionDocuments";
import { database } from "..";

MissionDocumentModel(database);
missionModel(database);

MissDoc.belongsTo(Mission, { foreignKey: "missionId", as: "mission" });Mission.hasMany(MissDoc, { foreignKey: "missionId", as: "documents" });

export { Mission, MissDoc };