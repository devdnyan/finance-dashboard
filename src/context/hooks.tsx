import { useContext } from "react";
import { ThemesContext } from "./ThemesContextValue";
import { RoleContext } from "./RoleContextValue";
import { FinanceContext } from "./FinanceContextValue";

export const useThemes = () => {
    const context = useContext(ThemesContext);
    if (!context) {
        throw new Error("useThemes must be used within ThemesProvider");
    }
    return context;
};


export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("useRole must be used within RoleProvider");
    }
    return context;
}

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
    