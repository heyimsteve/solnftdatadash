import React from 'react';

const CollectionVolatility = ({ volatilityData }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Collection Volatility</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(volatilityData).map(([period, data]) => (
          <div key={period} className="border p-4 rounded">
            <h4 className="font-semibold text-lg mb-2">{period} Volatility</h4>
            <p>Min: {data.min} SOL</p>
            <p>Max: {data.max} SOL</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionVolatility;