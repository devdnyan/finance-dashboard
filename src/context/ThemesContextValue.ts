import { createContext } from "react";

type Theme = "light" | "dark";

export type ThemesContextType = {
	theme: Theme;
	isDark: boolean;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
};

export const ThemesContext = createContext<ThemesContextType | undefined>(undefined);