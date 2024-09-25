import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const fetchAppointments = async () => {
  const response = await fetch('http://localhost:5000/api/appointments');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const createAppointment = async (newAppointment) => {
  const response = await fetch('http://localhost:5000/api/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAppointment),
  });
  if (!response.ok) {
    throw new Error('Failed to create appointment');
  }
  return response.json();
};

const Appointments = () => {
  const queryClient = useQueryClient();
  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
  });

  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      toast.success("Appointment scheduled successfully");
    },
    onError: (error) => {
      toast.error(`Failed to schedule appointment: ${error.message}`);
    },
  });

  const [newAppointment, setNewAppointment] = React.useState({
    doctor: '',
    date: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setNewAppointment(prev => ({ ...prev, doctor: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAppointmentMutation.mutate(newAppointment);
    setNewAppointment({ doctor: '', date: '', time: '' });
  };

  if (isLoading) return <div>Loading appointments...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>
      
      <div className="mb-8 p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Schedule New Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="doctor">Doctor</Label>
            <Select onValueChange={handleSelectChange} value={newAppointment.doctor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dr. Smith">Dr. Smith</SelectItem>
                <SelectItem value="Dr. Johnson">Dr. Johnson</SelectItem>
                <SelectItem value="Dr. Lee">Dr. Lee</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" name="date" value={newAppointment.date} onChange={handleInputChange} />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input type="time" id="time" name="time" value={newAppointment.time} onChange={handleInputChange} />
          </div>
          <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">Schedule Appointment</Button>
        </form>
      </div>

      {appointments && appointments.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patient}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No appointments found.</div>
      )}
    </div>
  );
};

export default Appointments;
