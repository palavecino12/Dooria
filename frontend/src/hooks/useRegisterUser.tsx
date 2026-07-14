import { useState } from "react";
import { registerUser } from "../services/userServices";
import type { FormValues } from "../schemas/schemaForm";

export const useRegisterUser = () => {

    const [loading, setLoading] = useState(false);

    const createUser = async (user: FormValues, descriptor: number[]) => {

        try {

            setLoading(true);
            const data = await registerUser({
                ...user,
                descriptor,
            });
            return data.message;

        } catch (error) {

            if (error instanceof Error) {
                throw error;
            }
            throw new Error("Error desconocido");

        } finally {
            setLoading(false);
        }
    };

    return {createUser,loading,};
};