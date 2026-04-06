import { useContext, createContext, useState } from "react";

type Role = {
    role: string;
    setRole: React.Dispatch<React.SetStateAction<string>>;
}

const RoleContext = createContext<Role | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
    const [role, setRole] = useState<string>("viewer");

    return (
        <RoleContext.Provider value={{role, setRole}}>
            {children}
        </RoleContext.Provider>
    );
}

export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useRole must be used within RoleProvider");
    }
    return context;
}