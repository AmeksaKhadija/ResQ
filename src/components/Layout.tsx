import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Map,
  Ambulance,
  ClipboardList,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      path: "/",
      icon: LayoutDashboard,
      label: "Dashboard",
      roles: ["REGULATOR", "FLEET_MANAGER"],
    },
    { path: "/map", icon: Map, label: "Carte Dispatch", roles: ["REGULATOR"] },
    {
      path: "/fleet",
      icon: Ambulance,
      label: "Gestion Flotte",
      roles: ["REGULATOR", "FLEET_MANAGER"],
    },
    {
      path: "/incidents",
      icon: ClipboardList,
      label: "Historique",
      roles: ["REGULATOR"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Ambulance className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">ResQ</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* User Info */}
        <div
          className={`p-4 border-b border-gray-200 ${
            !sidebarOpen && "flex justify-center"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            {sidebarOpen && (
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role === "REGULATOR" ? "Régulateur" : "Chef de Parc"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive(item.path)
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                } ${!sidebarOpen && "justify-center"}`}
                title={!sidebarOpen ? item.label : ""}
              >
                <Icon className="w-5 h-5" />
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition ${
              !sidebarOpen && "justify-center"
            }`}
            title={!sidebarOpen ? "Déconnexion" : ""}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="font-medium">Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
