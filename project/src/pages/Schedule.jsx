


import React, { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database";
import { rtdb } from "../firebase";
import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ChatBot from "../components/ChateBot";

const localizer = momentLocalizer(moment);

function Schedule() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    property: "",
    unit: "",
    date: "",
    time: "",
    type: "maintenance",
    attendees: "",
  });

  useEffect(() => {
    const appointmentRef = ref(rtdb, "appointments");

    onValue(appointmentRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fetchedAppointments = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setAppointments(fetchedAppointments);
      } else {
        setAppointments([]);
      }
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAppointment = async () => {
    if (!newAppointment.title || !newAppointment.date || !newAppointment.time) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const appointmentRef = ref(rtdb, "appointments");
      const appointmentData = {
        ...newAppointment,
        attendees: newAppointment.attendees.split(",").map((a) => a.trim()),
      };

      await push(appointmentRef, appointmentData);
      console.log("Appointment added successfully!");
      
      setNewAppointment({
        title: "",
        property: "",
        unit: "",
        date: "",
        time: "",
        type: "maintenance",
        attendees: "",
      });
    } catch (error) {
      console.error("Error adding appointment: ", error);
      alert("Failed to save appointment. Check console for details.");
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case "inspection": return "bg-purple-200";
      case "maintenance": return "bg-blue-200";
      case "meeting": return "bg-green-200";
      default: return "bg-gray-200";
    }
  };

  const calendarEvents = appointments.map((appointment) => ({
    id: appointment.id,
    title: appointment.title,
    start: new Date(`${appointment.date}T${appointment.time}:00`),
    end: moment(`${appointment.date}T${appointment.time}:00`).add(1, "hour").toDate(),
    type: appointment.type,
  }));

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-2xl font-bold text-gray-900">Schedule For Maintenance</h1>
        <p className="text-gray-600">Manage appointments or meetings</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Book a Maintenance Appointment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(newAppointment).map((key) => (
            key !== "type" && (
              <input
                key={key}
                type={key === "date" ? "date" : key === "time" ? "time" : "text"}
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={newAppointment[key]}
                onChange={handleInputChange}
                className="p-2 border rounded w-full"
              />
            )
          ))}
          <button
            onClick={handleAddAppointment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full md:col-span-2"
          >
            Add Appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 md:p-6">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            eventPropGetter={(event) => ({
              className: getEventColor(event.type),
            })}
          />
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
            {appointments.length === 0 ? (
              <p className="text-gray-500">No upcoming appointments.</p>
            ) : (
              appointments.map((appointment) => (
                <div key={appointment.id} className={`p-4 rounded-lg border ${getEventColor(appointment.type)}`}>
                  <h3 className="font-medium">{appointment.title}</h3>
                  <div className="mt-2 space-y-2 text-sm">
                    <div className="flex items-center"><CalendarIcon className="w-4 h-4 mr-2" />{appointment.date}</div>
                    <div className="flex items-center"><Clock className="w-4 h-4 mr-2" />{appointment.time}</div>
                    <div className="flex items-center"><MapPin className="w-4 h-4 mr-2" />{appointment.property} - {appointment.unit}</div>
                    <div className="flex items-center"><Users className="w-4 h-4 mr-2" />{appointment.attendees?.join(", ")}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
}

export default Schedule;