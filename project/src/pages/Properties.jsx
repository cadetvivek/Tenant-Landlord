
import React, { useState, useEffect } from "react";
import { Building2, Users, IndianRupee, Plus, X, Trash } from "lucide-react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import ChatBot from "../components/ChateBot";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const [newProperty, setNewProperty] = useState({
    title: "",
    address: "",
    totalUnits: "",
    occupancy: "",
    revenue: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  // Existing fetch, delete, and form handling functions remain the same
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
      setProperties([]);
    }
  };

  const handleDelete = async (propertyId) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      const response = await axios.delete(`https://landlordbackend.onrender.com/deleteProperty/${propertyId}`);
      if (response.data && response.data.status) {
        setProperties(properties.filter((property) => property._id !== propertyId));
      } else {
        console.error("Failed to delete property:", response.data);
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newProperty.title || !newProperty.address || !image || !newProperty.revenue) {
      alert("Please enter all fields and upload an image.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", newProperty.title);
    formData.append("address", newProperty.address);
    formData.append("totalUnits", newProperty.totalUnits);
    formData.append("occupancy", newProperty.occupancy);
    formData.append("revenue", newProperty.revenue);

    try {
      const response = await axios.post("https://landlordbackend.onrender.com/addProperty", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data && response.data.status) {
        setShowModal(false);
        resetForm();
        fetchProperties();
      } else {
        console.error("Unexpected API response:", response.data);
      }
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewProperty({
      title: "",
      address: "",
      totalUnits: "",
      occupancy: "",
      revenue: "",
    });
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header remains the same */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Properties</h1>
          {user?.role === "LandLord" && (
            <button
              className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors duration-200"
              onClick={() => setShowModal(true)}
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Add Property</span>
              <span className="sm:hidden">Add</span>
            </button>
          )}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="relative">
                  <img
                    src={property.image_url || "https://via.placeholder.com/400"}
                    alt={property.title}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                  {user?.role === "LandLord" && (
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                      onClick={() => handleDelete(property._id)}
                    >
                      <Trash className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">{property.address}</p>

                  {/* Updated metrics section with better mobile responsiveness */}
                  <div className="mt-3 sm:mt-4 grid grid-cols-3 gap-1 sm:gap-4">
                    <div className="flex flex-col items-center p-1 sm:p-2 bg-gray-50 rounded-lg">
                      <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      <p className="text-[10px] sm:text-sm font-medium mt-1 break-words text-center">
                        {property.units} 
                        <span className="block text-[8px] sm:text-xs text-gray-500">Units</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-center p-1 sm:p-2 bg-gray-50 rounded-lg">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <p className="text-[10px] sm:text-sm font-medium mt-1 break-words text-center">
                        {property.occupancy}
                        <span className="block text-[8px] sm:text-xs text-gray-500">Occupancy</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-center p-1 sm:p-2 bg-gray-50 rounded-lg">
                      <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                      <p className="text-[10px] sm:text-sm font-medium mt-1 break-words text-center">
                        ₹{property.revenue}
                        <span className="block text-[8px] sm:text-xs text-gray-500">Revenue</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No properties available</p>
            </div>
          )}
        </div>

        {/* Modal Section - Updated form fields for better mobile handling */}
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end sm:items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowModal(false)}></div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg sm:text-xl font-medium text-gray-900">Add Property</h3>
                    <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-500">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="title"
                      placeholder="Property Name"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={newProperty.title}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={newProperty.address}
                      onChange={handleInputChange}
                    />
                    {/* Updated grid for better mobile responsiveness */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="number"
                        name="totalUnits"
                        placeholder="Units"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={newProperty.totalUnits}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="occupancy"
                        placeholder="Occupancy (%)"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={newProperty.occupancy}
                        onChange={handleInputChange}
                      />
                    </div>
                    <input
                      type="number"
                      name="revenue"
                      placeholder="Revenue (₹)"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={newProperty.revenue}
                      onChange={handleInputChange}
                    />

                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      {preview && (
                        <div className="mt-2">
                          <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      {loading ? "Saving..." : "Save Property"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ChatBot />
    </div>
  );
}

export default Properties;