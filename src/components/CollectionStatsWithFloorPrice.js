// src/components/CollectionStatsWithFloorPrice.js
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CollectionStatsWithFloorPrice = ({ statsData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  if (!statsData || statsData.length === 0) {
    return <div>No collection stats available</div>;
  }

  const latestStats = statsData[0];
  const chartData = statsData.map(item => ({
    time: new Date(item.startTime * 1000).toLocaleTimeString(),
    open: item.open / 1e9,
    high: item.high / 1e9,
    low: item.low / 1e9,
    close: item.close / 1e9
  })).reverse();

  // Calculate pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = statsData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(statsData.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Collection Stats with Floor Price - 24 Hrs</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatItem label="Supply" value={latestStats.supply.toLocaleString()} />
        <StatItem label="Owners" value={latestStats.currentOwnerCount.toLocaleString()} />
        <StatItem label="Floor Price" value={`${(latestStats.floorPriceLamports / 1e9).toFixed(2)} SOL`} />
        <StatItem label="Market Cap" value={`${latestStats.marketCapSol.toFixed(2)} SOL`} />
        <StatItem label="Avg Price" value={`${latestStats.avg_price_sol.toFixed(2)} SOL`} />
        <StatItem label="Wash Trading Score" value={latestStats.averageWashScore.toFixed(2)} />
      </div>
      <div className="mb-6">
        <h4 className="text-xl font-semibold mb-2">Floor Price (Last 24 Hours)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={['dataMin', 'dataMax']} />
            <Tooltip 
              formatter={(value) => `${value.toFixed(2)} SOL`}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Area type="monotone" dataKey="close" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">High</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Low</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Close</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRows.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.startTime * 1000).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">{(item.open / 1e9).toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{(item.high / 1e9).toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{(item.low / 1e9).toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{(item.close / 1e9).toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{(item.volume / 1e9).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, statsData.length)} of {statsData.length} entries
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === number + 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

export default CollectionStatsWithFloorPrice;