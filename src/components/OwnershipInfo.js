// src/components/OwnershipInfo.js
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const OwnershipInfo = ({ ownershipData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!ownershipData) {
    return <div>No ownership data available</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHolders = ownershipData.topHolders.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Ownership Information</h3>
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">Current Owners</h4>
        <p className="text-2xl font-bold">{ownershipData.currentOwners}</p>
      </div>
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">Owners Over Time</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={ownershipData.ownersOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="owners" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h4 className="text-xl font-semibold mb-2">Top Holders</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wallet</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NFTs Held</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentHolders.map((holder, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{indexOfFirstItem + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{holder.ownerAccount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{holder.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center">
          {Array.from({ length: Math.ceil(ownershipData.topHolders.length / itemsPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnershipInfo;