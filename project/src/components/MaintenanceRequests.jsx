import React, { useState, useEffect } from "react";
import { Clock, AlertTriangle, CheckCircle, PlusCircle } from "lucide-react";
import { database } from "./firebase";
import { ref, push, onValue } from "firebase/database";

function MaintenanceRequests() {
  const [requests, setRequests] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    property: "",
    description: "",
    status: "in-progress",
  });

  // Fetch maintenance requests from Realtime Database on component mount
  useEffect(() => {
    const requestsRef = ref(database, "maintenanceRequests");

    // Listen for changes in the database
    onValue(requestsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedRequests = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setRequests(fetchedRequests);
      } else {
        setRequests([]);
      }
    });
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new request object
    const newEntry = {
      title: newRequest.title,
      property: newRequest.property,
      status: newRequest.status,
      date: new Date().toLocaleString(),
      description: newRequest.description,
    };

    try {
      // Add the new request to the Realtime Database
      const requestsRef = ref(database, "maintenanceRequests");
      await push(requestsRef, newEntry);

      // Reset form and hide it
      setFormVisible(false);
      setNewRequest({ title: "", property: "", description: "", status: "in-progress" });
    } catch (error) {
      console.error("Error adding request: ", error);
    }
  };

  // Get status color based on request status
  const getStatusColor = (status) => {
    switch (status) {
      case "urgent":
        return "bg-red-100 text-red-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get status icon based on request status
  const getStatusIcon = (status) => {
    switch (status) {
      case "urgent":
        return AlertTriangle;
      case "in-progress":
        return Clock;
      case "completed":
        return CheckCircle;
      default:
        return Clock;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Maintenance Requests</h2>
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <PlusCircle className="w-4 h-4 mr-1" /> New Request
        </button>
      </div>

      {/* Form Section */}
      {formVisible && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-medium text-gray-900 mb-2">Create New Request</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={newRequest.title}
              onChange={handleChange}
              placeholder="Issue Title"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="text"
              name="property"
              value={newRequest.property}
              onChange={handleChange}
              placeholder="Property Address"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              name="description"
              value={newRequest.description}
              onChange={handleChange}
              placeholder="Describe the issue..."
              required
              className="w-full border px-3 py-2 rounded"
            />
            <select
              name="status"
              value={newRequest.status}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="urgent">Urgent</option>
            </select>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Request
            </button>
          </form>
        </div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {requests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          return (
            <div
              key={request.id}
              className="border rounded-lg p-4 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{request.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{request.property}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    request.status
                  )}`}
                >
                  <StatusIcon className="w-4 h-4 inline-block mr-1" />
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{request.description}</p>
              <div className="mt-3 text-xs text-gray-500">{request.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MaintenanceRequests;