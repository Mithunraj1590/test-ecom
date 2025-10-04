'use client';

import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import Loading from '@/components/Loading';
import Image from 'next/image';

const CartPage = () => {
  const { 
    items: cartItems, 
    totalItems: cartTotalItems, 
    totalPrice: cartTotalPrice, 
    loading, 
    updateQuantity, 
    removeItem, 
    clearCartItems 
  } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
  };

  const handleClearCart = () => {
    clearCartItems();
  };


  if (loading) {
    return <Loading fullScreen text="Loading cart..." />;
  }

  return (
    <section className="min-h-screen bg-gray-50">
     
      <div className="bg-white shadow-sm py-3">
        <div className="container py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
            <Link 
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors self-start"
            >
              <FiArrowLeft className="w-5 h-5 mr-2" />
              <span className="hidden xs:inline">Continue Shopping</span>
              <span className="xs:hidden">Back</span>
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">Shopping Cart</h1>
            <div className="text-sm text-gray-600 text-center sm:text-right">
              {cartTotalItems} {cartTotalItems === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>
      </div>

      <div className='py-4 sm:py-8'>
      <div className="container px-4 sm:px-6">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Cart Items ({cartTotalItems})
                    </h2>
                    {cartItems.length > 0 && (
                      <button
                        onClick={handleClearCart}
                        className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors"
                      >
                        Clear Cart
                      </button>
                    )}
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                        {/* Product Image */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 self-center sm:self-auto">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 80px, 80px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FiShoppingBag className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0 text-center sm:text-left">
                          <h3 className="text-base sm:text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2 hidden sm:block">
                            {item.description}
                          </p>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 mt-2">
                            ${parseFloat(item.price).toFixed(2)}
                          </p>
                        </div>

                        {/* Mobile Layout - Quantity, Total, and Remove */}
                        <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 text-black rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium text-black">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 text-black rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <FiPlus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <p className="text-base sm:text-lg font-semibold text-gray-900">
                              ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-2 transition-colors"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm lg:sticky lg:top-4">
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium text-black">${parseFloat(cartTotalPrice).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium text-black">
                        {parseFloat(cartTotalPrice) > 50 ? 'Free' : '$9.99'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium text-black">
                        ${(parseFloat(cartTotalPrice) * 0.08).toFixed(2)}
                      </span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex justify-between text-lg font-semibold text-black">
                      <span>Total:</span>
                      <span>
                        ${(parseFloat(cartTotalPrice) + (parseFloat(cartTotalPrice) > 50 ? 0 : 9.99) + (parseFloat(cartTotalPrice) * 0.08)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Link
                      href="/checkout"
                      className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center text-sm sm:text-base"
                    >
                      Proceed to Checkout
                    </Link>
                    <Link
                      href="/products"
                      className="block w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center text-sm sm:text-base"
                    >
                      Continue Shopping
                    </Link>
                  </div>

                  
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="text-center py-8 sm:py-16">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <FiShoppingBag className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base px-4">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
      </div>
    </section>
  );
};

export default CartPage;
