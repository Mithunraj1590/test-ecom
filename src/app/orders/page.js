'use client';

import { useState, useEffect } from 'react';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiArrowLeft, FiShoppingBag, FiMapPin, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';
import { getCurrentUser } from '@/utils/auth';
import Loading from '@/components/Loading';

const OrdersPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get current user data
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      fetchOrders(currentUser.token);
    }
  }, []);

  const fetchOrders = async (token) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/orders/list', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        setOrders(data.orders || []);
      } else {
        setError(data.error || 'Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('An error occurred while fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getOrderStatus = (order) => {
    // Simple status logic based on creation date
    const orderDate = new Date(order.created_at);
    const now = new Date();
    const daysDiff = Math.floor((now - orderDate) / (1000 * 60 * 60 * 24));

    if (daysDiff < 1) return { status: 'Processing', icon: FiClock, color: 'text-yellow-600' };
    if (daysDiff < 3) return { status: 'Shipped', icon: FiTruck, color: 'text-blue-600' };
    return { status: 'Delivered', icon: FiCheckCircle, color: 'text-green-600' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Orders</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => user && fetchOrders(user.token)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link 
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4 text-sm sm:text-base"
          >
            <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span className="hidden xs:inline">Back to Home</span>
            <span className="xs:hidden">Back</span>
          </Link>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 flex items-center justify-center sm:justify-start">
            <FiPackage className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mr-2 sm:mr-3" />
            My Orders
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base text-center sm:text-left">Track your order history and status.</p>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6 text-sm sm:text-base px-4">You haven&apos;t placed any orders yet. Start shopping to see your orders here.</p>
            <Link
              href="/"
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order) => {
              const orderStatus = getOrderStatus(order);
              const StatusIcon = orderStatus.icon;
              
              return (
                <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
                  {/* Order Header */}
                  <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-2">
                          <StatusIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${orderStatus.color}`} />
                          <span className={`font-medium text-sm sm:text-base ${orderStatus.color}`}>
                            {orderStatus.status}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          Order #{order.id}
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-lg sm:text-lg font-semibold text-gray-900">
                          ${parseFloat(order.total).toFixed(2)}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500 flex items-center">
                          <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="hidden sm:inline">{formatDate(order.created_at)}</span>
                          <span className="sm:hidden">{new Date(order.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-4 sm:px-6 py-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Items Ordered:</h4>
                    <div className="space-y-3">
                      {order.items && order.items.map((item, index) => (
                        <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-gray-100 last:border-b-0 space-y-1 sm:space-y-0">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {item.product_name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              Qty: {item.quantity} × ${parseFloat(item.price).toFixed(2)}
                            </p>
                          </div>
                          <div className="text-sm font-medium text-gray-900 text-right sm:text-left">
                            ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Address */}
                  {order.address && (
                    <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <div className="flex items-start space-x-2">
                        <FiMapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900">Delivery Address:</p>
                          <p className="text-sm text-gray-600 break-words">{order.address}</p>
                          {order.latitude && order.longitude && (
                            <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                              Coordinates: {order.latitude}, {order.longitude}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Orders Summary */}
        {orders.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-white shadow rounded-lg p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4 text-center sm:text-left">Order Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{orders.length}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  ${orders.reduce((total, order) => total + parseFloat(order.total), 0).toFixed(2)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Total Spent</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
                <div className="text-xl sm:text-2xl font-bold text-purple-600">
                  {orders.reduce((total, order) => total + (order.items ? order.items.length : 0), 0)}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Items Purchased</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;