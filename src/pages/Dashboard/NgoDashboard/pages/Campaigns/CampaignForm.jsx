import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
} from "antd";
import { toast } from "react-toastify";
import { PlusOutlined, DeleteOutlined, PictureOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Loader from "../../../../../components/Loader";

const { Option } = Select;
const { TextArea } = Input;

const categories = ["health", "education", "disaster", "others"];

const CampaignForm = () => {
  const { token } = useAuthContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("editId");
  const isEditing = !!editId;
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      const fetchCampaign = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/campaigns/read/${editId}`);
          const c = res.data;
          
          form.setFieldsValue({
            title: c.title,
            category: c.category,
            goalAmount: c.goalAmount,
            description: c.description,
            dateRange: c.startDate && c.endDate ? [dayjs(c.startDate), dayjs(c.endDate)] : null,
          });
          
          setExistingImages(c.images || []);
        } catch (err) {
          toast.error("Failed to load campaign data");
          navigate("/dashboard/manage-campaigns");
        } finally {
          setFetching(false);
        }
      };
      fetchCampaign();
    }
  }, [editId, form, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeNewImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    // In a real app, you might want to delete from Cloudinary or just mark as removed
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values) => {
    const { title, description, goalAmount, category, dateRange } = values;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("goalAmount", goalAmount);
    formData.append("category", category);
    
    // For existing images in edit mode (we pass them back as JSON so backend knows which to keep)
    // Note: The backend update route will need to be configured to handle 'existingImages'
    if (isEditing) {
      formData.append("existingImages", JSON.stringify(existingImages));
    }

    if (dateRange?.[0]) formData.append("startDate", dateRange[0].toISOString());
    if (dateRange?.[1]) formData.append("endDate", dateRange[1].toISOString());

    images.forEach((img) => {
      formData.append("images", img);
    });

    setLoading(true);
    try {
      if (isEditing) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/campaigns/update/${editId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        toast.success("Campaign updated successfully!");
        navigate("/dashboard/manage-campaigns");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/campaigns/create`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        toast.success("Campaign created successfully!");
        form.resetFields();
        setImages([]);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <Loader />;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          {isEditing ? "Edit Campaign" : "Launch New Campaign"}
        </h2>
        <p className="text-slate-500 mt-1">
          {isEditing ? "Update your active fundraiser details." : "Create a beautiful fundraising page to share your cause."}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm shadow-slate-200/50">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="title"
              label={<span className="text-slate-700 font-bold uppercase tracking-wider text-xs">Campaign Title</span>}
              rules={[{ required: true, message: "Please enter campaign title" }]}
            >
              <Input placeholder="e.g. Clean Water for Villages" className="!rounded-xl !py-3 !bg-slate-50 hover:!bg-white focus:!bg-white border-slate-200 font-medium text-lg" />
            </Form.Item>

            <Form.Item
              name="category"
              label={<span className="text-slate-700 font-bold uppercase tracking-wider text-xs">Category</span>}
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select placeholder="Select cause category" className="!h-[50px] custom-select" dropdownStyle={{ borderRadius: '12px' }}>
                {categories.map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="goalAmount"
              label={<span className="text-slate-700 font-bold uppercase tracking-wider text-xs">Funding Goal (₨)</span>}
              rules={[{ required: true, message: "Please enter goal amount" }]}
            >
              <Input type="number" min={1} placeholder="e.g. 500000" className="!rounded-xl !py-3 !bg-slate-50 hover:!bg-white focus:!bg-white border-slate-200 font-medium text-lg" />
            </Form.Item>

            <Form.Item
              name="dateRange"
              label={<span className="text-slate-700 font-bold uppercase tracking-wider text-xs">Campaign Duration</span>}
            >
              <DatePicker.RangePicker className="!w-full !rounded-xl !py-3 !bg-slate-50 hover:!bg-white focus:!bg-white border-slate-200 font-medium text-slate-700" />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label={<span className="text-slate-700 font-bold uppercase tracking-wider text-xs">The Story</span>}
            rules={[{ required: true, message: "Please tell donors about the cause" }]}
            className="mt-6"
          >
            <TextArea
              rows={6}
              placeholder="Describe your campaign, its goals, and how the funds will make an impact..."
              className="!rounded-2xl !p-4 !bg-slate-50 hover:!bg-white focus:!bg-white border-slate-200 font-medium text-slate-800 leading-relaxed"
            />
          </Form.Item>

          {/* Media Section */}
          <div className="mt-8 mb-10">
            <h3 className="text-slate-700 font-bold uppercase tracking-wider text-xs border-b border-slate-100 pb-2 mb-6">
              Campaign Media
            </h3>
            
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {/* Existing Images (Edit Mode) */}
              {existingImages.map((url, index) => (
                <div key={`existing-${index}`} className="relative shrink-0 group">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-slate-200">
                    <img src={url} alt="Campaign" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-slate-900/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeExistingImage(index)} className="bg-rose-500 text-white p-2 rounded-full transform hover:scale-110 shadow-lg">
                      <DeleteOutlined />
                    </button>
                  </div>
                  <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded backdrop-blur-sm">Current</span>
                </div>
              ))}

              {/* New Images */}
              {images.map((file, index) => (
                <div key={`new-${index}`} className="relative shrink-0 group">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shadow-emerald-500/20">
                    <img src={URL.createObjectURL(file)} alt="New upload" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-slate-900/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => removeNewImage(index)} className="bg-rose-500 text-white p-2 rounded-full transform hover:scale-110 shadow-lg">
                      <DeleteOutlined />
                    </button>
                  </div>
                  <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm">New</span>
                </div>
              ))}

              {/* Upload Button */}
              <div className="shrink-0">
                <input
                  type="file"
                  id="campaignImages"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="campaignImages"
                  className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-all group"
                >
                  <PictureOutlined className="text-3xl mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-bold uppercase tracking-wider">Add Photo</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="flex-1 !py-6 !rounded-2xl !text-lg !font-black tracking-wide !bg-emerald-600 hover:!bg-emerald-500 !border-none shadow-xl shadow-emerald-600/20"
            >
              {isEditing ? "Save Campaign Changes" : "Publish Campaign"}
            </Button>
            {isEditing && (
              <Button
                type="default"
                onClick={() => navigate("/dashboard/manage-campaigns")}
                className="!py-6 px-8 !rounded-2xl !text-lg !font-bold tracking-wide !text-slate-500 !border-slate-200 hover:!text-slate-800 hover:!bg-slate-50"
              >
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CampaignForm;
