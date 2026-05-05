import { Button, Form, Input, message, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";
import { HeartHandshake } from "lucide-react";

const initialState = { email: "", password: "" };

const Login = () => {
  const { handleLogin } = useAuthContext();
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { email, password } = state;

    if (!email || !password) {
      return message.error("All fields are required");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { email, password },
      );
      const { token, data: user } = res.data;
      handleLogin(user, token);
      message.success("Welcome back!");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <HeartHandshake className="text-blue-600 w-8 h-8" />
          <span className="text-2xl font-bold text-gray-800">Donation Hub</span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <Form layout="vertical" onFinish={handleSubmit}>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Welcome Back
            </h2>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input
                name="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="!rounded-lg !py-2"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-gray-700 font-medium">Password</span>}
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                name="password"
                value={state.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="!rounded-lg !py-2"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="!w-full !py-5 !rounded-xl !text-base !font-semibold !bg-blue-600 hover:!bg-blue-700 !border-none !shadow-md"
              >
                Sign In
              </Button>
            </Form.Item>

            <div className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-blue-600 font-medium hover:underline">
                Create one
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
