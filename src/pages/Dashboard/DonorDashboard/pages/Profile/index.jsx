import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Input, message } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";

const Profile = () => {
  const { user, token, isAuth, role } = useAuthContext();

  const [profile, setProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setProfile(res.data.user);
        setFormData({
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          email: res.data.user.email,
          dob: res.data.user.dob || "",
          role: res.data.user.role || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    if (isAuth) fetchProfile();
  }, [token, isAuth]);

  if (!isAuth) {
    return (
      <h2 className="text-center mt-10 text-red-500 font-bold">
        Please login to view your profile
      </h2>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/update`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setProfile(res.data.user);
      message.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      console.error(err);
      message.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-yellow-100 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Welcome, {profile.firstName || "User"}
        </h1>
        <span className="text-gray-500">{new Date().toLocaleDateString()}</span>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <Avatar
              size={80}
              src={profile.avatar}
              icon={<UserOutlined />}
              className="shadow-md"
            />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="flex gap-2 self-end sm:self-auto">
            <Button
              type={editMode ? "primary" : "default"}
              icon={editMode ? <CheckOutlined /> : <EditOutlined />}
              onClick={() => {
                if (editMode) handleUpdate();
                else setEditMode(true);
              }}
              className="rounded-lg"
            />
            {editMode && (
              <Button
                icon={<CloseOutlined />}
                onClick={() => {
                  setFormData({
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    email: profile.email,
                    dob: profile.dob || "",
                    role: profile.role || "",
                  });
                  setEditMode(false);
                }}
                className="rounded-lg"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ProfileField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            editMode={editMode}
            onChange={handleChange}
          />
          <ProfileField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            editMode={editMode}
            onChange={handleChange}
          />
          <ProfileField
            label="Email"
            name="email"
            value={formData.email}
            editMode={editMode}
            onChange={handleChange}
          />
          <ProfileField
            label="Date of Birth"
            name="dob"
            value={formData.dob}
            editMode={editMode}
            onChange={handleChange}
          />

          {/* Role editable only for admin */}
          <ProfileField
            label="Role"
            name="role"
            value={formData.role}
            editMode={editMode && role === "admin"}
            onChange={handleChange}
          />

          <ProfileField
            label="Created At"
            value={
              profile.createdAt
                ? new Date(profile.createdAt).toLocaleDateString()
                : "N/A"
            }
          />
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, name, editMode, onChange }) => {
  return (
    <div className="flex flex-col">
      <span className="text-gray-600 text-sm mb-1">{label}</span>
      {editMode ? (
        <Input name={name} value={value} onChange={onChange} />
      ) : (
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800 text-sm sm:text-base">
          {value || "N/A"}
        </div>
      )}
    </div>
  );
};

export default Profile;
