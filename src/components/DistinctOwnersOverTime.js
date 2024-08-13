// src/components/DistinctOwnersOverTime.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DistinctOwnersOverTime = ({ ownersData }) => {
  if (!ownersData || ownersData.length === 0) {
    return <div>No distinct owners data available</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Distinct Owners Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={ownersData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="owners" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistinctOwnersOverTime;