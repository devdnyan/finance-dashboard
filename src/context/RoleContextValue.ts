import { createContext } from "react";

type RoleContextType = {
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
};

export const RoleContext = createContext<RoleContextType | undefined>(undefined);