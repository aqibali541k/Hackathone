import { LogoutOutlined, BellOutlined, SearchOutlined } from "@ant-design/icons";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Avatar, Badge } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const { handleLogout, user, token } = useAuthContext();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact/unread-count`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUnreadCount(res.data.count);
      } catch (err) {
        console.error("Failed to fetch notifications");
      }
    };
    if (token) {
      fetchUnread();
      // Poll every 30 seconds for "live" feel
      const interval = setInterval(fetchUnread, 30000);
      return () => clearInterval(interval);
    }
  }, [token]);

  return (
    <header className="h-16 flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-slate-200/60 px-6 sm:px-8 sticky top-0 z-40 shadow-sm transition-all">
      <div className="flex items-center gap-4 flex-1">
        <div className="hidden sm:flex items-center gap-2 bg-slate-100/80 px-3 py-1.5 rounded-full text-slate-500 w-64 border border-transparent focus-within:border-blue-300 focus-within:bg-white transition-all">
          <SearchOutlined />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none w-full text-sm placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Badge count={unreadCount} size="small" offset={[-2, 2]}>
          <button 
            onClick={() => navigate("/dashboard/inbox")}
            className="relative text-slate-500 hover:text-slate-800 transition-colors"
          >
            <BellOutlined className="text-xl" />
          </button>
        </Badge>

        <div className="h-6 w-px bg-slate-200"></div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold text-slate-800 leading-tight">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">
              Donor
            </span>
          </div>
          <div className="relative group cursor-pointer">
            <Avatar 
              size={40} 
              src={user?.avatar}
              className="bg-gradient-to-tr from-blue-600 to-indigo-500 font-bold shadow-md ring-2 ring-white"
            >
              {!user?.avatar && user?.firstName?.[0]?.toUpperCase()}
            </Avatar>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
              <div className="p-2">
                <button
                  onClick={() => { handleLogout(); navigate("/"); }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <LogoutOutlined />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
