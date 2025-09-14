import { User } from "./models/Users";
import { Company } from "./models/Company";

export const setupAssociations = () => {
  Company.hasMany(User, {
    foreignKey: "companyId",
    as: "users",
  });
  User.belongsTo(Company, {
    foreignKey: "companyId",
    as: "company",
  });
};
