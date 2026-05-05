import React, { useEffect, useState } from "react";
import axios from "axios";
import { Popconfirm, Spin, Tooltip } from "antd";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined, PictureOutlined, CalendarOutlined, PushpinOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../../../contexts/Auth/AuthContext";
import Loader from "../../../../../components/Loader";

const ManageCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const navigate = useNavigate();

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/campaigns/my-campaigns`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setCampaigns(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load your campaigns");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchCampaigns();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/campaigns/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      toast.success("Campaign deleted successfully");
      setCampaigns(campaigns.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete campaign");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Campaigns</h2>
          <p className="text-slate-500 mt-1">Review, edit, or delete your active fundraising projects.</p>
        </div>
        <button
          onClick={() => navigate("/dashboard/campaigns-form")}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          + Create New
        </button>
      </div>

      {campaigns.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 p-16 text-center shadow-sm">
          <HeartFilled className="text-5xl text-slate-200 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Campaigns Yet</h3>
          <p className="text-slate-500 md:w-1/2 mx-auto">You haven't created any campaigns. Start your first fundraiser to begin making an impact!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => {
            const progress = Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100);
            return (
              <div key={campaign._id} className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10"></div>
                  {campaign.images?.[0] ? (
                    <img 
                      src={campaign.images[0]} 
                      alt={campaign.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                      <PictureOutlined className="text-4xl" />
                    </div>
                  )}
                  <span className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-widest ${campaign.status === 'active' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300'}`}>
                    {campaign.status.toUpperCase()}
                  </span>
                  
                  <div className="absolute bottom-4 left-4 z-20 w-[calc(100%-2rem)]">
                    <h3 className="text-white font-bold text-lg truncate drop-shadow-md">{campaign.title}</h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Raised</p>
                      <p className="text-emerald-600 font-black">₨ {campaign.raisedAmount.toLocaleString()}</p>
                    </div>
                    <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">Goal</p>
                      <p className="text-slate-800 font-black">₨ {campaign.goalAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-semibold mb-1.5 text-slate-500">
                      <span>Funded Progress</span>
                      <span className="text-emerald-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{width: `${progress}%`}}></div>
                    </div>
                  </div>

                  <div className="flex gap-2 text-xs text-slate-500 mt-auto font-medium">
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100"><PushpinOutlined className="text-emerald-500" /> {campaign.category}</span>
                    <span className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded border border-slate-100"><CalendarOutlined className="text-blue-500" /> {new Date(campaign.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-t border-slate-100 divide-x divide-slate-100">
                  <button 
                    onClick={() => navigate(`/dashboard/campaigns-form?editId=${campaign._id}`)}
                    className="py-4 text-slate-600 hover:text-blue-600 hover:bg-slate-50 font-bold tracking-wide text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <EditOutlined /> Edit Details
                  </button>
                  <Popconfirm
                    title="Delete Campaign"
                    description="Are you absolutely sure you want to delete this campaign? This cannot be undone."
                    onConfirm={() => handleDelete(campaign._id)}
                    okText="Yes, delete it"
                    cancelText="Cancel"
                    okButtonProps={{ danger: true, className: '!rounded-lg !px-4' }}
                    cancelButtonProps={{ className: '!rounded-lg' }}
                  >
                    <button className="py-4 text-slate-400 hover:text-rose-600 hover:bg-rose-50 font-bold tracking-wide text-sm transition-colors flex items-center justify-center gap-2">
                      <DeleteOutlined /> Delete
                    </button>
                  </Popconfirm>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ManageCampaigns;
