import { Types } from "mongoose";

export interface IDeposit {
    member: Types.ObjectId;
    amount:number
}