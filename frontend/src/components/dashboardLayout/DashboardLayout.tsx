import React, { useState } from "react";
import {
  BarChart,
  Clock,
  Layout,
  Users,
  CheckSquare,
  PieChart,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import authService from "@/services/auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    authService.logout();
    dispatch(logout());
    router.push("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <BarChart className="w-5 h-5" />,
      href: "/dashboard",
    },
    {
      name: "Tasks",
      icon: <CheckSquare className="w-5 h-5" />,
      href: "/dashboard/tasks",
    },
    {
      name: "Projects",
      icon: <Briefcase className="w-5 h-5" />,
      href: "/dashboard/projects",
    },
    {
      name: "Time Tracking",
      icon: <Clock className="w-5 h-5" />,
      href: "/dashboard/time-tracking",
    },
    {
      name: "Team",
      icon: <Users className="w-5 h-5" />,
      href: "/dashboard/team",
    },
    {
      name: "Analytics",
      icon: <PieChart className="w-5 h-5" />,
      href: "/dashboard/analytics",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`
          ${isSidebarOpen ? "w-64" : "w-20"} 
          bg-white shadow-md transition-all duration-300 ease-in-out
        `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1
            className={`
              ${isSidebarOpen ? "block" : "hidden"} 
              text-2xl font-bold text-indigo-600
            `}
          >
            SmartStack.Ai
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="focus:outline-none"
          >
            <Layout className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <nav className="mt-5">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center p-4 
                ${
                  router.pathname === item.href
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }
                transition duration-200
              `}
            >
              {item.icon}
              <span
                className={`
                  ml-3 
                  ${isSidebarOpen ? "block" : "hidden"}
                `}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div
          className={`absolute bottom-0 border-t p-4 ${
            isSidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <button
            onClick={handleLogout}
            className="
              w-full text-left flex items-center 
              text-red-600 hover:bg-red-50 p-2 rounded
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 11H7a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className={isSidebarOpen ? "block" : "hidden"}>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4">
          {/* Top header content can be added here */}
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
