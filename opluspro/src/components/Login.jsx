import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the /api/login endpoint
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userData = await response.json();
      login(userData);
      toast.success("Logged in successfully!");
      navigate(`/${userData.userType}`);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-orange-900">
      <form onSubmit={handleLogin} className="p-8 bg-white dark:bg-orange-800 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-300 text-center">OPlus Login</h2>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Login
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;