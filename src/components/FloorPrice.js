// src/components/FloorPrice.js
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FloorPrice = ({ floorPriceData, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Floor Price</h3>
        <p className="text-red-500">Error loading floor price data: {error}</p>
      </div>
    );
  }

  if (!floorPriceData || floorPriceData.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4">Floor Price</h3>
        <p>No floor price data available. This could be due to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>The collection is new and has no price history yet</li>
          <li>There might be an issue with the data source</li>
          <li>The collection ID might be incorrect</li>
        </ul>
      </div>
    );
  }

  const validData = floorPriceData.filter(item => 
    item.floorPrice !== 'N/A' && 
    !isNaN(parseFloat(item.floorPrice))
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = floorPriceData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Floor Price</h3>
      {validData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={validData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timeframe" 
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(value) => new Date(value).toLocaleString()}
              formatter={(value) => [`${value} SOL`, "Floor Price"]}
            />
            <Line type="monotone" dataKey="floorPrice" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p>No valid data for chart display</p>
      )}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeframe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Floor Price (SOL)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Listings</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume (SOL)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{data.timeframe}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.floorPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.listings}</td>
                <td className="px-6 py-4 whitespace-nowrap">{data.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(floorPriceData.length / itemsPerPage) }, (_, i) => (
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
  );
};

export default FloorPrice;