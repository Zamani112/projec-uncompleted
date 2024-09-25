import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Verification = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically verify the code with your backend
    console.log("Verifying code:", verificationCode);
    toast.success("Email verified successfully!");
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-orange-900">
      <div className="p-8 bg-white dark:bg-orange-800 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-300 text-center">Verify Your Email</h2>
        <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
          We've sent a verification code to {email}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full"
            required
          />
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Verify
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Didn't receive the code?{" "}
          <button className="text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default Verification;
