import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import { toast } from "react-toastify";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";
import { HeartHandshake } from "lucide-react";

const { Title } = Typography;
const { Option } = Select;

const initialState = {
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "donor",
};

const Register = () => {
  const { handleRegister } = useAuthContext();
  const [state, setState] = useState(initialState);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  };

  const handleRoleChange = (value) => {
    setState((s) => ({ ...s, role: value }));
  };

  const handleFailed = (errorInfo) => {
    console.log("Validation Failed:", errorInfo);
  };

  const handleSubmit = async () => {
    try {
      const { firstName, lastName, dob, email, password, confirmPassword, role } = state;

      if (!firstName || !lastName || !dob || !email || !password || !role) {
        return toast.error("All fields are required");
      }

      if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }

      setIsProcessing(true);

      const payload = { firstName, lastName, dob, email, password, role };
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        payload,
      );

      const { token, data: user } = res.data;
      handleRegister(user, token);
      toast.success("Account created successfully!");
      navigate("/");
      setState(initialState);
    } catch (error) {
      console.error(error.response?.data || error);
      return toast.error(
        error.response?.data?.message || "Something went wrong while creating account",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <HeartHandshake className="text-blue-600 w-8 h-8" />
          <span className="text-2xl font-bold text-gray-800">Donation Hub</span>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            onFinishFailed={handleFailed}
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Create Account
            </h2>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={<span className="text-gray-700 font-medium">First Name</span>}
                  name="firstName"
                  rules={[{ required: true, message: "First name is required" }]}
                >
                  <Input
                    name="firstName"
                    value={state.firstName}
                    placeholder="Enter your first name"
                    className="!rounded-lg !py-2"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={<span className="text-gray-700 font-medium">Last Name</span>}
                  name="lastName"
                  rules={[{ required: true, message: "Last name is required" }]}
                >
                  <Input
                    name="lastName"
                    value={state.lastName}
                    placeholder="Enter your last name"
                    className="!rounded-lg !py-2"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  label={<span className="text-gray-700 font-medium">Date of Birth</span>}
                  name="dob"
                  rules={[{ required: true, message: "Date of Birth is required" }]}
                >
                  <input
                    type="date"
                    name="dob"
                    value={state.dob}
                    onChange={handleChange}
                    className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
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
                    placeholder="Enter your email"
                    className="!rounded-lg !py-2"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  label={<span className="text-gray-700 font-medium">Password</span>}
                  name="password"
                  rules={[{ required: true, message: "Password is required" }]}
                >
                  <Input.Password
                    name="password"
                    value={state.password}
                    placeholder="Enter your password"
                    className="!rounded-lg !py-2"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={12}>
                <Form.Item
                  label={<span className="text-gray-700 font-medium">Confirm Password</span>}
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || state.password === value)
                          return Promise.resolve();
                        return Promise.reject(new Error("Passwords do not match"));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    name="confirmPassword"
                    value={state.confirmPassword}
                    placeholder="Confirm your password"
                    className="!rounded-lg !py-2"
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item
                  label={<span className="text-gray-700 font-medium">I am a</span>}
                  name="role"
                  rules={[{ required: true, message: "Please select your role" }]}
                >
                  <Select
                    value={state.role}
                    onChange={handleRoleChange}
                    className="!rounded-lg"
                  >
                    <Option value="donor">Donor — I want to donate</Option>
                    <Option value="ngo">NGO — I manage campaigns</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Button
                  htmlType="submit"
                  disabled={isProcessing}
                  className="!bg-blue-600 hover:!bg-blue-700 !text-white !text-center !rounded-xl !border-none !w-full !py-5 !text-base !font-semibold !shadow-md"
                >
                  {isProcessing ? "Creating Account..." : "Create Account"}
                </Button>
              </Col>
            </Row>

            <div className="text-center mt-4 text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-blue-600 font-medium hover:underline">
                Sign in
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
