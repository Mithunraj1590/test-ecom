'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCartAPI } from '@/store/slices/cartSlice';
import { addToWishlist } from '@/store/slices/wishlistSlice';
import { FiHeart, FiShoppingCart, FiArrowLeft, FiStar } from 'react-icons/fi';
import { productAPI } from '@/services/api';
import { checkAuthAndRedirect } from '@/utils/auth';
import Image from 'next/image';

const ProductDetail = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const fetchProductDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await productAPI.getProductById(params.id);
      
      if (result.success) {
        setProduct(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  const handleAddToCart = () => {
    if (!checkAuthAndRedirect()) {
      return; // User will be redirected to login
    }
    
    if (product) {
      // Check if product is already in cart
      const existingItem = cartItems.find(item => item.id === product.id);
      if (existingItem) {
        alert(`"${product.name}" is already in your cart!`);
        return;
      }
      
      dispatch(addToCartAPI({ product, quantity: 1 }));
    }
  };

  const handleAddToWishlist = () => {
    if (!checkAuthAndRedirect()) {
      return; // User will be redirected to login
    }
    
    if (product) {
      dispatch(addToWishlist(product));
      alert(`Added "${product.name}" to wishlist!`);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Not Found</h3>
          <p className="text-gray-600 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        <div className=" rounded-lg  overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm">No Image Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-gray-600">(4.5) • 128 reviews</span>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  {formatPrice(product.price)}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-4">
                
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">Availability:</span>
                  <span className="text-sm text-green-600 font-medium">In Stock</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`cursor-pointer flex-1 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                    cartItems.some(item => item.id === product.id)
                      ? 'bg-gray-400 hover:bg-gray-500 text-white cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                  disabled={cartItems.some(item => item.id === product.id)}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {cartItems.some(item => item.id === product.id) ? 'Already in Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="cursor-pointer flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <FiHeart className="w-5 h-5" />
                  Add to Wishlist
                </button>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Free Shipping</span>
                    <p className="text-gray-600">On orders over $50</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Returns</span>
                    <p className="text-gray-600">30-day return policy</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Warranty</span>
                    <p className="text-gray-600">1-year manufacturer warranty</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Support</span>
                    <p className="text-gray-600">24/7 customer support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
