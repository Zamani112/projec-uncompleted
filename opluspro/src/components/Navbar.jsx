import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Button } from "@/components/ui/button";
import Logo from './Logo';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = {
    admin: [
      { to: "/admin", title: "Dashboard" },
      { to: "/appointments", title: "Appointments" },
    ],
    doctor: [
      { to: "/doctor", title: "Dashboard" },
      { to: "/appointments", title: "Appointments" },
      { to: "/video-call", title: "Video Call" },
      { to: "/messages", title: "Messages" },
      { to: "/medical-records", title: "Medical Records" },
    ],
    patient: [
      { to: "/patient", title: "Dashboard" },
      { to: "/appointments", title: "Appointments" },
      { to: "/video-call", title: "Video Call" },
      { to: "/messages", title: "Messages" },
      { to: "/medical-records", title: "Medical Records" },
      { to: "/complaint", title: "Submit Complaint" },
    ],
  };

  return (
    <nav className="bg-orange-100 dark:bg-orange-900 border-b border-orange-200 dark:border-orange-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Logo className="mr-2" />
            </Link>
          </div>
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              {navItems[user.userType].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-orange-800 dark:text-orange-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  {item.title}
                </Link>
              ))}
              <Button onClick={handleLogout} variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-100 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-800">
                Logout
              </Button>
            </div>
          )}
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
