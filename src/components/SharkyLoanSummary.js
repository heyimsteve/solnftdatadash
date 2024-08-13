import React from 'react';

const SharkyLoanSummary = ({ loanData }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Sharky Loan Summary</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Length</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Num of Defaults</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Num Repaid</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default Rate</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loanData.map((loan, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{loan.granularity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.numDefaults}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.numRepaid}</td>
                <td className="px-6 py-4 whitespace-nowrap">{loan.defaultRate.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SharkyLoanSummary;