
import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import MaintenanceRequests from '../components/MaintenanceRequests';
import RecentActivity from '../components/RecentActivity';
import PropertyOverview from '../components/PropertyOverview';
import ChatBot from '../components/ChateBot';
import { useAuth } from '../contexts/AuthContext';
import TestimonialCarousel from './Textimonial';
import Search from './Search';
import Footer from './Footer';
import logo from '../assets/logo.png'
const Dashboard = () =>{ 
  const { user } = useAuth();
  const [textColorIndex, setTextColorIndex] = useState(0);
  
  const colors = [
    'text-blue-600',
    'text-purple-600',
    'text-indigo-600',
    'text-pink-600',
    'text-teal-600'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextColorIndex((prev) => (prev + 1) % colors.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8">
      {/* Welcome Section with Gradient Background */}
      <div className="relative overflow-hidden bg-yellow-300 rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50/50" />
        <div className="relative px-6 py-2 md:py-12 text-center">
          <h1 className={`text-3xl md:text-4xl font-bold mb-1 mt-0 transition-all duration-600
                         animate-bounce ${colors[textColorIndex]}
                         tracking-tight leading-none`}>
              <img src={logo} alt="RentEasy Logo" className="h-8 w-8 animate-spin-slow" />
            Welcome to RentEasy, {user?.displayName || user?.name || 'User'}!
          </h1>
          <p className={`text-2xl font-bold transition-all duration-900 animate-pulse
                        ${colors[(textColorIndex + 2) % colors.length]}`}>
            Effortless property management starts here today.
          </p>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
        <Carousel />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className={`text-xl font-semibold mb-4 transition-all duration-500
                           animate-bounce ${colors[(textColorIndex + 1) % colors.length]}`}>
              Maintenance Requests
            </h2>
            <MaintenanceRequests />
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className={`text-xl font-semibold mb-4 transition-all duration-500
                           animate-bounce ${colors[(textColorIndex + 3) % colors.length]}`}>
              Recent Activity
            </h2>
            <RecentActivity />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className={`text-xl font-semibold mb-4 transition-all duration-500
                           animate-bounce ${colors[(textColorIndex + 4) % colors.length]}`}>
              Property Overview
            </h2>
            <PropertyOverview />
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className={`text-xl font-semibold mb-4 transition-all duration-500
                           animate-bounce ${colors[(textColorIndex + 2) % colors.length]}`}>
              Chat Assistant
            </h2>
            <ChatBot />
          </div>
        </div>
      </div>

      {/* Grid Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
       
      </div>
     
      <div className='mt-20 w-full'>
     <TestimonialCarousel/>
     </div>
     <div className='mt-10'>
       <Search/>
     </div>
     <div className='mt-0'>
      <Footer/>
     </div>
    </div>
    
  );
 
};

export default Dashboard;