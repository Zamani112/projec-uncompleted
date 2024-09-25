import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import Verification from "./pages/Verification";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import Appointments from "./pages/Appointments";
import VideoCall from "./pages/VideoCall";
import Messages from "./pages/Messages";
import MedicalRecords from "./pages/MedicalRecords";
import Complaint from "./components/Complaint";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedUserTypes }) => {
  const { user } = useAuth();
  if (!user || !allowedUserTypes.includes(user.userType)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<Verification />} />
      <Route path="/admin" element={
        <ProtectedRoute allowedUserTypes={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/doctor" element={
        <ProtectedRoute allowedUserTypes={['doctor']}>
          <DoctorDashboard />
        </ProtectedRoute>
      } />
      <Route path="/patient" element={
        <ProtectedRoute allowedUserTypes={['patient']}>
          <PatientDashboard />
        </ProtectedRoute>
      } />
      <Route path="/appointments" element={
        <ProtectedRoute allowedUserTypes={['admin', 'doctor', 'patient']}>
          <Appointments />
        </ProtectedRoute>
      } />
      <Route path="/video-call" element={
        <ProtectedRoute allowedUserTypes={['doctor', 'patient']}>
          <VideoCall />
        </ProtectedRoute>
      } />
      <Route path="/messages" element={
        <ProtectedRoute allowedUserTypes={['doctor', 'patient']}>
          <Messages />
        </ProtectedRoute>
      } />
      <Route path="/medical-records" element={
        <ProtectedRoute allowedUserTypes={['doctor', 'patient']}>
          <MedicalRecords />
        </ProtectedRoute>
      } />
      <Route path="/complaint" element={
        <ProtectedRoute allowedUserTypes={['patient']}>
          <Complaint />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <main className="container mx-auto py-6">
                <AppRoutes />
              </main>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
