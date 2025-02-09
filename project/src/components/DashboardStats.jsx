import React, {useState} from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function DashboardStats(){
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const properties = [
    {
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Spacious 3BHK with modern amenities in prime location',
      price: '₹25,000/month'
    },
    {
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
      description: 'Luxurious 2BHK apartment with clubhouse access',
      price: '₹35,000/month'
    },
    {
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/11/DQ/SO/JD/7572244/property-dealer-services-1000x1000.jpg',
      description: 'Fully furnished studio apartment near metro station',
      price: '₹18,000/month'
    },
    {
      image: 'https://5.imimg.com/data5/ANDROID/Default/2022/10/DR/IO/ZZ/8881551/product-jpeg.jpg',
      description: 'Premium villa with private garden and parking',
      price: '₹55,000/month'
    },
    {
      image: 'https://static.vecteezy.com/system/resources/thumbnails/021/928/204/small_2x/sold-home-for-sale-real-estate-sign-in-front-of-house-generative-ai-photo.jpg',
      description: 'Cozy 1BHK apartment for bachelors/family',
      price: '₹15,000/month'
    }
  ];

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_tzYfBPKGbrzTPi',
      amount: '2500000', // Amount in paise (₹25,000)
      currency: 'INR',
      name: 'Premium Housing',
      description: 'House Rent Payment',
      handler: function(response) {
        setPaymentSuccess(true);
     

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-4 relative">
      {paymentSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Thanks for your payment! Our team will connect with you shortly.
        </div>
      )}

      <Slider {...settings}>
        {properties.map((property, index) => (
          <div key={index} className="relative">
            <img 
              src={property.image} 
              alt={`Property ${index + 1}`} 
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
              <p className="text-white text-lg font-semibold mb-2">{property.price}</p>
              <p className="text-gray-200 text-sm mb-4">{property.description}</p>
              <button
                onClick={handlePayment}
                className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DashboardStats

