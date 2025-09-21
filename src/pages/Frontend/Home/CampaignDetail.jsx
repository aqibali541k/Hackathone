import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Progress, Spin, Button, Modal, Input, message, List } from "antd";
import { motion } from "framer-motion";
import { useAuthContext } from "../../../contexts/Auth/AuthContext";

const CampaignDetail = () => {
    const { id } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [donateModal, setDonateModal] = useState(false);
    const [donationAmount, setDonationAmount] = useState("");
    const [donations, setDonations] = useState([]);
    const { token } = useAuthContext();

    // ✅ Fetch campaign
    const fetchCampaign = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/campaigns/read/${id}`);
            setCampaign(res.data);
        } catch (error) {
            console.error("Error fetching campaign:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch donations
    const fetchDonations = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/donations/campaign/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDonations(res.data);
        } catch (err) {
            console.error(err);
            message.error("Failed to load donations");
        }
    };

    useEffect(() => {
        fetchCampaign();
        fetchDonations();
    }, [id]);

    // ✅ Donate handler
    const handleDonate = async () => {
        if (!donationAmount || donationAmount <= 0) {
            return message.error("Please enter a valid donation amount");
        }
        try {
            await axios.post(
                "http://localhost:8000/donations/create",
                { campaignId: id, amount: parseFloat(donationAmount) },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            message.success("🎉 Thank you for your donation!");
            setDonateModal(false);
            setDonationAmount("");

            // Refresh both campaign & donations
            fetchCampaign();
            fetchDonations();
        } catch (err) {
            console.error(err);
            message.error("Donation failed, please try again");
        }
    };

    if (loading) return <Spin size="large" className="flex justify-center mt-10" />;
    if (!campaign) return <p className="text-center mt-10">❌ Campaign not found</p>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 px-4 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-3xl"
            >
                <Card
                    className="shadow-2xl rounded-2xl overflow-hidden border border-gray-200 bg-white"
                    // cover={
                        // <motion.img
                        //     initial={{ scale: 1.05 }}
                        //     animate={{ scale: 1 }}
                        //     transition={{ duration: 0.6 }}
                        //     src={campaign.imageUrl || "/default-campaign.jpg"}
                        //     alt={campaign.title}
                        //     className="h-72 w-full object-cover"
                        // />
                    // }
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-3"
                    >
                        <h1 className="text-3xl font-extrabold text-gray-800">{campaign.title}</h1>
                        <p className="text-gray-600 leading-relaxed">{campaign.description}</p>

                        <Progress
                            percent={Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100)}
                            status="active"
                            size="large"
                            className="mb-2"
                        />

                        <div className="grid grid-cols-2 gap-2 text-gray-700">
                            <p><strong>Goal:</strong> ₨ {campaign.goalAmount}</p>
                            <p><strong>Raised:</strong> ₨ {campaign.raisedAmount}</p>
                            <p><strong>Status:</strong> {campaign.status}</p>
                            <p><strong>Category:</strong> {campaign.category}</p>
                            {campaign.createdBy && (
                                <p className="col-span-2">
                                    <strong>Organizer:</strong> {campaign.createdBy.firstName} {campaign.createdBy.lastName}
                                </p>
                            )}
                            <p><strong>Start:</strong> {new Date(campaign.startDate).toLocaleDateString()}</p>
                            <p><strong>End:</strong> {new Date(campaign.endDate).toLocaleDateString()}</p>
                        </div>

                        {/* Donate Button */}
                        <div className="mt-6 text-center">
                            <Button type="primary" size="large" onClick={() => setDonateModal(true)}>
                                💖 Donate Now
                            </Button>
                        </div>
                    </motion.div>
                </Card>
            </motion.div>
            <Modal
                title={`Donate to ${campaign.title}`}
                open={donateModal}
                onCancel={() => setDonateModal(false)}
                onOk={handleDonate}
                okText="Donate"
            >
                <Input
                    type="number"
                    placeholder="Enter donation amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default CampaignDetail;
