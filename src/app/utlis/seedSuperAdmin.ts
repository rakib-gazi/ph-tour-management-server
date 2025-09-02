
import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/users/users.interface";
import { User } from "../modules/users/users.model";
import bcryptjs from "bcryptjs";
export const seedSuperAdmin = async()=>{
    try {
        const isSuperAdminExists = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})
        if (isSuperAdminExists){
            console.log("Super Admin Already Exists");
            return;
        }
        console.log("trying to create super admin");
        const hashedPassword = await bcryptjs.hash(envVars.SUPER_ADMIN_PASS as string, Number(envVars.SALT_ROUND)) 
        const authProvider :IAuthProvider={
            provider : "credentials",
            providerId: envVars.SUPER_ADMIN_EMAIL as string
        }
        const superAdminPayload: IUser = {
            name: "Super Admin",
            role: Role.SUPER_ADMIN,
            email:envVars.SUPER_ADMIN_EMAIL as string,
            password : hashedPassword,
            isVerified: true,
            auths : [authProvider]
        }
        const superAdmin = await User.create(superAdminPayload);
        console.log("Super Admin Created Successfully");
        console.log(superAdmin);
    } catch (error) {
        console.log(error);
    }
}