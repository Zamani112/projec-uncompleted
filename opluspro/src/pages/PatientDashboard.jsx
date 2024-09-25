import React from 'react';
import DashboardTile from '@/components/DashboardTile';
import { Button } from "@/components/ui/button";
import { CalendarIcon, VideoIcon, MessageSquareIcon, ClipboardIcon, AlertTriangleIcon } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const userName = "John Doe"; // This should be fetched from your authentication system

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-orange-600 dark:text-orange-400">Welcome, {userName}</h1>
      <h2 className="text-xl mb-6 text-orange-500 dark:text-orange-300">OPlus Patient Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardTile 
          title="Upcoming Appointments" 
          icon={<CalendarIcon />} 
          value="2"
          onClick={() => navigate("/appointments")}
        />
        <DashboardTile 
          title="New Messages" 
          icon={<MessageSquareIcon />} 
          value="3"
          onClick={() => navigate("/messages")}
        />
        <DashboardTile 
          title="Medical Records" 
          icon={<ClipboardIcon />} 
          value="View"
          onClick={() => navigate("/medical-records")}
        />
        <DashboardTile 
          title="Start Video Call" 
          icon={<VideoIcon />} 
          value="Connect"
          onClick={() => navigate("/video-call")}
        />
        <DashboardTile 
          title="Submit Complaint" 
          icon={<AlertTriangleIcon />} 
          value="New"
          onClick={() => navigate("/complaint")}
        />
      </div>
      <div className="mt-8">
        <Button onClick={() => navigate("/appointments")} className="bg-orange-600 hover:bg-orange-700 text-white">Schedule New Appointment</Button>
      </div>
    </div>
  );
};

export default PatientDashboard;
