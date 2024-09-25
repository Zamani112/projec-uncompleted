import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Complaint = () => {
  const [complaint, setComplaint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the complaint to your backend
    console.log("Submitting complaint:", complaint);
    toast.success("Feedback submitted successfully!");
    setComplaint('');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4 text-orange-600 dark:text-orange-400">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Share your thoughts or concerns..."
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          className="min-h-[100px] text-sm"
        />
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white text-sm">
          Submit Feedback
        </Button>
      </form>
    </div>
  );
};

export default Complaint;