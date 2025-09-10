import { Model, DataTypes, Sequelize } from "sequelize";
import { database } from "..";
import { Mission } from "./mission";
import { User } from "./users";

interface MissionActionAttributes {
    id: string;
    missionId: string;
    actorId: string;
    action: 'Approve' | 'Reject' | 'Update' | 'Cancel';
    comments?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
interface MissionActionCreationAttributes extends Omit<MissionActionAttributes, 'id' | 'comments' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}
class MissionAction extends Model<MissionActionAttributes, MissionActionCreationAttributes> implements MissionActionAttributes {
    public id!: string;
    public missionId!: string;
    public actorId!: string;
    public action!: 'Approve' | 'Reject' | 'Update' | 'Cancel';
    public comments?: string | null;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date | null;
}

MissionAction.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    missionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "missions",
            key: "id"
        }
    },
    actorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "users",
            key: "id"
        }
    },
    action: {
        type: DataTypes.ENUM("Approve", "Reject", "Update", "Cancel"),
        allowNull: false
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue:null
    }
}, {
    tableName: "MissionActions",
    sequelize: database,
    paranoid: true,
    timestamps: true,
    modelName: "MissionAction"
}
)

export default MissionAction;

// associations
Mission.hasMany(MissionAction,{foreignKey:"missionId", as:"actions"});
User.hasMany(MissionAction,{foreignKey:"actorId", as:"actionTaken"});
MissionAction.belongsTo(Mission,{foreignKey:"missionId",as:"mission"});
MissionAction.belongsTo(User,{foreignKey:"actorId",as:"actor"});