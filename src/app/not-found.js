'use client';

import Link from 'next/link';
import { FiHome, FiArrowLeft, FiSearch, FiShoppingBag } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-72px)] bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        {/* 404 Icon */}
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiSearch className="w-12 h-12 text-blue-600" />
        </div>

        {/* 404 Message */}
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <FiHome className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          
        
        </div>

     

      </div>
    </div>
  );
}
