import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type RoleNThemesContextType = {
	theme: Theme;
	isDark: boolean;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
};

const STORAGE_KEY = "finance-dashboard-theme";

const RoleNThemesContext = createContext<RoleNThemesContextType | undefined>(undefined);

const getPreferredTheme = (): Theme => {
	if (typeof window === "undefined") {
		return "light";
	}

	const savedTheme = window.localStorage.getItem(STORAGE_KEY);
	if (savedTheme === "light" || savedTheme === "dark") {
		return savedTheme;
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function RoleNThemesProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(getPreferredTheme);

	useEffect(() => {
		const root = document.documentElement;
		const isDark = theme === "dark";

		root.classList.toggle("dark", isDark);
		root.style.colorScheme = isDark ? "dark" : "light";
		window.localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	const setTheme = (nextTheme: Theme) => {
		setThemeState(nextTheme);
	};

	const toggleTheme = () => {
		setThemeState((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
	};

	const value = useMemo(
		() => ({
			theme,
			isDark: theme === "dark",
			toggleTheme,
			setTheme,
		}),
		[theme],
	);

	return <RoleNThemesContext.Provider value={value}>{children}</RoleNThemesContext.Provider>;
}

export const useRoleNThemes = () => {
	const context = useContext(RoleNThemesContext);
	if (!context) {
		throw new Error("useRoleNThemes must be used within RoleNThemesProvider");
	}
	return context;
};
