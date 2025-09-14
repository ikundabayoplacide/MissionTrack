import { DataTypes, Model, Optional,Sequelize } from "sequelize";

interface CompanyAttributes {
  id: string;
  companyName: string;
  companyEmail: string;
  proofDocument: string;
  companyContact: string;
  province: string;
  district: string;
  sector: string;
  state: "active" | "inactive";
  blockUnblockComment?: string | null;
  status: "pending" | "approved" | "rejected";
  approveComment?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

type CompanyCreationAttributes = Optional<
  CompanyAttributes,
  "id" | "blockUnblockComment" | "approveComment" | "createdAt" | "updatedAt" | "deletedAt"
>;

export class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  public id!: string;
  public companyName!: string;
  public companyEmail!: string;
  public proofDocument!: string;
  public companyContact!: string;
  public province!: string;
  public district!: string;
  public sector!: string;
  public state!: "active" | "inactive";
  public blockUnblockComment!: string | null;
  public status!: "pending" | "approved" | "rejected";
  public approveComment!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

export const CompanyModel = (sequelize: Sequelize) => {
Company.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    companyEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    proofDocument: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyContact: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
    blockUnblockComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
    approveComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "companies",
    timestamps: true,
    paranoid: false,
  }
)};
