import {
    Home,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Instagram,
    Linkedin as LinkedIn,
    Building2,
    MapPin,
  } from "lucide-react";
  import logo from "../assets/logo.png"
  
  const Footer = () => {
    const topCities = [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Kolkata",
      "Pune",
      "Ahmedabad",
      "Jaipur",
      "Surat",
      "Lucknow",
      "Kanpur",
      "Nagpur",
      "Indore",
      "Thane",
      "Bhopal",
      "Visakhapatnam",
      "Patna",
      "Vadodara",
      "Ghaziabad",
    ];
  
    return (
      <footer className="bg-gray-900 text-gray-300 w-full mt-auto border-t-8 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12 pb-8 border-b border-gray-800">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="h-5 w-5 text-blue-500 animate-bounce" />
              <h3 className="text-lg font-semibold text-white bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Top Cities in India
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {topCities.map((city, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm hover:text-blue-400 transition-all duration-300 transform hover:translate-x-2 flex items-center group"
                >
                  <span className="group-hover:underline decoration-blue-500">
                    {city}
                  </span>
                </a>
              ))}
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo Section with Animation */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 group">
              <img src={logo} alt="RentEasy Logo" className="h-8 w-8 animate-spin-slow" />
                {/* <Building2 className="h-8 w-8 text-blue-500 animate-spin-slow" /> */}
                <span className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  RentEasy
                </span>
              </div>
              <p className="text-sm opacity-90 hover:opacity-100 transition-opacity duration-300">
                Making property management simple and efficient for both tenants
                and landlords.
              </p>
            </div>
  
            {/* Quick Links with Hover Effects */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {["Home", "Properties", "Services", "About Us"].map(
                  (link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="hover:text-blue-400 transition-all duration-300 transform hover:translate-x-2 flex items-center group"
                      >
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
  
            {/* Contact Section with Icons Animation */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 group">
                  <Home className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="hover:text-blue-400 transition-colors duration-300">
                    123 Property Street, Real Estate City
                  </span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <Phone className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="hover:text-blue-400 transition-colors duration-300">
                    +1 (555) 123-4567
                  </span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <Mail className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="hover:text-blue-400 transition-colors duration-300">
                    contact@rentease.com
                  </span>
                </li>
              </ul>
            </div>
  
            {/* Social Media with Hover Scaling */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="hover:text-blue-400 transition-all duration-300 transform hover:scale-125"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
  
        {/* Bottom Section with Legal Links */}
        <div className="border-t border-gray-800 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="text-sm hover:text-blue-400 transition-colors duration-300">
                © {new Date().getFullYear()} RentEasy. All rights reserved.
              </div>
              <div className="mt-4 md:mt-0">
                <ul className="flex flex-wrap gap-4 text-sm">
                  {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                    (policy, index) => (
                      <li key={index}>
                        <a
                          href="#"
                          className="hover:text-blue-400 transition-colors duration-300 hover:underline"
                        >
                          {policy}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;