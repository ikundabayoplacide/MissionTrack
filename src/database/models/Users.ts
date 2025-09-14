import { Sequelize, Model, DataTypes } from "sequelize";

interface UserAttribute {
  id: string;
  companyId?: string;
  fullName: string;
  email: string;
  password: string;

  role: "Employee" | "Manager" | "Finance" | "Admin";
  department?: string;
  phone?: string;
  isActive: boolean;
  resetToken?: string | null;
  resetTokenExpires?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: null;
}

export interface UserCreationAttribute
  extends Omit<UserAttribute, "id" | "deletedAt" | "createdAt" | "updatedAt"> {
  id?: string;
  companyId?: string;
  deletedAt?: null;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User
  extends Model<UserAttribute, UserCreationAttribute>
  implements UserAttribute
{
  public id!: string;
  public companyId?: string
  public fullName!: string;
  public email!: string;
  public password!: string;
  public role!: "Employee" | "Manager" | "Finance" | "Admin";
  public department?: string;
  public phone?: string;
  public isActive!: boolean;
  public resetToken?: string;
  public resetTokenExpires?: Date;

  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt: null = null;

  // Hide password in API responses
  public toJSON(): object | UserAttribute {
    return {
      id: this.id,
      companyId: this.companyId,
      fullName: this.fullName,
      email: this.email,
      role: this.role,
      department: this.department,
      phone: this.phone,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

}

// Sequelize model initializer
export const UserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      companyId: { 
        type: DataTypes.UUID,
        allowNull: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("Employee", "Manager", "Finance", "Admin"),
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetTokenExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
        createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true, // enables deletedAt
      modelName: "Users",
      tableName: "users",
    }
  );
  return User;
};