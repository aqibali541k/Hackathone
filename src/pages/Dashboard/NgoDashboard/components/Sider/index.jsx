import React from "react";
import {
  BarChartOutlined,
  FileAddOutlined,
  HomeFilled,
  LockOutlined,
  MenuOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTabContext } from "../../../../../contexts/Auth/TabContext";

const Sider = () => {
  const { isSiderOpen, setIsSiderOpen, currentTab, setCurrentTab } = useTabContext();

  const menuItems = [
    { key: "Profile", label: "Profile", icon: <UserOutlined />, path: "/dashboard/profile" },
    { key: "Analytics", label: "Analytics", icon: <UserOutlined />, path: "/dashboard/analytics" },
    { key: "Campaigns", label: "Campaigns Form", icon: <FileAddOutlined />, path: "/dashboard/campaigns-form" },
    { key: "ManageCampaigns", label: "Manage Campaigns", icon: <BarChartOutlined />, path: "/dashboard/manage-campaigns" },
    { key: "Donations", label: "Donations", icon: <TeamOutlined />, path: "/dashboard/donations" },
  ];


  return (
    <div
      className={`bg-gradient-to-b from-blue-600 to-blue-400 fixed top-0 bottom-0 left-0 z-50 text-white transition-all duration-300
        ${isSiderOpen ? "w-60" : "w-16"} shadow-lg`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between  p-3 border-b border-white/20">
        <button
          onClick={() => setIsSiderOpen(!isSiderOpen)}
          className="hidden sm:flex w-10 h-10 items-center justify-center bg-white text-black rounded-lg text-lg"
        >
          <MenuOutlined />
        </button>
        {isSiderOpen && (
          <Link
            to="/"
            title="Home"
            className="ml-2 w-10 h-10 flex items-center justify-center bg-white text-black rounded-lg text-lg"
          >
            <HomeFilled />
          </Link>
        )}
      </div>

      {/* Menu Links */}
      <nav className="flex flex-col gap-2 mt-4 relative">
        {menuItems.map((item) => (
          <Link
            key={item.key}
            to={item.path}
            onClick={() => setCurrentTab(item.key)}
            className={`relative group flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200
              ${currentTab === item.key ? "bg-white text-black font-medium" : "hover:bg-blue-500"}`}
          >
            {/* Icon */}
            <span className="text-lg">{item.icon}</span>

            {/* Label when sider open */}
            {isSiderOpen && <span className="whitespace-nowrap">{item.label}</span>}

            {/* Tooltip when sider closed */}
            {!isSiderOpen && (
              <span
                className="absolute left-14 bg-black text-white text-sm px-2 py-1 rounded-md opacity-0 
                translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 
                transition-all duration-300 ease-in-out whitespace-nowrap z-50"
              >
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sider;
