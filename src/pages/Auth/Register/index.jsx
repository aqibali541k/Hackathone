import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";
const { Title } = Typography;
const { Option } = Select;

const initialState = {
  firstName: "",
  lastName: "",
  dob: "",
  age: "",
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

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((s) => ({
      ...s,
      [name]: value,
      ...(name === "dob" ? { age: calculateAge(value) } : {}),
    }));
  };

  const handleRoleChange = (value) => {
    setState((s) => ({ ...s, role: value }));
  };

  const handleFailed = (errorInfo) => {
    console.log("Validation Failed:", errorInfo);
  };

  const handleSubmit = async () => {
    try {
      const { firstName, lastName, dob, age, email, password, role } = state;

      if (!firstName || !lastName || !dob || !email || !password || !role) {
        return message.error("All fields are required");
      }

      setIsProcessing(true);

      const payload = {
        createdAt: new Date().toLocaleString(),
        firstName,
        lastName,
        dob,
        age,
        email,
        password,
        role,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        payload,
      );
      const { token, user } = res.data;
      handleRegister(token, user);
      message.success("User registered successfully");
      navigate("/public");
      setState(initialState);
    } catch (error) {
      console.error(error.response?.data || error);
      return message.error(
        error.response?.data?.message ||
          "Something went wrong while creating user",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const labelStyle = {
    color: "white",
    fontWeight: "500",
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-700">
      <div className="max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl p-6 rounded-2xl bg-gray-700 shadow-lg">
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          onFinishFailed={handleFailed}
        >
          <Row>
            <Col span={24}>
              <Title level={2} className="!text-center !text-white">
                Register
              </Title>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item
                label={<span style={labelStyle}>First Name</span>}
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
                label={<span style={labelStyle}>Last Name</span>}
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
                label={<span style={labelStyle}>Date of Birth</span>}
                name="dob"
                rules={[
                  { required: true, message: "Date of Birth is required" },
                ]}
              >
                <input
                  type="date"
                  name="dob"
                  value={state.dob}
                  onChange={handleChange}
                  className="w-full rounded-lg py-2 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100 text-gray-800"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label={<span style={labelStyle}>Email</span>}
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
                label={<span style={labelStyle}>Password</span>}
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
                label={<span style={labelStyle}>Confirm Password</span>}
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || state.password === value)
                        return Promise.resolve();
                      return Promise.reject(
                        new Error("Passwords do not match"),
                      );
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
                label={<span style={labelStyle}>Role</span>}
                name="role"
                rules={[{ required: true, message: "Please select your role" }]}
              >
                <Select
                  value={state.role}
                  onChange={handleRoleChange}
                  className="!rounded-lg"
                >
                  <Option value="donor">Donor</Option>
                  <Option value="ngo">NGO</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Button
                htmlType="submit"
                disabled={isProcessing}
                className="!bg-blue-600 hover:!bg-blue-700 !text-white !text-center !rounded-lg !border-none !w-full !py-2"
              >
                {isProcessing ? "Processing..." : "Submit"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Register;
