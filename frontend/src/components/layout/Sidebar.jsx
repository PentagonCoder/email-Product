import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/user/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/members", label: "Members", icon: "♙" },
  { to: "/settings", label: "Settings", icon: "⚙" },
];

function Sidebar() {
  return (
    <aside className="border-b border-slate-200 bg-white lg:min-h-[calc(100vh-65px)] lg:w-56 lg:border-b-0 lg:border-r">
      <nav className="flex gap-1 overflow-x-auto p-3 lg:flex-col lg:p-4" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `flex shrink-0 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-blue-50 text-blue-700"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <span className="text-base" aria-hidden="true">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
