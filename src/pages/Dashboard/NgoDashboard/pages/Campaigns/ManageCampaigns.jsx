import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  InputNumber,
  Tag,
  Spin,
} from "antd";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import Loader from "../../../../../components/Loader";

const ManageCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [form] = Form.useForm();
  const { token } = useAuthContext();

  // ✅ Fetch only logged-in user's campaigns
  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/campaigns/my-campaigns`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to load your campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCampaigns();
    }
  }, [token]);

  // ✅ Delete handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/campaigns/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      message.success("Campaign deleted successfully");
      fetchCampaigns();
    } catch (err) {
      console.error(err);
      message.error("Failed to delete campaign");
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/campaigns/read/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // agar private hota
        },
      );
      setSelectedCampaign(res.data);
      form.setFieldsValue(res.data); // pre-fill form fields
      setIsModalOpen(true);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch campaign");
    }
  };

  // ✅ Update handler
  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/campaigns/update/${selectedCampaign._id}`,
        values,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      message.success("Campaign updated successfully");
      setIsModalOpen(false);
      fetchCampaigns();
    } catch (err) {
      console.error(err);
      message.error("Failed to update campaign");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🎯 My Campaigns</h2>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <Card
              key={campaign._id}
              title={campaign.title}
              // bordered={true}
              className="shadow-lg rounded-xl hover:shadow-2xl transition"
              extra={
                <Tag color={campaign.status === "active" ? "green" : "red"}>
                  {campaign.status}
                </Tag>
              }
            >
              <p>
                <b>Goal:</b> ${campaign.goalAmount}
              </p>
              <p>
                <b>Raised:</b> ${campaign.raisedAmount}
              </p>
              <p>
                <b>Category:</b> {campaign.category}
              </p>

              <div className="flex gap-2 mt-4">
                <Button type="primary" onClick={() => handleEdit(campaign._id)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure you want to delete this campaign?"
                  onConfirm={() => handleDelete(campaign._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        title="Edit Campaign"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="goalAmount"
            label="Goal Amount"
            rules={[{ required: true }]}
          >
            <InputNumber min={100} className="w-full" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="w-full">
            Update Campaign
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCampaigns;
