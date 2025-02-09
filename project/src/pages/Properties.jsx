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

  console.log(user.role);

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
      setPreview(URL.createObjectURL(file)); // Show preview before uploading
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
        setShowModal(false); // Close modal after successful submission
        resetForm();
        fetchProperties(); // Update properties list
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
      {user?.role === "LandLord" && (
        <button
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </button>
      )}

      {/* Properties Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div key={property._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 relative">
              <img
                src={property.image_url || "https://via.placeholder.com/400"}
                alt={property.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{property.address}</p>

                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Building2 className="w-5 h-5 text-blue-600 mx-auto" />
                    <p className="text-sm font-medium">{property.totalUnits} Units</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-5 h-5 text-green-600 mx-auto" />
                    <p className="text-sm font-medium">{property.occupancy}%</p>
                  </div>
                  <div className="text-center">
                    <IndianRupee className="w-5 h-5 text-yellow-600 mx-auto" />
                    <p className="text-sm font-medium">₹{property.revenue}</p>
                  </div>
                </div>

                {user?.role === "LandLord" && (
                  <button
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    onClick={() => handleDelete(property._id)}
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No properties available</p>
        )}
      </div>

      {/* Add Property Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">Add Property</h2>
              <X className="w-6 h-6 cursor-pointer" onClick={() => setShowModal(false)} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" placeholder="Property Name" className="w-full p-3 border rounded" value={newProperty.title} onChange={handleInputChange} />
              <input type="text" name="address" placeholder="Address" className="w-full p-3 border rounded" value={newProperty.address} onChange={handleInputChange} />
              <input type="number" name="totalUnits" placeholder="Units" className="w-full p-3 border rounded" value={newProperty.totalUnits} onChange={handleInputChange} />
              <input type="text" name="occupancy" placeholder="Occupancy (%)" className="w-full p-3 border rounded" value={newProperty.occupancy} onChange={handleInputChange} />
              <input type="number" name="revenue" placeholder="Revenue (₹)" className="w-full p-3 border rounded" value={newProperty.revenue} onChange={handleInputChange} />

              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
              {preview && <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border" />}

              <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700" disabled={loading}>{loading ? "Saving..." : "Save Property"}</button>
            </form>
          </div>

        </div>
      )}
       <ChatBot/>
    </div>
   
  );
}

export default Properties;