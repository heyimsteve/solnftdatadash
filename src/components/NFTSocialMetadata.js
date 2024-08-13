import React from 'react';

const NFTSocialMetadata = ({ socialData }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-2xl font-bold mb-4">Social Information</h3>
      <p className="mb-4">{socialData.narrative}</p>
      <div className="flex space-x-4">
        {socialData.twitter && (
          <a href={socialData.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Twitter
          </a>
        )}
        {socialData.discord && (
          <a href={socialData.discord} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline">
            Discord
          </a>
        )}
        {socialData.website && (
          <a href={socialData.website} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:underline">
            Website
          </a>
        )}
      </div>
    </div>
  );
};

export default NFTSocialMetadata;