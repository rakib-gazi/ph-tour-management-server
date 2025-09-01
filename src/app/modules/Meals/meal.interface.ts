import { Types } from "mongoose";

export interface IMeal {
    meals:[
        {
            member: Types.ObjectId;
            meal:string
        }
    ]
}