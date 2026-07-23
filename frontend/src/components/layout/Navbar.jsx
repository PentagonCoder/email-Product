import { useAuth } from "../../hooks/useAuth";

function Navbar() {
  const { handleLogout, loading, error } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-900 text-lg text-white">✦</div>
          <div>
            <p className="text-sm font-bold tracking-tight text-slate-900">ExportFlow</p>
            <p className="text-xs text-slate-500">Buyer automation</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {error && <span className="hidden text-sm text-red-600 sm:inline">{error}</span>}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:opacity-60"
          >
            {loading ? "Logging out..." : "Log out"}
          </button>
        </div>
      </div>
      {error && <p className="mx-auto mt-2 max-w-[1440px] text-sm text-red-600 sm:hidden">{error}</p>}
    </header>
  );
}

export default Navbar;
