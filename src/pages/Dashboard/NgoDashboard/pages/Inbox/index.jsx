import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "antd";
import { toast } from "react-toastify";
import { MailOutlined, CheckCircleOutlined, ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import Loader from "../../../../../components/Loader";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all"); // 'all', 'unread', 'read'
  const { token } = useAuthContext();

  const [apiError, setApiError] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    setApiError(null);
    console.log("Using Token:", token); // Debugging token

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/contact/readall`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("API Response Data:", res.data); // Debugging API response

      const payloadData = Array.isArray(res.data) ? res.data : (res.data.contacts || []);
      setMessages(payloadData);
    } catch (err) {
      console.error("Fetch Messages API Error:", err.response?.data || err.message); // Debugging errors

      if (err.response?.status === 401 || err.response?.status === 403) {
        setApiError("Authentication Error: Your session token is invalid or expired. Please re-login.");
        toast.error("Access denied. Please log in again.");
      } else {
        setApiError("Failed to fetch messages from the server.");
        toast.error("Failed to fetch messages.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchMessages();
  }, [token]);

  const markAsRead = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/contact/mark-read/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(messages.map(m => m._id === id ? { ...m, isRead: true } : m));
      // Subtle background refresh not needed but good for UX
    } catch (err) {
      console.error(err);
      toast.error("Failed to update message status");
    }
  };

  const filteredMessages = messages.filter(m => {
    if (filter === "unread") return !m.isRead;
    if (filter === "read") return m.isRead;
    return true;
  });

  if (loading) return <Loader />;
  if (apiError) return <div className="p-16 text-center text-rose-500 font-bold">{apiError}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl"><MailOutlined /></div> Inbox
          </h2>
          <p className="text-slate-500 mt-2">Manage inquiries and messages from site visitors.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'all' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
          >All</button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'unread' ? 'bg-white shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
          >Unread</button>
          <button
            onClick={() => setFilter("read")}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'read' ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
          >Read</button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="p-16 text-center text-slate-400 font-medium">No messages found.</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredMessages.map((msg) => (
              <div
                key={msg._id}
                className={`p-6 transition-colors group ${!msg.isRead ? 'bg-blue-50/30' : 'hover:bg-slate-50'}`}
              >
                <div className="flex gap-4">
                  <div className="shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                      ${!msg.isRead ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                      {msg.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <h3 className={`text-base truncate ${!msg.isRead ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'}`}>
                          {msg.name || 'Anonymous User'}
                        </h3>
                        <p className="text-sm text-slate-500">{msg.email || 'No email provided'}</p>
                      </div>
                      <div className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <h4 className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500"></span> {msg.subject}
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">{msg.message}</p>
                    </div>

                    {!msg.isRead && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => markAsRead(msg._id)}
                          className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                        >
                          <CheckCircleOutlined /> Mark as Read
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
