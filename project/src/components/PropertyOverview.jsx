// import React, { useState, useEffect } from "react";

// import { Building2, Users, DollarSign } from "lucide-react";
// import axios from "axios";

// function PropertyOverview() {
//   const [properties, setProperties] = useState([]);
//   const [stats, setStats] = useState({
//     totalProperties: 0,
//     totalUnits: 0,
//     averageOccupancy: "0%",
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchProperties();
//     fetchStats();
//   }, []);

//   const fetchProperties = async () => {
//     try {
//       const response = await axios.get("https://landlordbackend.onrender.com/getProperties");
//       if (response.data && Array.isArray(response.data.data)) {
//         setProperties(response.data.data);
//       } else {
//         setProperties([]);
//       }
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//       setError("Failed to load properties.");
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const response = await axios.get("https://landlordbackend.onrender.com/getstats");
//       if (response.data && response.data.status) {
//         setStats(response.data.data);
//       } else {
//         setError("Failed to load statistics.");
//       }
//     } catch (error) {
//       console.error("Error fetching property stats:", error);
//       setError("Error fetching data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-bold text-gray-900">Property Overview</h2>
//         {/* <button className="text-sm font-medium text-blue-600 hover:text-blue-700"> 
//           Add Property
//         </button> */}
//       </div>

//       {loading ? (
//         <p className="text-gray-500">Loading...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <>
//           {/* Property List */}
//           <div className="space-y-6">
//             {properties.length > 0 ? (
//               properties.map((property) => (
//                 <div
//                   key={property._id}
//                   className="border rounded-lg p-4 hover:border-blue-200 transition-colors"
//                 >
//                   <div className="flex space-x-4">
//                     <img
//                       src={property.image_url || "https://via.placeholder.com/400"}
//                       alt={property.title}
//                       className="w-20 h-20 rounded-lg object-cover"
//                     />
//                     <div className="flex-1">
//                       <h3 className="font-medium text-gray-900">{property.title}</h3>
//                       <div className="mt-2 grid grid-cols-3 gap-4">
//                         <div className="flex items-center text-sm text-gray-500">
//                           <Building2 className="w-4 h-4 mr-1" />
//                           {property.units} units
//                         </div>
//                         <div className="flex items-center text-sm text-gray-500">
//                           <Users className="w-4 h-4 mr-1" />
//                           {property.occupancy}%
//                         </div>
//                         <div className="flex items-center text-sm text-gray-500">
//                           <DollarSign className="w-4 h-4 mr-1" />
//                           ₹{property.revenue}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No properties available</p>
//             )}
//           </div>

//           {/* Property Statistics */}
//           <div className="mt-6 pt-6 border-t">
//             <div className="flex justify-between items-center text-sm">
//               <span className="text-gray-500">Total Properties</span>
//               <span className="font-medium text-gray-900">{stats.totalProperties} properties</span>
//             </div>
//             <div className="flex justify-between items-center text-sm mt-2">
//               <span className="text-gray-500">Total Units</span>
//               <span className="font-medium text-gray-900">{stats.totalUnits} units</span>
//             </div>
//             <div className="flex justify-between items-center text-sm mt-2">
//               <span className="text-gray-500">Average Occupancy</span>
//               <span className="font-medium text-gray-900">{stats.averageOccupancy}</span>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default PropertyOverview;


import React, { useState, useEffect } from "react";
import { Building2, Users, DollarSign } from "lucide-react";
import axios from "axios";

function PropertyOverview() {
  // ... existing state and effect hooks remain the same ...
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUnits: 0,
    averageOccupancy: "0%",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProperties();
    fetchStats();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("https://landlordbackend.onrender.com/getProperties");
      if (response.data && Array.isArray(response.data.data)) {
        setProperties(response.data.data);
      } else {
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError("Failed to load properties.");
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get("https://landlordbackend.onrender.com/getstats");
      if (response.data && response.data.status) {
        setStats(response.data.data);
      } else {
        setError("Failed to load statistics.");
      }
    } catch (error) {
      console.error("Error fetching property stats:", error);
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h2 className="text-base md:text-lg font-bold text-gray-900">Property Overview</h2>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm md:text-base">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-sm md:text-base">{error}</p>
      ) : (
        <>
          {/* Property List */}
          <div className="space-y-4 md:space-y-6">
            {properties.length > 0 ? (
              properties.map((property) => (
                <div
                  key={property._id}
                  className="border rounded-lg p-3 md:p-4 hover:border-blue-200 transition-colors"
                >
                  <div className="flex space-x-3 md:space-x-4">
                    <img
                      src={property.image_url || "https://via.placeholder.com/400"}
                      alt={property.title}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">
                        {property.title}
                      </h3>
                      <div className="mt-2 grid grid-cols-3 gap-2 md:gap-4">
                        <div className="flex items-center text-xs md:text-sm text-gray-500">
                          <Building2 className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{property.units} units</span>
                        </div>
                        <div className="flex items-center text-xs md:text-sm text-gray-500">
                          <Users className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{property.occupancy}%</span>
                        </div>
                        <div className="flex items-center text-xs md:text-sm text-gray-500">
                          <DollarSign className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">₹{property.revenue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm md:text-base">No properties available</p>
            )}
          </div>

          {/* Property Statistics */}
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t">
            <div className="flex justify-between items-center text-xs md:text-sm">
              <span className="text-gray-500">Total Properties</span>
              <span className="font-medium text-gray-900">{stats.totalProperties} properties</span>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm mt-2">
              <span className="text-gray-500">Total Units</span>
              <span className="font-medium text-gray-900">{stats.totalUnits} units</span>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm mt-2">
              <span className="text-gray-500">Average Occupancy</span>
              <span className="font-medium text-gray-900">{stats.averageOccupancy}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PropertyOverview;