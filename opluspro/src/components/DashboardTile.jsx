import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardTile = ({ title, icon, value, onClick }) => (
  <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-orange-50 dark:bg-orange-900" onClick={onClick}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-200">{title}</CardTitle>
      {React.cloneElement(icon, { className: "h-4 w-4 text-orange-600 dark:text-orange-400" })}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{value}</div>
    </CardContent>
  </Card>
);

export default DashboardTile;