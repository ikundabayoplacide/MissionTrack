import Mail from "nodemailer/lib/mailer";
import { Company } from "../database/models/company";
import { User } from "../database/models/users";
import { ApproveRejectData, BlockUnblockCompany, CompanyAttributes, CompanyManager } from "../types/companyInterface";
import bcrypt from "bcrypt";
import { Mailer } from "../utils/mailer";


export class CompanyService{
     static async createCompany(companyData:CompanyAttributes,userData:CompanyManager){
        const company=await Company.create(companyData);
          const hashedPassword = await bcrypt.hash(userData.password, 10);
        await User.create({
            ...userData,
            password:hashedPassword,
            companyId:company.id,
            role:"manager"
        });
        return company;
    }
     static  async getCompanyById(companyId:string){
        const company=await Company.findByPk(companyId);
        if(!company) throw new Error('Company not found');
        return company;
    }
  static  async updateCompany(companyId:string,data:Partial<CompanyAttributes>){
        const company=await Company.findByPk(companyId);
        if(!company)throw new Error('Company not Found');
            const updateData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== '' && value !== null && value !== undefined)
        );
         await Mailer.notifyManagerAboutCompany(company.id, "Company Updated ✏️", `Your company "${company.companyName}" information has been updated.`);
        await company.update(updateData);
        return company;
    }

  static  async getAllCompanies(){
        const companies=await Company.findAll();
        return companies;
    }
  static  async deleteCompany(companyId:string){
        const company=await Company.findByPk(companyId);
        if(!company) throw new Error("Company not found");
        await Mailer.notifyManagerAboutCompany(company.id, "Company Deleted ❌", `Your company "${company.companyName}" has been deleted from the system.`);
        await User.destroy({where:{companyId:company.id}});
        await company.destroy();
        return { message: "Company deleted successfully" };
    }
    static async blockAndUnblockCompany(companyId:string,data:BlockUnblockCompany){
      const company=await Company.findByPk(companyId);
      if(!company) throw new Error("Company not found");
    const newState= await company.update({state:data.state,blockUnblockComment:data.comment});
      await Mailer.notifyManagerAboutCompany(company.id, data.state === 'blocked' ? "Company Blocked ⛔" : "Company Unblocked ✅", `Your company "${company.companyName}" has been ${data.state}.<br/><br/>  <strong>Comment:  </strong> ${data.comment}`);
      return newState;
    }

    static async approveAndRejectCompany(companyId:string,data:ApproveRejectData){
      const company=await Company.findByPk(companyId);
      if(!company) throw new Error("Company not found");
      await Mailer.notifyManagerAboutCompany(company.id, data.status === 'approved' ? "Company Approved ✅" : "Company Rejected ❌", `Your company "${company.companyName}" has been ${data.status}.<br/> <br/>  <strong>Comment:  </strong>${data.comment}`);
     const newStatus= await company.update({status:data.status,approveComment:data.comment});
      return newStatus;
    }
}