import { useState, useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  User,
  Users,
  Home,
  LogOut,
  Shield,
  Eye,
  Crown,
  HeartHandshake,
  Video,
  MessageSquare,
  Star,
  BarChart3,
  Newspaper
} from "lucide-react";
import Swal from "sweetalert2";

import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const profileImage = user?.photoURL || "/default-profile.png";

  useEffect(() => {
    if (location.pathname === "/dashboard" && !isAdminLoading && user) {
      const redirectPath = isAdmin
        ? "/dashboard/manage-users"
        : "/dashboard/profile";
      navigate(redirectPath, { replace: true });
    }
  }, [isAdmin, isAdminLoading, user, navigate, location.pathname]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          showConfirmButton: false,
          timer: 2000,
          background: "#FEFFF6",
          customClass: {
            title: "text-[#FF4D50] text-xl",
            content: "text-[#6B7280]",
          }
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: "Something went wrong while logging out.",
          confirmButtonText: "Try Again",
          background: "#FEFFF6",
          customClass: {
            title: "text-[#FF4D50] text-xl",
            content: "text-[#6B7280]",
          }
        });
      });
  };

  const renderNavLink = (to, icon, label) => (
    <NavLink
      to={to}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
          ? "bg-gradient-to-r from-[#FF4D50] to-[#FFA46F] text-white shadow-lg"
          : "text-white/90 hover:bg-white/10 hover:text-white hover:shadow-md"
        }`
      }
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </NavLink>
  );

  return (
    <div className="fixed inset-0 flex w-full h-full overflow-hidden bg-[#FEFFF6]">
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-lg z-50 flex items-center justify-between px-4 sm:px-6 border-b border-[#FFA46F]/20">
        <button
          onClick={toggleSidebar}
          className="text-[#FF4D50] text-2xl p-2 rounded-lg hover:bg-[#FF4D50]/10 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#FF4D50] to-[#FFA46F] rounded-lg flex items-center justify-center">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-[#FF4D50] tracking-wide">Dashboard</h2>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static h-full w-64 sm:w-72 lg:w-80 bg-gradient-to-b from-[#FF4D50] via-[#FFA46F] to-[#FF4D50] shadow-2xl transition-transform duration-300 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <Crown className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white tracking-wide">Dashboard </h2>
              </div>
            </div>
            <nav className="space-y-2 sm:space-y-3">
              {renderNavLink("/", <Home className="h-4 w-4 sm:h-5 sm:w-5" />, "Home")}
              {user && isAdmin === false && (
                <>
                  {renderNavLink("/dashboard/profile", <User className="h-4 w-4 sm:h-5 sm:w-5" />, "Profile")}
                </>
              )}
              {user && isAdmin && (
                <>
                  {renderNavLink("/dashboard/manage-users", <Users className="h-4 w-4 sm:h-5 sm:w-5" />, "Manage Users")}

                  {renderNavLink("/dashboard/donations", <HeartHandshake className="h-4 w-4 sm:h-5 sm:w-5" />, "All Donations")}
                  {renderNavLink("/dashboard/manage-news", <Newspaper className="h-4 w-4 sm:h-5 sm:w-5" />, "Manage News")}
                  {renderNavLink("/dashboard/add-videos", <Video className="h-4 w-4 sm:h-5 sm:w-5" />, "Add Videos")}
                  {renderNavLink("/dashboard/manage-stats", <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />, "Manage Stats")}
                  {renderNavLink("/dashboard/feedback", <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />, "Community Feedback")}

                </>
              )}
            </nav>
          </div>
          {/* User Section */}
          <div className="border-t border-white/20 pt-4 pb-4 sm:pt-6 sm:pb-6 px-4 sm:px-6 lg:px-8 bg-black/10">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="relative">
                <img
                  src={profileImage}
                  alt={user?.displayName || "User"}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-3 border-white shadow-lg"
                  onError={(e) => (e.target.src = "/default-profile.png")}
                />
                {isAdmin && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#26B000] rounded-full flex items-center justify-center">
                    <Shield className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base lg:text-lg text-white truncate">{user?.displayName || "User"}</h3>
                <p className="text-xs sm:text-sm text-white/80 truncate font-medium">{user?.email}</p>
                {isAdmin && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-lg mt-1 border border-white/30">
                    <Crown className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    Admin
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 font-semibold shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative w-full h-full bg-transparent">
        <div className="absolute inset-0 overflow-auto lg:pt-0 pt-16">
          <div className="min-h-full w-full p-3 sm:p-4 lg:p-6 xl:p-8">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Dashboard;