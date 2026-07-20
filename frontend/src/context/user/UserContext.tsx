import { createContext } from "react";
import type { UserWithoutDescriptor } from "../../types/userType";

interface UsersContextType {
    users: UserWithoutDescriptor[];
    loading: boolean;
    error: Error | null;
    refresh: () => Promise<void>;
}

export const UsersContext = createContext<UsersContextType | null>(null);