export default function NavigationBar() {
    return (
        <nav className="sticky top-0 z-[100] border-b border-slate-200/70 bg-white/85 backdrop-blur-md">
            <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between px-4 py-4 sm:px-5 lg:px-6">
               <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-sm font-extrabold text-white shadow-sm shadow-indigo-300">
                        FD
                    </div>
                    <div>
                        <h1 className="text-base font-bold tracking-tight text-slate-900 sm:text-lg">Finance Dashboard</h1>
                        <p className="text-xs font-medium text-slate-500">Cash flow analytics and transaction intelligence</p>
                    </div>
               </div>
               <button
                    type="button"
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-white"
                >
                    Role Toggle
                </button>
            </div>
        </nav>
    )
}