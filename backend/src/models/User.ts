import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    nombre: string;
    email: string;
    edad: number;
    descriptor?: number[];
}

const userSchema = new Schema<IUser>({
    nombre: { type: String, required: true },
    email:  { type: String, required: true, unique: true },
    edad:   { type: Number, required: true },
    descriptor: { type: [Number] }
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>("User", userSchema);
