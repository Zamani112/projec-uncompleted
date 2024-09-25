import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const fetchMedicalRecords = async () => {
  const response = await fetch('/api/medical-records');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const MedicalRecords = () => {
  const { data: medicalRecords, isLoading, error } = useQuery({
    queryKey: ['medicalRecords'],
    queryFn: fetchMedicalRecords,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Medical Records</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Diagnosis</TableHead>
            <TableHead>Prescription</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicalRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.doctor}</TableCell>
              <TableCell>{record.diagnosis}</TableCell>
              <TableCell>{record.prescription}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">View Details</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MedicalRecords;
