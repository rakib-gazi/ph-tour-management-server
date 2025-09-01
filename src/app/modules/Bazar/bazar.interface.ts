import { Types } from "mongoose";

export interface IBazar {
    member: Types.ObjectId;
    amount:number
}