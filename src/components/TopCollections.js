import React, { useEffect, useState } from 'react';
import { getTopCollections } from '../utils/api';

const TopCollections = () => {
  const [topCollections, setTopCollections] = useState({
    floorPrice: [],
    volume: [],
    holders: [],
    washTrading: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopCollections = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [floorPrice, volume, holders, washTrading] = await Promise.all([
          getTopCollections('floorPrice'),
          getTopCollections('volume'),
          getTopCollections('holders'),
          getTopCollections('washTrading')
        ]);
        
        // Sort collections for each category
        const sortedFloorPrice = floorPrice
          .filter(c => c.floorPrice && c.floorPrice !== 'N/A')
          .sort((a, b) => Number(b.floorPrice) - Number(a.floorPrice));

        const sortedVolume = volume
          .filter(c => c.volume && c.volume !== 'N/A')
          .sort((a, b) => Number(b.volume) - Number(a.volume));

        const sortedHolders = holders
          .filter(c => c.holders && c.holders !== 'N/A')
          .sort((a, b) => Number(b.holders) - Number(a.holders));

        const sortedWashTrading = washTrading
          .filter(c => c.washTradingScore && c.washTradingScore !== 'N/A')
          .sort((a, b) => Number(b.washTradingScore) - Number(a.washTradingScore));

        setTopCollections({ 
          floorPrice: sortedFloorPrice,
          volume: sortedVolume,
          holders: sortedHolders,
          washTrading: sortedWashTrading
        });
      } catch (err) {
        console.error('Error fetching top collections:', err);
        setError('Failed to fetch top collections. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopCollections();
  }, []);

  const renderCollectionCard = (collection, category) => {
    const renderItem = (label, value, formatter = (v) => v) => {
      if (value && value !== 'N/A') {
        return <p>{label}: {formatter(value)}</p>;
      }
      return null;
    };

    return (
      <div key={collection.helloMoonCollectionId} className="bg-white shadow rounded-lg p-4">
        <img src={collection.image} alt={collection.name} className="w-full h-32 object-cover rounded mb-2" />
        <h3 className="font-bold text-lg mb-2">{collection.name}</h3>
        {renderItem('Supply', collection.supply, (v) => v.toLocaleString())}
        {renderItem('Listings', collection.listings, (v) => v.toLocaleString())}
        {renderItem('Holders', collection.holders, (v) => v.toLocaleString())}
        {renderItem('Floor Price', collection.floorPrice, (v) => `${Number(v).toFixed(2) / 1000000000} SOL`)}
        {renderItem('Market Cap', collection.marketCap, (v) => `$${Number(v).toLocaleString()}`)}
        {category === 'washTrading' && renderItem('Wash Trading Score', collection.washTradingScore, (v) => `${Number(v).toFixed(2)} %`)}
        {renderItem('Avg Price', collection.avgPrice, (v) => `${Number(v).toFixed(2)} SOL`)}
        {renderItem('Volume', collection.volume, (v) => `${Number(v).toFixed(2) / 1000000000} SOL`)}
      </div>
    );
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading top collections...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Top Collections</h2>
      {Object.entries(topCollections).map(([category, collections]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Top by {category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {collections.slice(0, 6).map(collection => renderCollectionCard(collection, category))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopCollections;