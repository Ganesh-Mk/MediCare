import React, { useState, useEffect } from 'react';
import { User, LogIn, UserPlus, LogOut, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLogin') === 'true';
    setIsLoggedIn(loginStatus);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Desktop and Mobile Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <span className="text-4xl mr-2">👨‍⚕️</span>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              MedGenie
            </h1>
            <p className="text-sm text-gray-600 hidden md:block">Your AI Medical Assistant</p>
          </div>
        </div>

        {/* Desktop Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              {/* Login Button */}
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg 
                           hover:bg-blue-600 transition-all duration-300 ease-in-out 
                           transform hover:-translate-y-1 hover:scale-105 active:scale-95"
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>

              {/* Signup Button */}
              <Link
                to="/signup"
                className="flex items-center space-x-2 px-4 py-2 border-2 border-blue-500 text-blue-500 
                           rounded-lg hover:bg-blue-50 transition-all duration-300 ease-in-out 
                           transform hover:-translate-y-1 hover:scale-105 active:scale-95"
              >
                <UserPlus size={20} />
                <span>Signup</span>
              </Link>
            </>
          ) : (
            <>
              {/* Account Button */}
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-full 
                           hover:bg-green-600 transition-all duration-300 ease-in-out 
                           transform hover:-translate-y-1 hover:scale-105 active:scale-95"
              >
                <User size={20} />
                <span>My Account</span>
              </button>

              {/* Logout Button */}
              <button
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg 
                           hover:bg-red-600 transition-all duration-300 ease-in-out 
                           transform hover:-translate-y-1 hover:scale-105 active:scale-95"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-600 hover:text-blue-500 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {/* Mobile Logo */}
            <div className="flex items-center space-x-2 mb-8">
              <span className="text-4xl mr-2">👨‍⚕️</span>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  MedGenie
                </h1>
                <p className="text-sm text-gray-600">Your AI Medical Assistant</p>
              </div>
            </div>

            {/* Mobile Authentication Buttons */}
            {!isLoggedIn ? (
              <div className="flex flex-col space-y-4 w-full px-8">
                {/* Mobile Login Button */}
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg 
                             hover:bg-blue-600 transition-all duration-300 ease-in-out 
                             transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </Link>

                {/* Mobile Signup Button */}
                <Link
                  to="/signup"
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-blue-500 text-blue-500 
                             rounded-lg hover:bg-blue-50 transition-all duration-300 ease-in-out 
                             transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <UserPlus size={20} />
                  <span>Signup</span>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 w-full px-8">
                {/* Mobile Account Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-full 
                             hover:bg-green-600 transition-all duration-300 ease-in-out 
                             transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <User size={20} />
                  <span>My Account</span>
                </button>

                {/* Mobile Logout Button */}
                <button
                  onClick={toggleMobileMenu}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg 
                             hover:bg-red-600 transition-all duration-300 ease-in-out 
                             transform hover:-translate-y-1 hover:scale-105 active:scale-95"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={toggleMobileMenu}
              className="absolute top-6 right-6 text-gray-600 hover:text-red-500 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}