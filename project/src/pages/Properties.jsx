import React, { useState, useEffect } from "react";
import { Building2, Users, DollarSign, Plus, X } from "lucide-react";
import axios from "axios";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({ totalProperties: 0, totalUnits: 0, averageOccupancy: "0%" });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

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
      setProperties([]);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get("https://landlordbackend.onrender.com/getstats");
      if (response.data && response.data.status) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching property stats:", error);
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

    if (!newProperty.title || !newProperty.address || !image) {
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
        fetchProperties(); // Update properties
        fetchStats(); // Update stats
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
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600">Manage your property portfolio</p>
        </div>
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </button>
      </div>

      {/* Property Statistics */}
      <div className="grid grid-cols-3 gap-6 p-4 bg-gray-100 rounded-lg shadow-md mb-6">
        <div className="text-center">
          <Building2 className="w-6 h-6 text-blue-600 mx-auto" />
          <p className="text-lg font-semibold">{stats.totalProperties}</p>
          <p className="text-gray-600">Total Properties</p>
        </div>
        <div className="text-center">
          <Users className="w-6 h-6 text-green-600 mx-auto" />
          <p className="text-lg font-semibold">{stats.totalUnits}</p>
          <p className="text-gray-600">Total Units</p>
        </div>
        <div className="text-center">
          <DollarSign className="w-6 h-6 text-yellow-600 mx-auto" />
          <p className="text-lg font-semibold">{stats.averageOccupancy}</p>
          <p className="text-gray-600">Avg. Occupancy</p>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {properties.length > 0 ? (
    properties.map((property) => (
      <div key={property._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4">
        <img
          src={property.image_url || "https://via.placeholder.com/400"}
          alt={property.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{property.address}</p>

          {/* Property Stats Inside Each Card */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="text-center">
              <Building2 className="w-5 h-5 text-blue-600 mx-auto" />
              <p className="text-sm font-medium">{stats.totalProperties} Properties</p>
            </div>
            <div className="text-center">
              <Users className="w-5 h-5 text-green-600 mx-auto" />
              <p className="text-sm font-medium">{stats.totalUnits} Units</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-5 h-5 text-yellow-600 mx-auto" />
              <p className="text-sm font-medium">{stats.averageOccupancy} Avg. Occupancy</p>
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No properties available</p>
  )}
</div>
    </div>
  );
}

export default Properties;
