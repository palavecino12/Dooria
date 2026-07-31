import mongoose, { Schema } from "mongoose";

export interface IUser {
    name: string;
    lastName: string;
    dni: string;
    number: string;
    address: string;
    rol: "Local" | "Visitante";
    allowedDays?: number[];
    allowedDates?: string[];
    descriptor: number[];
}

//Documento tal como existe en la base de datos
export interface IUserDocument extends IUser {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    rol: { type: String, required: true },
    allowedDays: { type: [Number] },
    allowedDates: { type: [String] },
    descriptor: { type: [Number], required: true }
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>("User", userSchema);
