import React from 'react';

const CollectionStats = ({ stats, floorPriceData }) => {
  const latestFloorPrice = floorPriceData && floorPriceData.length > 0 
    ? floorPriceData[floorPriceData.length - 1].floorPrice 
    : 'N/A';

  const formatValue = (value, prefix = '', suffix = '') => {
    if (value === undefined || value === null) return 'N/A';
    if (typeof value === 'number') return `${prefix}${value.toLocaleString()}${suffix}`;
    return `${prefix}${value}${suffix}`;
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Collection Stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatItem label="Supply" value={formatValue(stats.supply)} />
        <StatItem label="Holders" value={formatValue(stats.currentOwnerCount)} />
        <StatItem label="Listings" value={formatValue(stats.listingCount)} />
        <StatItem label="Avg Price" value={formatValue(stats.avg_price_sol, '', ' SOL')} />
        <StatItem label="Market Cap" value={formatValue(stats.market_cap_usd, '$')} />
        <StatItem label="Wash Trading Score" value={formatValue(stats.averageWashScore, '', '%')} />
        <StatItem label="Current Floor Price" value={formatValue(latestFloorPrice, '', ' SOL')} />
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

export default CollectionStats;