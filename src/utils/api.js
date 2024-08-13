// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'https://rest-api.hellomoon.io/v0';
const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

export const searchCollections = async (query) => {
  try {
    const response = await api.post('/nft/collection/name', {
      searchStrategy: 'default',
      collectionName: query
    });

    const collections = response.data.data;
    const detailedCollections = await Promise.all(collections.map(async (collection) => {
      try {
        const statsResponse = await api.post('/nft/collection/stats', {
          granularity: 'ONE_MIN',
          helloMoonCollectionId: collection.helloMoonCollectionId,
          limit: 1
        });

        const stats = statsResponse.data.data[0] || {};
        return {
          ...collection,
          sample_image: `https://cdn.hellomoon.io/collection/${collection.helloMoonCollectionId}?apiKey=${API_KEY}&format=webp`,
          close: stats.close ? (stats.close / 1000000000).toFixed(2) : 'N/A',
          currentOwnerCount: stats.currentOwnerCount || 'N/A'
        };
      } catch (error) {
        console.error(`Error fetching stats for collection ${collection.helloMoonCollectionId}:`, error);
        return {
          ...collection,
          sample_image: `https://cdn.hellomoon.io/collection/${collection.helloMoonCollectionId}?apiKey=${API_KEY}&format=webp`,
          close: 'N/A',
          currentOwnerCount: 'N/A'
        };
      }
    }));

    return detailedCollections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};

export const getCollectionStats = async (collectionId) => {
  try {
    const response = await api.post('/nft/collection/stats', {
      granularity: 'ONE_MIN',
      helloMoonCollectionId: collectionId,
      limit: 1
    });

    const stats = response.data.data[0];
    return {
      supply: stats.supply,
      currentOwnerCount: stats.currentOwnerCount,
      listingCount: stats.listingCount,
      avg_price_sol: stats.avg_price_sol,
      market_cap_usd: stats.market_cap_usd,
      averageWashScore: stats.averageWashScore
    };
  } catch (error) {
    console.error('Error fetching collection stats:', error);
    throw error;
  }
};

export const getSharkyLoanSummary = async (collectionId) => {
  const response = await api.post('/sharky/default-stats', {
    helloMoonCollectionId: collectionId
  });
  return response.data.data;
};

export const getOwnershipInfo = async (collectionId) => {
  try {
    const [currentOwners, ownersOverTime, topHolders] = await Promise.all([
      api.post('/nft/collection/ownership/current', { helloMoonCollectionId: collectionId }),
      api.post('/nft/collection/ownership/historical', { 
        helloMoonCollectionId: collectionId,
        limit: 30 // Get data for the last 30 days
      }),
      api.post('/nft/collection/ownership/top-holders', { helloMoonCollectionId: collectionId })
    ]);

    return {
      currentOwners: currentOwners.data.data[0].numOwners,
      ownersOverTime: ownersOverTime.data.data.map(item => ({
        date: new Date(item.day).toLocaleDateString(),
        owners: item.numDistinct
      })),
      topHolders: topHolders.data.data
    };
  } catch (error) {
    console.error('Error fetching ownership info:', error);
    throw error;
  }
};

export const getFloorPrice = async (collectionId) => {
  try {
    console.log('Fetching floor price data for collection:', collectionId);
    const response = await api.post('/nft/collection/floorprice', {
      helloMoonCollectionId: collectionId,
      granularity: 'ONE_HOUR',
      limit: 24 // Get data for the last 24 hours
    });
    
    console.log('Raw API response:', response.data);

    if (!response.data.data || response.data.data.length === 0) {
      console.log('No data returned from API');
      return [];
    }

    const processedData = response.data.data.map((item, index) => ({
      timeframe: new Date(Date.now() - (23 - index) * 3600000).toLocaleString(), // Approximate time
      floorPrice: item.floorPriceLamports ? (item.floorPriceLamports / 1e9).toFixed(2) : 'N/A',
      listings: item.listing_count || 'N/A',
      volume: item.volumeLamports ? (item.volumeLamports / 1e9).toFixed(2) : 'N/A'
    }));

    console.log('Processed floor price data:', processedData);

    return processedData;
  } catch (error) {
    console.error('Error fetching floor price data:', error);
    console.error('Error details:', error.response?.data || error.message);
    throw error;
  }
};

export const getTopCollections = async (category) => {
  try {
    let endpoint = '/nft/collection/leaderboard/stats';
    let params = {
      granularity: 'ONE_DAY',
      limit: 9
    };

    // Adjust endpoint and params based on the category
    switch (category) {
      case 'floorPrice':
        endpoint = '/nft/collection/floorprices';
        params = {
          limit: 9
        };
        break;
      case 'volume':
        // Using the default endpoint (leaderboard/stats)
        // params are already set correctly
        break;
      case 'holders':
        endpoint = '/nft/collection/ownership/current';
        params = {
          limit: 9
        };
        break;
      case 'washTrading':
        endpoint = '/nft/collection/washtrading';
        params = {
          limit: 9
        };
        break;
      default:
        throw new Error('Invalid category');
    }

    const response = await api.post(endpoint, params);

    // Process and return the data
    return response.data.data.map(collection => ({
      helloMoonCollectionId: collection.helloMoonCollectionId,
      name: collection.collectionName || collection.name,
      image: `https://cdn.hellomoon.io/collection/${collection.helloMoonCollectionId}?apiKey=${API_KEY}&format=webp`,
      supply: collection.supply,
      listings: collection.listing_count || 'N/A',
      floorPrice: collection.floorPrice,
      marketCap: collection.market_cap_usd || 'N/A',
      holders: collection.current_owner_count || collection.numOwners || 'N/A',
      washTradingScore: collection.average_wash_score || collection.index || 'N/A',
      avgPrice: collection.avgPrice24hr || collection.avg_price_sol || 'N/A',
      volume: collection.volume || 'N/A'
    }));

  } catch (error) {
    console.error('Error fetching top collections:', error);
    throw error;
  }
};

// Function to get collection social data
export const getCollectionSocial = async (collectionId) => {
  try {
    const response = await api.post('/nft/social', {
      helloMoonCollectionId: collectionId
    });
    return response.data.data[0];
  } catch (error) {
    console.error('Error fetching collection social data:', error);
    throw error;
  }
};

// Function to get collection volatility
export const getCollectionVolatility = async (collectionId) => {
  try {
    const response = await api.post('/nft/collection/volatility', {
      helloMoonCollectionId: collectionId
    });
    const data = response.data.data[0];
    
    const formatValue = (value) => (value / 1e9).toFixed(2);

    return {
      '7d': {
        min: formatValue(data.volatility['7d'].min),
        max: formatValue(data.volatility['7d'].max)
      },
      '14d': {
        min: formatValue(data.volatility['14d'].min),
        max: formatValue(data.volatility['14d'].max)
      },
      '30d': {
        min: formatValue(data.volatility['30d'].min),
        max: formatValue(data.volatility['30d'].max)
      }
    };
  } catch (error) {
    console.error('Error fetching collection volatility:', error);
    throw error;
  }
};

export const getDistinctOwnersOverTime = async (collectionId) => {
  try {
    const response = await api.post('/nft/collection/ownership/historical', {
      helloMoonCollectionId: collectionId,
      limit: 30 // Get data for the last 30 days
    });
    return response.data.data.map(item => ({
      date: new Date(item.day).toLocaleDateString(),
      owners: item.numDistinct
    }));
  } catch (error) {
    console.error('Error fetching distinct owners over time:', error);
    throw error;
  }
};

export const getHoldingPeriod = async (collectionId) => {
  try {
    const response = await api.post('/nft/collection/ownership/holding-period', {
      helloMoonCollectionId: collectionId
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching holding period:', error);
    throw error;
  }
};

export const getNFTLoanSummary = async (collectionId) => {
  try {
    const response = await api.post('/nft/loans/collection-summary', {
      helloMoonCollectionId: collectionId
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching NFT loan summary:', error);
    throw error;
  }
};

export const getCollectionStatsWithFloorPrice = async (collectionId) => {
  try {
    const response = await api.post('/nft/collection/stats', {
      helloMoonCollectionId: collectionId,
      granularity: 'ONE_HOUR',
      limit: 24 // Get data for the last 24 hours
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching collection stats with floor price:', error);
    throw error;
  }
};