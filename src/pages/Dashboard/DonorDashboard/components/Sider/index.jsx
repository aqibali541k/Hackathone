import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTabContext } from "../../../../../contexts/Auth/TabContext";
import {
  UserOutlined,
  HistoryOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HeartFilled
} from "@ant-design/icons";

const Sider = () => {
  const { isSiderOpen, setIsSiderOpen } = useTabContext();
  const location = useLocation();

  const menuItems = [
    {
      key: "Profile",
      label: "My Profile",
      icon: <UserOutlined />,
      path: "/dashboard/profile",
    },
    {
      key: "DonationHistory",
      label: "Donation History",
      icon: <HistoryOutlined />,
      path: "/dashboard/donation-history",
    },
  ];

  return (
    <aside
      className={`bg-slate-900 text-slate-300 fixed top-0 bottom-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out border-r border-slate-800 shadow-2xl
        ${isSiderOpen ? "w-64" : "w-20"}`}
    >
      {/* Brand & Toggle Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/60 shrink-0">
        <Link to="/" className={`flex items-center gap-3 transition-opacity ${!isSiderOpen && "opacity-0 invisible w-0"}`}>
          <div className="bg-blue-500 rounded-lg p-1.5 flex items-center justify-center">
            <HeartFilled className="text-white text-lg" />
          </div>
          <span className="text-white font-bold text-lg tracking-wide whitespace-nowrap">
            DonorHub
          </span>
        </Link>
        <button
          onClick={() => setIsSiderOpen(!isSiderOpen)}
          className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          {isSiderOpen ? <MenuFoldOutlined className="text-lg" /> : <MenuUnfoldOutlined className="text-lg" />}
        </button>
      </div>

      {/* Navigation */}
      <nav 
        className="flex-1 py-6 px-3 flex flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Link
              key={item.key}
              to={item.path}
              className={`relative flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group
                ${isActive 
                  ? "bg-blue-600/10 text-blue-400 font-medium before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-blue-500 before:rounded-r-full" 
                  : "hover:bg-slate-800/50 hover:text-slate-100"
                }`}
            >
              <div className={`text-xl transition-colors ${isActive ? "text-blue-500" : "text-slate-400 group-hover:text-slate-200"}`}>
                {item.icon}
              </div>
              
              {isSiderOpen && (
                <span className="whitespace-nowrap transition-colors">{item.label}</span>
              )}

              {!isSiderOpen && (
                <div className="absolute left-16 bg-slate-800 text-white text-sm font-medium px-3 py-1.5 rounded-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-200 z-50 whitespace-nowrap shadow-xl border border-slate-700">
                  {item.label}
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-slate-800"></div>
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Back to Home Button at bottom */}
      <div className="p-4 border-t border-slate-800/60">
        <Link 
          to="/"
          className={`flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors
            ${!isSiderOpen ? "justify-center" : ""}`}
        >
          <div className="text-xl shrink-0"><HeartFilled className="text-rose-500"/></div>
          {isSiderOpen && <span className="font-medium whitespace-nowrap">Public Site</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sider;
