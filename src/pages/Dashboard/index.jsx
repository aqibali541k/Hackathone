import React from 'react';
import DonorDashboard from './DonorDashboard';
import NgoDashboard from './NgoDashboard';
import { useAuthContext } from '../../contexts/Auth/AuthContext';
import CampaignsSection from '../Frontend/Home/CampaignsSection';

const Dashboard = () => {
  const { user } = useAuthContext();
  const role = user?.role;

  if (role === "donor") {
    return <DonorDashboard />;
  } else if (role === "ngo") {
    return <NgoDashboard />;
  } else {
    return <CampaignsSection />;
  }
};

export default Dashboard;
