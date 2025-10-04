'use client';

import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, cartItems = [] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  // Check if product is already in cart
  const isInCart = cartItems.some(item => item.id === product.id);

  return (
    <div 
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {/* Clickable image area */}
        <Link href={`/products/${product.id}`} className="block h-full">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'
                }`}
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="text-center text-gray-400">
                <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-sm">No Image</p>
              </div>
            </div>
          )}
        </Link>

        {/* Action Buttons - Outside Link */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}>
          <button
            onClick={() => {
              onAddToWishlist?.(product);
            }}
            className="cursor-pointer w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 group/btn"
            title="Add to Wishlist"
          >
            <FiHeart className="w-5 h-5 text-gray-600 group-hover/btn:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Add to Cart Button - Outside Link */}
        <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
          <button
            onClick={() => {
              onAddToCart?.(product);
            }}
            className={`cursor-pointer w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 group/btn ${
              isInCart 
                ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            disabled={isInCart}
          >
            <FiShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            {isInCart ? 'Already in Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="p-4">
        {/* Product Name */}
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Product Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {truncateDescription(product.description)}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-gray-500">
              Price inclusive of all taxes
            </span>
          </div>
        </div>

      
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
