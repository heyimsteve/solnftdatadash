// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CollectionResults from './components/CollectionResults';
import CollectionDetails from './components/CollectionDetails';
import { searchCollections } from './utils/api';
import TopCollections from './components/TopCollections';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchCollections(query);
      setSearchResults(results);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <>
                <SearchBar onSearch={handleSearch} />
                {isLoading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                <CollectionResults results={searchResults} />
                <TopCollections />
              </>
            } />
            <Route path="/collection/:id" element={<CollectionDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;