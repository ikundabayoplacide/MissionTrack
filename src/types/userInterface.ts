const enumRole={
    ADMIN:"admin",
    EMPLOYEE:"employee",
    MANAGER:"manager",
    FINANCE:"finance_manager"
} as const;

export type UserRole = typeof enumRole[keyof typeof enumRole];

export interface userAttributes {
    id?: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber?: string;
    department?: string;
    companyId: string;
    role?: string;
    profilePhoto?:string;
    bankAccount?:string;
    is_active?: boolean;
    resetToken?:string;
    resetTokenExpiry?:Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
export interface userUpateInterface{
    department?:string,
    role?:string,
    fullName?:string
}
export type AddUserInterface = Omit<userAttributes, 'id' | 'createdAt' | 'updatedAt'>;
