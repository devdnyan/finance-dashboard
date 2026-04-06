import { useState } from "react";
import { RoleContext } from "./RoleContextValue";

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<string>("viewer");

    return (
        <RoleContext.Provider value={{role, setRole}}>
            {children}
        </RoleContext.Provider>
    );
}
