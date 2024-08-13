// src/components/NFTLoanSummary.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const NFTLoanSummary = ({ loanSummaryData }) => {
  if (!loanSummaryData || loanSummaryData.length === 0) {
    return <div>No loan summary data available</div>;
  }

  const prepareChartData = (data) => {
    return data.map(item => ({
      market: item.market,
      volumeSol: parseFloat(item.volumeSol.toFixed(2)),
      offeredLoans: item.cntOffered,
      acceptedLoans: item.cntAccepted,
      repaidLoans: item.cntRepayed,
      liquidatedLoans: item.cntLiquidated
    }));
  };

  const chartData = prepareChartData(loanSummaryData);

  const totalVolume = loanSummaryData.reduce((sum, item) => sum + item.volumeSol, 0);
  const totalOffered = loanSummaryData.reduce((sum, item) => sum + item.cntOffered, 0);
  const totalAccepted = loanSummaryData.reduce((sum, item) => sum + item.cntAccepted, 0);
  const totalRepaid = loanSummaryData.reduce((sum, item) => sum + item.cntRepayed, 0);
  const totalLiquidated = loanSummaryData.reduce((sum, item) => sum + item.cntLiquidated, 0);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">NFT Loan Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Volume</p>
          <p className="text-lg font-semibold">{totalVolume.toFixed(2)} SOL</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Offered</p>
          <p className="text-lg font-semibold">{totalOffered}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Accepted</p>
          <p className="text-lg font-semibold">{totalAccepted}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Repaid</p>
          <p className="text-lg font-semibold">{totalRepaid}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Liquidated</p>
          <p className="text-lg font-semibold">{totalLiquidated}</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="market" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="volumeSol" fill="#8884d8" name="Volume (SOL)" />
          <Bar yAxisId="right" dataKey="acceptedLoans" fill="#82ca9d" name="Accepted Loans" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume (SOL)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Offered</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accepted</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repaid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Liquidated</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Lenders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unique Borrowers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg APY (%)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Duration (days)</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loanSummaryData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{item.market}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.volumeSol.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.cntOffered}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.cntAccepted}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.cntRepayed}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.cntLiquidated}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.cntUniqueLenders}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.cntUniqueBorrowers}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.avgApy ? item.avgApy.toFixed(2) : 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{(item.avgLoanDurationSeconds / 86400).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NFTLoanSummary;