'use client';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromWishlist } from '@/store/slices/wishlistSlice';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

const WishlistPage = () => {
    const dispatch = useAppDispatch();
    const wishlistItems = useAppSelector((state) => state.wishlist.items);
    const totalItems = useAppSelector((state) => state.wishlist.totalItems);

    const handleRemoveFromWishlist = (productId) => {
        dispatch(removeFromWishlist(productId));
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                        <p className="text-gray-600 mt-2">
                            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your wishlist
                        </p>
                    </div>

                    {/* Wishlist Content */}
                    {wishlistItems.length > 0 ? (
                        <div className="bg-white rounded-lg shadow-sm">
                            <div className="p-6">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {wishlistItems.map((item) => (
                                        <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                                {item.image ? (
                                                    <Image 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        fill
                                                        className="object-cover"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <FiHeart className="w-12 h-12" />
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                                                <p className="text-lg font-bold text-blue-600">{formatPrice(item.price)}</p>
                                                
                                                <div className="flex gap-2 pt-2">
                                                    <Link 
                                                        href={`/products/${item.id}`}
                                                        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                                    >
                                                        View Product
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleRemoveFromWishlist(item.id)}
                                                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Remove from wishlist"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <FiHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                            <p className="text-gray-600 mb-6">Start adding products you love to your wishlist!</p>
                            <Link 
                                href="/"
                                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Browse Products
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;