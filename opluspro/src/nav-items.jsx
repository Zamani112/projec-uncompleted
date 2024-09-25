import { HomeIcon, VideoIcon, MessageSquareIcon, UserIcon, CalendarIcon, ClipboardIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import Appointments from "./pages/Appointments.jsx";
import VideoCall from "./pages/VideoCall.jsx";
import Messages from "./pages/Messages.jsx";
import MedicalRecords from "./pages/MedicalRecords.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Admin Dashboard",
    to: "/admin",
    icon: <UserIcon className="h-4 w-4" />,
    page: <AdminDashboard />,
  },
  {
    title: "Patient Dashboard",
    to: "/patient",
    icon: <UserIcon className="h-4 w-4" />,
    page: <PatientDashboard />,
  },
  {
    title: "Doctor Dashboard",
    to: "/doctor",
    icon: <UserIcon className="h-4 w-4" />,
    page: <DoctorDashboard />,
  },
  {
    title: "Appointments",
    to: "/appointments",
    icon: <CalendarIcon className="h-4 w-4" />,
    page: <Appointments />,
  },
  {
    title: "Video Call",
    to: "/video-call",
    icon: <VideoIcon className="h-4 w-4" />,
    page: <VideoCall />,
  },
  {
    title: "Messages",
    to: "/messages",
    icon: <MessageSquareIcon className="h-4 w-4" />,
    page: <Messages />,
  },
  {
    title: "Medical Records",
    to: "/medical-records",
    icon: <ClipboardIcon className="h-4 w-4" />,
    page: <MedicalRecords />,
  },
];