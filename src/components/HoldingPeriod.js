// src/components/HoldingPeriod.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const HoldingPeriod = ({ holdingPeriodData }) => {
  if (!holdingPeriodData || holdingPeriodData.length === 0) {
    return <div>No holding period data available</div>;
  }

  // Sort the holding periods in a logical order
  const sortOrder = {
    '< 1 Week': 1,
    '1-2 weeks': 2,
    '2-4 weeks': 3,
    '4-8 weeks': 4,
    '8 weeks - 180 days': 5,
    '> 180 days': 6
  };

  const sortedData = [...holdingPeriodData].sort((a, b) => 
    sortOrder[a.holdingPeriod] - sortOrder[b.holdingPeriod]
  );

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Holding Period</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="holdingPeriod" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="number" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Holding Period Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holding Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Holders</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedData.map((period, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{period.holdingPeriod}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{period.number.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HoldingPeriod;