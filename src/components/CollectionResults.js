// src/components/CollectionResults.js
import React from 'react';
import { Link } from 'react-router-dom';

const CollectionResults = ({ results }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((collection) => (
        <Link
          to={`/collection/${collection.helloMoonCollectionId}`}
          key={collection.helloMoonCollectionId}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative h-48 bg-gray-200">
            <img
              src={collection.sample_image}
              alt={collection.collectionName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
          </div>
          <div className="p-4">
            <h3 className="font-bold text-xl mb-2">{collection.collectionName}</h3>
            <p className="text-gray-600">
              Floor Price: {collection.close !== 'N/A' ? `${collection.close} SOL` : 'N/A'}
            </p>
            <p className="text-gray-600">
              Holders: {collection.currentOwnerCount !== 'N/A' ? collection.currentOwnerCount.toLocaleString() : 'N/A'}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CollectionResults;