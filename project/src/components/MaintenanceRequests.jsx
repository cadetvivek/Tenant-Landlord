import React, { useState, useEffect } from "react";
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { database, storage } from "./firebase";
import { ref, push, onValue, remove } from "firebase/database";

function MaintenanceRequests() {
  const [requests, setRequests] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [newRequest, setNewRequest] = useState({
    title: "",
    property: "",
    description: "",
    status: "in-progress",
  });

  useEffect(() => {
    const requestsRef = ref(database, "maintenanceRequests");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      title: newRequest.title,
      property: newRequest.property,
      status: newRequest.status,
      date: new Date().toLocaleString(),
      description: newRequest.description,
    };
    try {
      const requestsRef = ref(database, "maintenanceRequests");
      await push(requestsRef, newEntry);
      setFormVisible(false);
      setNewRequest({
        title: "",
        property: "",
        description: "",
        status: "in-progress",
      });
    } catch (error) {
      console.error("Error adding request: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const requestRef = ref(database, `maintenanceRequests/${id}`);
      await remove(requestRef);
      setRequests((prevRequests) =>
        prevRequests.filter((req) => req.id !== id)
      );
    } catch (error) {
      console.error("Error deleting request: ", error);
    }
  };

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
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">
          Maintenance Requests
        </h2>
        <button
          onClick={() => setFormVisible(!formVisible)}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <PlusCircle className="w-4 h-4 mr-1" /> New Request
        </button>
      </div>
      {formVisible && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg shadow">
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
      <div className="space-y-4">
        {requests.map((request) => {
          const StatusIcon = getStatusIcon(request.status);
          return (
            <div
              key={request.id}
              className="border rounded-lg p-4 hover:border-blue-200 bg-blue-50 transition-colors flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-gray-900">{request.title}</h3>
                <p className="text-sm text-gray-500">{request.property}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {request.description}
                </p>
                <div className="mt-3 text-xs text-gray-500">{request.date}</div>
              </div>
              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    request.status
                  )}`}
                >
                  <StatusIcon className="w-4 h-4 inline-block mr-1" />
                  {request.status.charAt(0).toUpperCase() +
                    request.status.slice(1)}
                </span>
                <button
                  onClick={() => handleDelete(request.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default MaintenanceRequests;
