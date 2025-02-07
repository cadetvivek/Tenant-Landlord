
// import React, { useState, useEffect } from "react";
// import { ref, push, onValue } from "firebase/database"; // Firebase RTDB functions
// import { rtdb } from "../firebase"; // Import RTDB config
// import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";

// function Schedule() {
//   const [appointments, setAppointments] = useState([]);
//   const [newAppointment, setNewAppointment] = useState({
//     title: "",
//     property: "",
//     unit: "",
//     date: "",
//     time: "",
//     type: "maintenance",
//     attendees: "",
//   });

//   // Fetch Appointments from Firebase Realtime Database
//   useEffect(() => {
//     const appointmentRef = ref(rtdb, "appointments");

//     onValue(appointmentRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const data = snapshot.val();
//         const fetchedAppointments = Object.keys(data).map((key) => ({
//           id: key,
//           ...data[key],
//         }));
//         setAppointments(fetchedAppointments);
//       } else {
//         setAppointments([]); // No appointments found
//       }
//     });
//   }, []);

//   // Handle Input Change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAppointment((prev) => ({ ...prev, [name]: value }));
//   };

//   // Add New Appointment to Firebase
//   const handleAddAppointment = async () => {
//     if (!newAppointment.title || !newAppointment.date || !newAppointment.time) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     try {
//       const appointmentRef = ref(rtdb, "appointments");
//       const appointmentData = {
//         ...newAppointment,
//         attendees: newAppointment.attendees.split(",").map((a) => a.trim()),
//       };

//       await push(appointmentRef, appointmentData); // Store in RTDB
//       console.log("Appointment added successfully!");

//       // Clear form after submission
//       setNewAppointment({
//         title: "",
//         property: "",
//         unit: "",
//         date: "",
//         time: "",
//         type: "maintenance",
//         attendees: "",
//       });
//     } catch (error) {
//       console.error("Error adding appointment: ", error);
//       alert("Failed to save appointment. Check console for details.");
//     }
//   };

//   // Get Event Color based on type
//   const getEventColor = (type) => {
//     switch (type) {
//       case "inspection":
//         return "bg-purple-100 text-purple-700 border-purple-200";
//       case "maintenance":
//         return "bg-blue-100 text-blue-700 border-blue-200";
//       case "meeting":
//         return "bg-green-100 text-green-700 border-green-200";
//       default:
//         return "bg-gray-100 text-gray-700 border-gray-200";
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
//           <p className="text-gray-600">Manage appointments and meetings</p>
//         </div>
//       </div>

//       {/* Appointment Form */}
//       <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Book a Maintenance Appointment</h2>
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="title"
//             placeholder="Appointment Title"
//             value={newAppointment.title}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="property"
//             placeholder="Property Name"
//             value={newAppointment.property}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="unit"
//             placeholder="Unit Number"
//             value={newAppointment.unit}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="date"
//             name="date"
//             value={newAppointment.date}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="time"
//             name="time"
//             value={newAppointment.time}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           />
//           <input
//             type="text"
//             name="attendees"
//             placeholder="Attendees (comma-separated)"
//             value={newAppointment.attendees}
//             onChange={handleInputChange}
//             className="p-2 border rounded"
//           />
//           <button
//             onClick={handleAddAppointment}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 col-span-2"
//           >
//             Add Appointment
//           </button>
//         </div>
//       </div>

//       {/* Upcoming Appointments */}
//       <div className="grid lg:grid-cols-7 gap-6">
//         {/* Calendar Placeholder */}
//         <div className="lg:col-span-5 bg-white rounded-xl shadow-sm p-6">
//           <div className="text-center">
//             <p className="text-gray-500">Calendar integration coming soon...</p>
//           </div>
//         </div>

