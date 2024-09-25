import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DashboardTile from '@/components/DashboardTile';
import { VideoIcon, MessageSquareIcon, UsersIcon, CalendarIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const fetchDashboardData = async () => {
  const response = await fetch('/api/admin/dashboard');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: fetchDashboardData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-400">OPlus Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardTile 
          title="Video Calls" 
          icon={<VideoIcon />} 
          value={data.videoCalls}
          onClick={() => navigate("/video-call")}
        />
        <DashboardTile 
          title="Messages" 
          icon={<MessageSquareIcon />} 
          value={data.messages}
          onClick={() => navigate("/messages")}
        />
        <DashboardTile 
          title="Total Users" 
          icon={<UsersIcon />} 
          value={data.totalUsers}
          onClick={() => {}}
        />
        <DashboardTile 
          title="Appointments" 
          icon={<CalendarIcon />} 
          value={data.appointments}
          onClick={() => navigate("/appointments")}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
