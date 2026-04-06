import { useRole } from "../../context/RoleContext";
import { useRoleNThemes } from "../../context/RoleNThemesContext";

export default function NavigationBar() {
    const { isDark, toggleTheme } = useRoleNThemes();
    const { role, setRole } = useRole();

    return (
        <nav className="sticky top-0 z-[100] border-b border-indigo-100/80 bg-white/85 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/85">
            <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between px-4 py-4 sm:px-5 lg:px-6">
                <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-sky-500 text-sm font-extrabold text-white shadow-sm shadow-indigo-300">
                        <img src="/icons/money.svg" alt="logo" />
                    </div>
                    <div>
                        <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-lg">Finance Dashboard</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-yellow-600 dark:bg-yellow-800 dark:text-yellow-100 dark:hover:bg-yellow-700"
                    >
                        <img src="/icons/moon.svg" alt="Toggle theme" className="h-5 w-5 opacity-90" />
                    </button>

                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:bg-slate-800 dark:text-slate-300">
                        Toggle Access
                    </span>

                    <button
                        type="button"
                        onClick={() => setRole((prev) => prev === "viewer" ? "admin" : "viewer")}
                        className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-700 transition-colors hover:bg-indigo-100 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                        {role === "viewer" ? "Viewer" : "Admin"}
                    </button>
                </div>
            </div>
        </nav>
    );
}