//         {/* Appointments List */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h2>
//             <div className="space-y-4">
//               {appointments.length === 0 ? (
//                 <p className="text-gray-500">No upcoming appointments.</p>
//               ) : (
//                 appointments.map((appointment) => (
//                   <div
//                     key={appointment.id}
//                     className={`p-4 rounded-lg border ${getEventColor(appointment.type)}`}
//                   >
//                     <h3 className="font-medium">{appointment.title}</h3>
//                     <div className="mt-2 space-y-2 text-sm">
//                       <div className="flex items-center">
//                         <CalendarIcon className="w-4 h-4 mr-2" />
//                         <span>{appointment.date}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Clock className="w-4 h-4 mr-2" />
//                         <span>{appointment.time}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <MapPin className="w-4 h-4 mr-2" />
//                         <span>{appointment.property} - {appointment.unit}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <Users className="w-4 h-4 mr-2" />
//                         <span>{appointment.attendees?.join(", ")}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Schedule;



import React, { useState, useEffect } from "react";
import { ref, push, onValue } from "firebase/database"; // Firebase RTDB functions
import { rtdb } from "../firebase"; // Import RTDB config
import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { Calendar, momentLocalizer } from "react-big-calendar"; // React Big Calendar
import moment from "moment"; // For date handling
import "react-big-calendar/lib/css/react-big-calendar.css"; // Calendar styles

// Configure the localizer for React Big Calendar
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

  // Fetch Appointments from Firebase Realtime Database
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
        setAppointments([]); // No appointments found
      }
    });
  }, []);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({ ...prev, [name]: value }));
  };

  // Add New Appointment to Firebase
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

      await push(appointmentRef, appointmentData); // Store in RTDB
      console.log("Appointment added successfully!");

      // Clear form after submission
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

  // Get Event Color based on type
  const getEventColor = (type) => {
    switch (type) {
      case "inspection":
        return "#D1C4E9"; // Light purple
      case "maintenance":
        return "#BBDEFB"; // Light blue
      case "meeting":
        return "#C8E6C9"; // Light green
      default:
        return "#F5F5F5"; // Light gray
    }
  };

  // Format appointments for React Big Calendar
  const calendarEvents = appointments.map((appointment) => ({
    id: appointment.id,
    title: appointment.title,
    start: new Date(`${appointment.date}T${appointment.time}:00`),
    end: moment(`${appointment.date}T${appointment.time}:00`)
      .add(1, "hour")
      .toDate(), // Default duration of 1 hour
    type: appointment.type,
    style: {
      backgroundColor: getEventColor(appointment.type),
    },
  }));

  // Custom Event Component
  const EventComponent = ({ event }) => (
    <div className="p-2">
      <strong>{event.title}</strong>
      <div>{moment(event.start).format("h:mm A")}</div>
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <p className="text-gray-600">Manage appointments and meetings</p>
        </div>
      </div>

      {/* Appointment Form */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Book a Maintenance Appointment</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Appointment Title"
            value={newAppointment.title}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="property"
            placeholder="Property Name"
            value={newAppointment.property}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="unit"
            placeholder="Unit Number"
            value={newAppointment.unit}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="date"
            name="date"
            value={newAppointment.date}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="time"
            name="time"
            value={newAppointment.time}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="attendees"
            placeholder="Attendees (comma-separated)"
            value={newAppointment.attendees}
            onChange={handleInputChange}
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddAppointment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 col-span-2"
          >
            Add Appointment
          </button>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="grid lg:grid-cols-7 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-5 bg-white rounded-xl shadow-sm p-6">
          <Calendar
            localizer={localizer}
            events={calendarEvents}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            components={{
              event: EventComponent, // Custom event component
            }}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: getEventColor(event.type),
              },
            })}
          />
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h2>
            <div className="space-y-4">
              {appointments.length === 0 ? (
                <p className="text-gray-500">No upcoming appointments.</p>
              ) : (
                appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`p-4 rounded-lg border ${getEventColor(appointment.type)}`}
                  >
                    <h3 className="font-medium">{appointment.title}</h3>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{appointment.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{appointment.property} - {appointment.unit}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{appointment.attendees?.join(", ")}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;