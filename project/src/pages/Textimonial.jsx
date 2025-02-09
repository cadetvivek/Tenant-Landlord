import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, User, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Prakit zajam",
    date: "January 15, 2024",
    rating: 5,
    text: "This platform made submitting maintenance requests so easy! I reported a plumbing issue, and my landlord responded within minutes. Highly recommended,I love the real-time messaging feature! No more waiting days for email responses—my landlord and I communicate instantly",
    image: "https://avatars.githubusercontent.com/u/44423338?v=4" // Placeholder image
  },
  {
    id: 2,
    name: "Shubham kumar",
    date: "February 1, 2024",
    rating: 5,
    text: "The rent tracking system is a lifesaver! The reminders help me stay on top of payments, and I can see my history anytime.Managing multiple properties has never been this simple. I can track maintenance requests, payments, and messages in one place!",
    image: "https://avatars.githubusercontent.com/u/181267861?v=4&size=40" // Placeholder image
  },
  {
    id: 3,
    name: "vivek kushwah",
    date: "February 10, 2024",
    rating: 5,
    text: "This platform has improved my relationship with tenants. Transparent communication and instant updates make property management stress-free, I used to struggle with tracking maintenance requests, but now I get real-time updates and can resolve issues faster. Best decision ever!.",
    image: "https://avatars.githubusercontent.com/u/106858243?v=4" // Placeholder image
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayDuration = 2000; 

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayDuration);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 to-blue-800 py-20 px-4 relative overflow-hidden">
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 font-serif">
          🗣️ What Our Users Say About RentEasy
          </h2>
          <div className="w-20 h-1 bg-blue-400 mx-auto mb-4" />
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
          Transparent communication and instant updates make property management stress-free!
          </p>
        </div>

        <div className="relative group">
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
            <div className="p-10">
              {/* Decorative quote icon */}
              <Quote className="w-12 h-12 text-blue-100 absolute top-8 right-8" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${i < testimonials[currentIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              <blockquote className="relative">
                <p className="text-gray-800 text-xl leading-relaxed mb-8 font-medium px-8 before:content-['“'] before:absolute before:-left-4 before:-top-4 before:text-6xl before:text-blue-100 before:font-serif before:opacity-50">
                  {testimonials[currentIndex].text}
                </p>
              </blockquote>
              
              <div className="flex justify-between items-center border-t pt-8">
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <User 
                      className="w-full h-full p-4 text-blue-400 bg-blue-50 absolute top-0 left-0"
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {testimonials[currentIndex].date}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={prev}
                    className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-50"
                  >
                    <ChevronLeft className="w-6 h-6 text-blue-700" />
                  </button>
                  <button 
                    onClick={next}
                    className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-50"
                  >
                    <ChevronRight className="w-6 h-6 text-blue-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-8 scale-150' : 'bg-blue-200'
                }`}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
          >
            <span className="text-sm font-medium">
              {isAutoPlaying ? "PAUSE" : "PLAY"}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
              {isAutoPlaying ? (
                <div className="w-3 h-3 bg-current rounded-sm" />
              ) : (
                <div className="w-0 h-0 border-t-6 border-b-6 border-l-8 border-transparent border-l-current ml-1" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;