import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const properties = [
  
    {
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Spacious 3BHK with modern amenities in prime location',
      price: '₹25,000/month',
      features: ['3 BHK', 'Modern Amenities', 'Prime Location']
    },
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      description: 'Luxurious 2BHK apartment with clubhouse access',
      price: '₹35,000/month',
      features: ['2 BHK', 'Clubhouse Access', 'Luxury Living']
    },
    {
      image: 'https://is1-3.housingcdn.com/4f2250e8/da3f33af18d3a130808b42deef86122f/v0/fs/happy_zen_villas-tellapur-hyderabad-happy_horizons_property_consultants.jpeg',
      description: 'Fully furnished studio apartment near metro station',
      price: '₹18,000/month',
      features: ['Studio', 'Fully Furnished', 'Metro Access']
    },
    {
      image: 'https://www.favouritehomes.com/wp-content/uploads/2021/12/luxury-villa.jpg',
      description: 'Premium villa with private garden and parking',
      price: '₹55,000/month',
      features: ['Villa', 'Private Garden', 'Parking']
    },
    {
      image: 'https://slnventures.com/wp-content/uploads/2023/12/triplex-villas-1.png',
      description: 'Cozy 1BHK apartment for bachelors/family',
      price: '₹15,000/month',
      features: ['1 BHK', 'Family Friendly', 'Cozy']
    }
  ];

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_tzYfBPKGbrzTPi',
      amount: '2500000',
      currency: 'INR',
      name: 'Premium Housing',
      description: 'House Rent Payment',
      handler: function(response) {
        setPaymentSuccess(true);
        setTimeout(() => setPaymentSuccess(false), 5000);
      },
      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999'
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === properties.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === 0 ? properties.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isAnimating]);

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 relative">
      {paymentSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
          <p className="font-medium">Payment Successful!</p>
          <p className="text-sm">Our team will connect with you shortly.</p>
        </div>
      )}

      <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-900">
        <div className="relative h-[500px] w-full overflow-hidden">
          {properties.map((property, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{
                transform: `translateX(${(index - currentSlide) * 100}%)`,
              }}
            >
              <img
                src={property.image}
                alt={`Property ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {property.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-white text-2xl font-bold">
                    {property.price}
                  </h3>
                  
                  <p className="text-gray-200 text-lg max-w-2xl">
                    {property.description}
                  </p>
                  
                  <button
                    onClick={handlePayment}
                    className="mt-4 bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold 
                             hover:bg-indigo-700 transform hover:-translate-y-1 transition-all duration-300
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-indigo-600 scale-125'
                  : 'bg-gray-300/50 hover:bg-gray-300/75'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;