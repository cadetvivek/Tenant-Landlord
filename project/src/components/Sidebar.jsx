import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Building2, 
  Wrench, 
  MessageSquare, 
  CreditCard, 
  Calendar, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Building2, label: 'Properties', path: '/properties' },
    { icon: Wrench, label: 'Maintenance', path: '/maintenance' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: CreditCard, label: 'Payments', path: '/payments' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm lg:hidden z-20 
                     transition-opacity duration-300 ease-in-out"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white/95 backdrop-blur-md shadow-xl 
                   transform transition-all duration-300 ease-in-out z-30
                   border-r border-gray-100
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                   lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              PropertyConnect
            </h1>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 px-3">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center px-3 py-2.5 rounded-lg mb-1 
                         transition-all duration-200 group relative
                         ${location.pathname === item.path 
                           ? 'bg-blue-50 text-blue-600' 
                           : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}
              onClick={() => onClose()}
            >
              <item.icon className={`w-5 h-5 mr-3 transition-transform duration-200 
                                   group-hover:scale-110
                                   ${location.pathname === item.path ? 'text-blue-600' : 'text-gray-500'}`} 
              />
              <span className="text-sm font-medium">{item.label}</span>
              {location.pathname === item.path && (
                <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full 
                              transform transition-all duration-300" 
                />
              )}
            </Link>
          ))}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 w-full border-t border-gray-100">
          <div className="p-4 mx-3 my-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 
                              flex items-center justify-center text-white shadow-lg
                              transform transition-transform duration-200 hover:scale-105">
                  {user?.avatar || user?.name?.[0]}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 
                              border-2 border-white rounded-full" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 flex items-center text-red-600 
                     hover:bg-red-50 transition-colors duration-200
                     group"
          >
            <LogOut className="w-5 h-5 mr-3 transform transition-transform duration-200 
                              group-hover:rotate-12" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;