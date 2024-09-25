import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  userType: z.enum(["patient", "doctor"], "Please select a user type"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUserTypeChange = (value) => {
    setFormData(prevState => ({
      ...prevState,
      userType: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validatedData = signUpSchema.parse(formData);
      console.log("Form submitted:", validatedData);
      toast.success("Account created successfully! Please check your email for verification.");
      navigate('/verify', { state: { email: validatedData.email } });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
        toast.error("Please correct the errors in the form.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 dark:bg-orange-900">
      <form onSubmit={handleSubmit} className="p-8 bg-white dark:bg-orange-800 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-300 text-center">Sign Up for OPlus</h2>
        <div className="space-y-4">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full ${errors.username ? 'border-red-500' : ''}`}
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full ${errors.password ? 'border-red-500' : ''}`}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          <Select onValueChange={handleUserTypeChange} value={formData.userType}>
            <SelectTrigger className={`w-full ${errors.userType ? 'border-red-500' : ''}`}>
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="patient">Patient</SelectItem>
              <SelectItem value="doctor">Doctor</SelectItem>
            </SelectContent>
          </Select>
          {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Sign Up
          </Button>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/" className="text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300">
            Log in
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
