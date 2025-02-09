import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Maintenance from "./components/MaintenanceRequests";
import Messages from "./pages/Messages";
import Payments from "./pages/Payments";
import Schedule from "./pages/Schedule";
import Signup from "./pages/Signup";
import DashboardStats from "./components/DashboardStats"

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  
  
  return (

    <AuthProvider>
      <Router>
        <Routes>
       
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
               
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="messages" element={<Messages />} />
            <Route path="payments" element={<Payments />} />
            <Route path="schedule" element={<Schedule />} />
            
          
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


