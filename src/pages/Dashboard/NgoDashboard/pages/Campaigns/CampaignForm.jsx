// src/pages/campaigns/CampaignForm.jsx
import React, { useState } from "react";
import { Form, Input, Button, DatePicker, InputNumber, Select, message } from "antd";
import axios from "axios";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import { motion } from "framer-motion";

const { Option } = Select;
const { TextArea } = Input;

const categories = ["health", "education", "disaster", "others"];
const statuses = ["active", "closed"];

const CampaignForm = () => {
  const { token } = useAuthContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    const { title, description, goalAmount, raisedAmount, category, status, dateRange } = values;

    const payload = {
      title,
      description,
      goalAmount,
      raisedAmount: raisedAmount || 0,
      category,
      status,
      startDate: dateRange[0]?.toISOString(),
      endDate: dateRange[1]?.toISOString(),
    };

    setLoading(true);
    try {
      await axios.post("http://localhost:8000/campaigns/create", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("✅ Campaign created successfully");
      form.resetFields();
    } catch (error) {
      console.error(error);
      message.error(error.response?.data?.message || "❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-8 bg-gradient-to-tr from-purple-600 via-pink-500 to-red-500 rounded-3xl shadow-2xl text-white"
    >
      <h2 className="text-3xl font-bold mb-8 text-center drop-shadow-lg">
        🚀 Launch Your Campaign
      </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ raisedAmount: 0, status: "active" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Please enter campaign title" }]}
          >
            <Input
              placeholder="Campaign title"
              className="w-full rounded-xl border-2 border-white/30 bg-white/10 text-white placeholder-white/70 px-4 py-3 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-all duration-300"
            />
          </Form.Item>

          {/* Category */}
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select
              placeholder="Select category"
              className="w-full rounded-xl border-2 border-white/30 bg-white/10 text-white px-4 py-3 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-all duration-300"
              dropdownClassName="bg-white text-black rounded-xl"
            >
              {categories.map((cat) => (
                <Option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Goal Amount */}
          <Form.Item
            name="goalAmount"
            label="Goal Amount"
            rules={[{ required: true, message: "Please enter goal amount" }]}
          >
            <InputNumber
              min={1}
              placeholder="$0"
              className="!w-full rounded-xl border-2 border-white/30 bg-white/10 text-white px-4 py-3 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-all duration-300"
            />
          </Form.Item>

          {/* Raised Amount */}
          <Form.Item name="raisedAmount" label="Raised Amount">
            <InputNumber
              min={0}
              placeholder="$0"
              className="!w-full rounded-xl border-2 border-white/30 bg-white/10 text-white px-4 py-3 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-all duration-300"
            />
          </Form.Item>

          {/* Status */}
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status" }]}
          >
            <Select
              placeholder="Select status"
              className="!w-full rounded-xl bg-white text-black placeholder-black/70 px-4 py-3 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-all duration-300"
              dropdownClassName="bg-white text-black rounded-xl"
            >
              {statuses.map((s) => (
                <Option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Date Range */}
          <Form.Item
            name="dateRange"
            label="Start & End Date"
            rules={[{ required: true, message: "Please select start and end date" }]}
          >
            <DatePicker.RangePicker
              className="!w-full rounded-xl border-2 border-white/30 bg-white/10 text-white px-4 py-3 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-all duration-300"
            />
          </Form.Item>
        </div>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please provide description" }]}
        >
          <TextArea
            rows={4}
            placeholder="Write a brief description about your campaign..."
            className="!w-full rounded-2xl border-2 border-white/30 bg-white/10 text-white px-4 py-3 placeholder-white/70 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/40 transition-all duration-300"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full py-4 text-xl font-bold bg-white text-purple-600 hover:bg-white/90 hover:text-purple-700 rounded-2xl shadow-lg transition-all duration-300"
            >
              Launch Campaign
            </Button>
          </motion.div>
        </Form.Item>
      </Form>
    </motion.div>
  );
};

export default CampaignForm;
