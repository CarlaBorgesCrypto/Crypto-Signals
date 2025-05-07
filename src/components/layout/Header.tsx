import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  TrendingUp, 
  Menu, 
  X, 
  User, 
  LogOut, 
  HelpCircle, 
  BarChart3, 
  Package,
  Home
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'Plans', path: '/plans', icon: <Package size={18} /> },
    { name: 'Statistics', path: '/dashboard', icon: <BarChart3 size={18} /> },
    { name: 'Signals', path: '/signals', icon: <TrendingUp size={18} /> },
    { name: 'Support', path: '/support', icon: <HelpCircle size={18} /> },
    { name: 'ADMIN', path: '/manage-signals', icon: <TrendingUp size={18} /> }, // Updated here
  ];
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <TrendingUp className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">CryptoSignals</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <span className="mr-1.5">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Authentication Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  <User size={18} className="mr-1.5" />
                  Dashboard
                </Link>
                <button 
                  onClick={logout} 
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  <LogOut size={18} className="mr-1.5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="btn-primary"
              >
                <User size={18} className="mr-1.5" />
                Login / Register
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="container-custom py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2.5 rounded-md transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={closeMenu}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}
            
            <div className="pt-2 border-t border-gray-200">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-3 py-2.5 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                    onClick={closeMenu}
                  >
                    <User size={18} className="mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="w-full flex items-center px-3 py-2.5 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center px-3 py-2.5 rounded-md text-primary-600 hover:text-primary-700 hover:bg-primary-50"
                  onClick={closeMenu}
                >
                  <User size={18} className="mr-2" />
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
