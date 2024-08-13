import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import CollectionStats from './CollectionStats';
import OwnershipInfo from './OwnershipInfo';
import FloorPrice from './FloorPrice';
import SharkyLoanSummary from './SharkyLoanSummary';
import CollectionSocial from './CollectionSocial';
import CollectionVolatility from './CollectionVolatility';
import DistinctOwnersOverTime from './DistinctOwnersOverTime';
import HoldingPeriod from './HoldingPeriod';
import NFTLoanSummary from './NFTLoanSummary';
import CollectionStatsWithFloorPrice from './CollectionStatsWithFloorPrice';
import { 
  getCollectionStats, 
  getSharkyLoanSummary, 
  getOwnershipInfo, 
  getFloorPrice,
  getCollectionSocial,
  getCollectionVolatility,
  getDistinctOwnersOverTime,
  getHoldingPeriod,
  getNFTLoanSummary,
  getCollectionStatsWithFloorPrice
} from '../utils/api';

const CollectionDetails = () => {
  const { id } = useParams();
  const [collectionData, setCollectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCollectionData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [
        stats,
        loanData,
        ownershipData,
        floorPriceData,
        socialData,
        volatilityData,
        distinctOwnersOverTime,
        holdingPeriod,
        nftLoanSummary,
        statsWithFloorPrice
      ] = await Promise.all([
        getCollectionStats(id),
        getSharkyLoanSummary(id),
        getOwnershipInfo(id),
        getFloorPrice(id),
        getCollectionSocial(id),
        getCollectionVolatility(id),
        getDistinctOwnersOverTime(id),
        getHoldingPeriod(id),
        getNFTLoanSummary(id),
        getCollectionStatsWithFloorPrice(id)
      ]);
      setCollectionData({ 
        stats, 
        loanData, 
        ownershipData, 
        floorPriceData,
        socialData,
        volatilityData,
        distinctOwnersOverTime,
        holdingPeriod,
        nftLoanSummary,
        statsWithFloorPrice
      });
    } catch (err) {
      console.error('Error fetching collection data:', err);
      setError('An error occurred while fetching collection data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCollectionData();
  }, [fetchCollectionData]);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!collectionData) {
    return <div className="text-center py-10">No data available for this collection.</div>;
  }

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-3xl font-bold mb-4">Collection Details</h2>
      <CollectionSocial socialData={collectionData.socialData} />
      <CollectionStats stats={collectionData.stats} floorPriceData={collectionData.floorPriceData} />
      <CollectionVolatility volatilityData={collectionData.volatilityData} />
      <CollectionStatsWithFloorPrice statsData={collectionData.statsWithFloorPrice} />
      <NFTLoanSummary loanSummaryData={collectionData.nftLoanSummary} />
      <SharkyLoanSummary loanData={collectionData.loanData} />
      <OwnershipInfo ownershipData={collectionData.ownershipData} />
      <FloorPrice floorPriceData={collectionData.floorPriceData} error={error} />
      <DistinctOwnersOverTime ownersData={collectionData.distinctOwnersOverTime} />
      <HoldingPeriod holdingPeriodData={collectionData.holdingPeriod} />
    </div>
  );
};

export default CollectionDetails;