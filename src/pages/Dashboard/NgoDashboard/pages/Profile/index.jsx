import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Input, DatePicker, Skeleton, Tooltip, Upload } from "antd";
import { toast } from "react-toastify";
import { UserOutlined, MailOutlined, CameraOutlined, EditOutlined, SaveOutlined, CalendarOutlined, SecurityScanOutlined, HeartFilled } from "@ant-design/icons";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import dayjs from "dayjs";
import { motion } from "framer-motion";

const Profile = () => {
  const { token, user: authUser } = useAuthContext();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setProfile(res.data.user);
      setFormData(res.data.user);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key]) submitData.append(key, formData[key]);
      });
      if (avatarFile) submitData.append("avatar", avatarFile);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/update`,
        submitData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setProfile(res.data.user);
      setFormData(res.data.user);
      toast.success("Profile updated successfully!");
      setEditMode(false);
      setAvatarFile(null);
      setTimeout(() => window.location.reload(), 800);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile.firstName) {
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <Skeleton active avatar paragraph={{ rows: 4 }} />
      </div>
    );
  }

  const isNgo = profile.role === "ngo";
  const themeAccent = isNgo ? "emerald" : "indigo";

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in mb-24">
      {/* Header Area */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Account Settings</h1>
          <p className="text-slate-500 mt-2 font-medium">Manage your personal settings, avatar, and security preferences.</p>
        </div>
        {!editMode ? (
          <button 
            onClick={() => setEditMode(true)}
            className={`bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-transform transform hover:-translate-y-0.5 shadow-xl shadow-slate-900/10`}
          >
            <EditOutlined /> Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-3">
             <button 
              onClick={() => {
                setEditMode(false);
                setFormData(profile);
                setAvatarFile(null);
              }}
              className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleUpdate}
              className={`bg-${themeAccent}-600 hover:bg-${themeAccent}-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-transform transform hover:-translate-y-0.5 shadow-xl shadow-${themeAccent}-600/20`}
            >
              <SaveOutlined /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Panel: Profile Quick Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className={`bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden`}>
            <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-${themeAccent}-600 to-${themeAccent}-400 opacity-20`} />
            
            <div className="relative z-10 flex flex-col items-center mb-6 pt-10">
              <div className="relative group mb-6">
                <Avatar 
                  size={140} 
                  src={avatarFile ? URL.createObjectURL(avatarFile) : profile.avatar}
                  className={`bg-slate-100 text-${themeAccent}-600 font-black text-5xl shadow-2xl ring-8 ring-white object-cover`}
                >
                  {!profile.avatar && !avatarFile && profile.firstName?.charAt(0).toUpperCase()}
                </Avatar>
                
                {editMode && (
                  <label htmlFor="avatar-upload" className="absolute bottom-2 right-2 p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full cursor-pointer shadow-lg transition-transform transform hover:scale-110 group-hover:-translate-y-1">
                    <CameraOutlined className="text-xl" />
                    <input 
                      id="avatar-upload" 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={(e) => {
                         if (e.target.files[0]) setAvatarFile(e.target.files[0]);
                      }}
                    />
                  </label>
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 text-center uppercase tracking-wide">
                {profile.firstName} {profile.lastName}
              </h2>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-${themeAccent}-50 text-${themeAccent}-600 text-xs font-bold mt-3 border border-${themeAccent}-100`}>
                <SecurityScanOutlined /> {isNgo ? 'Verified NGO Partner' : 'Registered Donor'}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Joined On</span>
                <span className="font-bold text-slate-800">{new Date(profile.createdAt || Date.now()).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Email Status</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs border border-emerald-100">Verified</span>
              </div>
              {!isNgo && (
                <div className="flex justify-between items-center text-sm mt-4 p-4 rounded-xl bg-pink-50 border border-pink-100">
                  <span className="text-pink-600 font-bold flex items-center gap-2"><HeartFilled /> Total Impact</span>
                  <span className="font-black text-pink-700">Thank You!</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Panel: Information Form */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-8"
        >
          {/* Section: Personal Info */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
              <UserOutlined className={`text-${themeAccent}-500`} /> Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">First Name</label>
                {editMode ? (
                  <input 
                    type="text" 
                    value={formData.firstName || ''} 
                    onChange={e => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 font-semibold focus:ring-4 focus:ring-slate-100 focus:border-slate-400 focus:outline-none transition-all"
                  />
                ) : (
                  <div className="w-full bg-slate-50/50 border border-slate-100 text-slate-700 rounded-xl px-4 py-3 font-semibold">{profile.firstName}</div>
                )}
              </div>

              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Last Name</label>
                {editMode ? (
                  <input 
                    type="text" 
                    value={formData.lastName || ''} 
                    onChange={e => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 font-semibold focus:ring-4 focus:ring-slate-100 focus:border-slate-400 focus:outline-none transition-all"
                  />
                ) : (
                  <div className="w-full bg-slate-50/50 border border-slate-100 text-slate-700 rounded-xl px-4 py-3 font-semibold">{profile.lastName || '-'}</div>
                )}
              </div>

              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                {editMode ? (
                  <input 
                    type="email" 
                    value={formData.email || ''} 
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 font-semibold focus:ring-4 focus:ring-slate-100 focus:border-slate-400 focus:outline-none transition-all"
                  />
                ) : (
                  <div className="w-full bg-slate-50/50 border border-slate-100 text-slate-700 rounded-xl px-4 py-3 font-semibold flex items-center gap-2">
                    <MailOutlined className="text-slate-400" /> {profile.email}
                  </div>
                )}
              </div>

              <div className="space-y-2 relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Date of Birth</label>
                {editMode ? (
                  <DatePicker 
                    value={formData.dob ? dayjs(formData.dob) : null}
                    onChange={(date) => setFormData({...formData, dob: date ? date.toISOString() : null})}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 font-semibold hover:border-slate-300 focus:ring-4 focus:ring-slate-100 transition-all custom-datepicker"
                    format="YYYY-MM-DD"
                  />
                ) : (
                  <div className="w-full bg-slate-50/50 border border-slate-100 text-slate-700 rounded-xl px-4 py-3 font-semibold flex items-center gap-2">
                    <CalendarOutlined className="text-slate-400" /> {profile.dob ? dayjs(profile.dob).format('MMM DD, YYYY') : '-'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section: Security Details */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-slate-100/50 pointer-events-none">
              <SecurityScanOutlined className="text-8xl" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6 relative z-10">
               Security & Password
            </h3>
            
            <div className="grid grid-cols-1 gap-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">New Password</label>
                {editMode ? (
                  <input 
                    type="password" 
                    placeholder="Enter new password to update..." 
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full max-w-md bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 font-semibold focus:ring-4 focus:ring-slate-100 focus:border-slate-400 focus:outline-none transition-all placeholder:font-normal placeholder:text-slate-300"
                  />
                ) : (
                  <div className="w-full max-w-md bg-slate-50/50 border border-slate-100 text-slate-700 rounded-xl px-4 py-3 font-mono tracking-widest">
                    ••••••••••••
                  </div>
                )}
                {editMode && <p className="text-xs font-medium text-slate-400 pl-1">Leave blank if you do not want to change your password.</p>}
              </div>
            </div>
          </div>
          
        </motion.div>
      </div>

      <style>{`
        .custom-datepicker .ant-picker-input > input {
          font-weight: 600;
          color: #0f172a;
        }
      `}</style>
    </div>
  );
};

export default Profile;
