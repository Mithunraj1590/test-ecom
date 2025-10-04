'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, fetchCartItemsAPI } from '@/store/slices/cartSlice';
import { removeFromWishlist } from '@/store/slices/wishlistSlice';
import { useAuth } from '@/hooks/useAuth';
import {
    FiHeart,
    FiSearch,
    FiShoppingCart,
    FiUser,
    FiChevronDown,
    FiMenu,
    FiTrash2,
    FiX
} from 'react-icons/fi';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const pathname = usePathname();
    
    // Redux selectors and dispatch
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const cartTotalItems = useAppSelector((state) => state.cart.totalItems);
    const cartTotalPrice = useAppSelector((state) => state.cart.totalPrice);
    const wishlistItems = useAppSelector((state) => state.wishlist.items);
    const wishlistTotalItems = useAppSelector((state) => state.wishlist.totalItems);

    // Use authentication hook
    const { user, authenticated, logout } = useAuth();

    // Close all dropdowns when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
    }, [pathname]);

    // Close all dropdowns function
    const closeAllDropdowns = () => {
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(false);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
    };

    // Fetch cart items when user clicks on cart
    const handleCartClick = () => {
        if (authenticated && user?.token) {
            dispatch(fetchCartItemsAPI());
        }
        // Close other dropdowns before opening cart
        setIsUserMenuOpen(false);
        setIsWishlistOpen(false);
        setIsMobileMenuOpen(false);
        setIsCartOpen(!isCartOpen);
    };

    // Handle wishlist dropdown
    const handleWishlistClick = () => {
        // Close other dropdowns before opening wishlist
        setIsUserMenuOpen(false);
        setIsCartOpen(false);
        setIsMobileMenuOpen(false);
        setIsWishlistOpen(!isWishlistOpen);
    };

    // Handle user menu dropdown
    const handleUserMenuClick = () => {
        // Close other dropdowns before opening user menu
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsMobileMenuOpen(false);
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    // Handle mobile menu
    const handleMobileMenuClick = () => {
        // Close other dropdowns before opening mobile menu
        setIsUserMenuOpen(false);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Handle logout
    const handleLogout = () => {
        logout();
        closeAllDropdowns();
        // Refresh the page to clear any cached state and ensure clean logout
        window.location.reload();
    };

    // Handle remove from cart
    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    // Handle remove from wishlist
    const handleRemoveFromWishlist = (productId) => {
        dispatch(removeFromWishlist(productId));
    };

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    // Get display name for user
    const getUserDisplayName = () => {
        if (!user) return '';
        return user.username || user.firstName || user.email || 'User';
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50 py-1">
            <div className="container mx-auto px-3 sm:px-4 lg:px-8">
                <div className="flex justify-between items-center h-14 sm:h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <span className="text-lg sm:text-xl font-bold text-gray-900">E-Commerce</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Home
                        </Link>
                        <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Products
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                            About
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-2 lg:space-x-4 h-auto">
                        {/* Search Icon */}
                        <button className="p-1 sm:p-2 text-gray-700 hover:text-blue-600 transition-colors">
                            <FiSearch className="w-5 h-5 sm:w-5 sm:h-5" />
                        </button>

                        {/* Wishlist */}
                        <div className="relative">
                            {/* Mobile: Direct link to wishlist page */}
                            <Link 
                                href="/wishlist"
                                className="cursor-pointer p-1 sm:p-2 text-gray-700 hover:text-blue-600 transition-colors relative lg:hidden"
                            >
                                <FiHeart className="w-5 h-5 sm:w-5 sm:h-5" />
                                {wishlistTotalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                                        {wishlistTotalItems}
                                    </span>
                                )}
                            </Link>

                            {/* Desktop: Dropdown functionality */}
                            <div className="hidden lg:block">
                                <button 
                                    onClick={handleWishlistClick}
                                    className="cursor-pointer p-1 sm:p-2 text-gray-700 hover:text-blue-600 transition-colors relative"
                                >
                                    <FiHeart className="w-5 h-5 sm:w-5 sm:h-5" />
                                    {wishlistTotalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                                            {wishlistTotalItems}
                                        </span>
                                    )}
                                </button>

                                {/* Wishlist Dropdown */}
                                {isWishlistOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                                        <div className="p-4 border-b">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-black">Wishlist</h3>
                                                <button 
                                                    onClick={closeAllDropdowns}
                                                    className="cursor-pointer text-gray-400 hover:text-gray-600"
                                                >
                                                    <FiX className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="max-h-64 overflow-y-auto">
                                            {wishlistItems.length > 0 ? (
                                                wishlistItems.map((item) => (
                                                    <div key={item.id} className="p-4 border-b flex items-center space-x-3">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                            {item.image ? (
                                                                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                    <FiHeart className="w-6 h-6" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                                                            <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
                                                        </div>
                                                        <button 
                                                            onClick={() => handleRemoveFromWishlist(item.id)}
                                                            className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                                                        >
                                                            <FiTrash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-8 text-center text-gray-500">
                                                    <FiHeart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                                    <p>Your wishlist is empty</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cart */}
                        <div className="relative">
                            {/* Mobile: Direct link to cart page */}
                            <Link 
                                href="/cart"
                                className="cursor-pointer p-1 sm:p-2 text-gray-700 hover:text-blue-600 transition-colors relative lg:hidden"
                            >
                                <FiShoppingCart className="w-5 h-5 sm:w-5 sm:h-5" />
                                {cartTotalItems > 0 && (
                                    <span className="absolute top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                                        {cartTotalItems}
                                    </span>
                                )}
                            </Link>

                            {/* Desktop: Dropdown functionality */}
                            <div className="hidden lg:block">
                                <button 
                                    onClick={handleCartClick}
                                    className="cursor-pointer p-1 sm:p-2 text-gray-700 hover:text-blue-600 transition-colors relative"
                                >
                                    <FiShoppingCart className="w-6 h-6 sm:w-5 sm:h-5" />
                                    {cartTotalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                                            {cartTotalItems}
                                        </span>
                                    )}
                                </button>

                                {/* Cart Dropdown */}
                                {isCartOpen && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                                        <div className="p-4 border-b">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-semibold text-black">Shopping Cart</h3>
                                                <button 
                                                    onClick={closeAllDropdowns}
                                                    className="cursor-pointer text-gray-400 hover:text-gray-600"
                                                >
                                                    <FiX className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="max-h-64 overflow-y-auto">
                                            {cartItems.length > 0 ? (
                                                cartItems.map((item) => (
                                                    <div key={item.id} className="p-4 border-b flex items-center space-x-3">
                                                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                            {item.image ? (
                                                                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                                    <FiShoppingCart className="w-6 h-6" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                            <p className="text-sm font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                                                        </div>
                                                        <button 
                                                            onClick={() => handleRemoveFromCart(item.id)}
                                                            className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                                                        >
                                                            <FiTrash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-8 text-center text-gray-500">
                                                    <FiShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                                                    <p>Your cart is empty</p>
                                                </div>
                                            )}
                                        </div>

                                        {cartItems.length > 0 && (
                                            <div className="p-4 border-t bg-gray-50">
                                                <div className="flex justify-between items-center mb-3 text-black">
                                                    <span className="font-semibold">Total:</span>
                                                    <span className="font-bold text-lg">{formatPrice(cartTotalPrice)}</span>
                                                </div>
                                                <Link 
                                                    href="/cart"
                                                    className="block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                                    onClick={closeAllDropdowns}
                                                >
                                                    View Cart
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User Menu */}
                        {authenticated ? (
                            <div className="relative hidden lg:block">
                                <Link 
                                    href="/orders"
                                    className="cursor-pointer flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-blue-600 transition-colors lg:hidden"
                                >
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                        <FiUser className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                                    </div>
                                </Link>

                                {/* Desktop User Dropdown */}
                                <div className="hidden lg:block">
                                    <button 
                                        onClick={handleUserMenuClick}
                                        className="cursor-pointer flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                                            <FiUser className="w-4 h-4 text-white" />
                                        </div>
                                    </button>

                                    {/* User Dropdown */}
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50">
                                            <div className="p-4 border-b">
                                                <p className="text-sm text-gray-500">Welcome back!</p>
                                                <p className="font-medium text-gray-900 truncate">{getUserDisplayName()}</p>
                                            </div>
                                            <div className="py-2">
                                                <Link 
                                                    href="/orders" 
                                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                                    onClick={closeAllDropdowns}
                                                >
                                                    My Orders
                                                </Link>
                                                <button 
                                                    onClick={handleLogout}
                                                    className="cursor-pointer block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center space-x-2">
                                <Link 
                                    href="/login" 
                                    className="text-gray-700 hover:text-blue-600 transition-colors text-sm sm:text-base"
                                >
                                    Sign In
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="bg-blue-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                                >
                                    Create Account
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button 
                            onClick={handleMobileMenuClick}
                            className="lg:hidden p-1 sm:p-2 text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            <FiMenu className="w-7 h-7 sm:w-5 sm:h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t bg-white absolute z-[9] w-full left-0 h-[calc(100vh-56px)]">
                        <div className="px-3 pt-2 pb-3 gap-2 flex flex-col h-full">
                            <Link 
                                href="/" 
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={closeAllDropdowns}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/products" 
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={closeAllDropdowns}
                            >
                                Products
                            </Link>
                            <Link 
                                href="/about" 
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={closeAllDropdowns}
                            >
                                About
                            </Link>
                            <Link 
                                href="/contact" 
                                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={closeAllDropdowns}
                            >
                                Contact
                            </Link>
                            
                            {!authenticated && (
                                <>
                                    <div className="border-t border-gray-200 pt-4 py-5 mt-auto">
                                        <Link 
                                            href="/login" 
                                            className="block px-4 py-3 bg-blue-600 text-center text-white hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                                            onClick={closeAllDropdowns}
                                        >
                                            Sign In
                                        </Link>
                                        <Link 
                                            href="/register" 
                                            className="block px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-200 font-medium text-center mt-2 shadow-md hover:shadow-lg"
                                            onClick={closeAllDropdowns}
                                        >
                                            Create Account
                                        </Link>
                                    </div>
                                </>
                            )}
                            
                            {authenticated && (
                                <>
                                    <Link 
                                        href="/orders" 
                                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                                        onClick={closeAllDropdowns}
                                    >
                                        My Orders
                                    </Link>
                                    <button 
                                        onClick={handleLogout}
                                        className="mt-auto block px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-200 font-medium text-center mb-2 shadow-md hover:shadow-lg"
                                        >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;