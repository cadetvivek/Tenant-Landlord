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
    <footer className="bg-gray-900 text-gray-300 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 pb-8 border-b border-gray-800">
          <div className="flex items-center space-x-2 mb-6">
            <MapPin className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">
              Top Cities in India
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topCities.map((city, index) => (
              <a
                key={index}
                href="#"
                className="text-sm hover:text-blue-400 transition duration-300 flex items-center space-x-1"
              >
                <span>{city}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold text-white">RentEase</span>
            </div>
            <p className="text-sm">
              Making property management simple and efficient for both tenants
              and landlords.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Properties", "Services", "About Us"].map(
                (link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition duration-300"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Home className="h-5 w-5 text-blue-500" />
                <span>123 Property Street, Real Estate City</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-500" />
                <span>contact@rentease.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:text-blue-400 transition duration-300"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm">
              © {new Date().getFullYear()} RentEase. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (policy, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="hover:text-blue-400 transition duration-300"
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
