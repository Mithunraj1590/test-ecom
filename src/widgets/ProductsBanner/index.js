'use client';

import { FiSearch, FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { useState } from 'react';

const ProductsBanner = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    // TODO: Implement view mode functionality
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Banner Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Products
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover our wide range of high-quality products at unbeatable prices. 
              Find exactly what you&apos;re looking for with our comprehensive collection.
            </p>
          </div>


          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">100+</div>
              <div className="text-blue-100">Products Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-blue-100">Customer Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold mb-1">Free</div>
              <div className="text-blue-100">Shipping on Orders $50+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsBanner;
