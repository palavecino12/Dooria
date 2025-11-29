import mongoose, { Schema } from "mongoose";

export interface IUser {
    name: string;
    lastName: string;
    dni: string;
    number:string;
    address:string;
    rol:string;
    accessType?: string;
    allowedDays?: number[];
    allowedDates?: string[];
    descriptor?: number[];
}

const userSchema = new Schema<IUser>({
    name:{type: String, required: true},
    lastName:{type: String, required: true},
    dni:{type: String, required: true, unique: true},
    number:{type: String, required: true},
    address:{type: String, required: true},
    rol:{type: String,required:true},
    accessType:{type: String},
    allowedDays:{type: [Number]},
    allowedDates:{type: [String]},
    descriptor:{type: [Number]}
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>("User", userSchema);
