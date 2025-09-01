import { model, Schema } from "mongoose";
import { IAuthProvider, isActive, IUser, Role } from "./users.interface";
const authProvidersSchema = new Schema <IAuthProvider>({
  provider:{
    type:String,
    required:true,
  },
  providerId:{
    type:String,
    required:true,
  }
},{
   versionKey: false,
   _id:false,
})
const usersSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "The name is required"],
      trim: true,
    },
    email:{
      type:String,
      required:true,
      unique:true,
    },
    password:{
      type: String,
    },
    phone:{
      type:String,
    },
    picture:{
      type:String,
    },
    address:{
      type:String,
    },
    isDeleted:{
      type:Boolean,
      default:false,
    },
    isActive:{
      type:String,
      enum:Object.values(isActive),
      default:isActive.ACTIVE,
    },
    isVerified:{
      type:Boolean,
      default:false,
    },
    role:{
      type:String,
      enum:Object.values(Role),
      default:Role.USER,
    },
    auths:[authProvidersSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


export const User = model<IUser>("User", usersSchema);
