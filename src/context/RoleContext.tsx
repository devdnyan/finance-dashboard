import { createContext, useState } from "react";

type Role = {
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
}

export const RoleContext = createContext<Role | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<string>("viewer");

    return (
        <RoleContext.Provider value={{role, setRole}}>
            {children}
        </RoleContext.Provider>
    );
}
