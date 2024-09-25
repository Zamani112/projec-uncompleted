import React from 'react';
import DashboardTile from '@/components/DashboardTile';
import { Button } from "@/components/ui/button";
import { CalendarIcon, VideoIcon, MessageSquareIcon, UsersIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-400">OPlus Doctor Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardTile 
          title="Today's Appointments" 
          icon={<CalendarIcon />} 
          value="5"
          onClick={() => navigate("/appointments")}
        />
        <DashboardTile 
          title="Unread Messages" 
          icon={<MessageSquareIcon />} 
          value="7"
          onClick={() => navigate("/messages")}
        />
        <DashboardTile 
          title="Total Patients" 
          icon={<UsersIcon />} 
          value="128"
          onClick={() => {}}
        />
        <DashboardTile 
          title="Start Video Call" 
          icon={<VideoIcon />} 
          value="Connect"
          onClick={() => navigate("/video-call")}
        />
      </div>
      <div className="mt-8">
        <Button onClick={() => navigate("/appointments")} className="bg-orange-600 hover:bg-orange-700 text-white">View All Appointments</Button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
