import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminProfile from "./components/AdminDashboard/AdminProfile";
import AdminSettings from "./components/AdminDashboard/Settings"; 
import NotificationsPage from "./components/NotificationsPage";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />

        {/* PROFILE */}
        <Route path="/admin/profile" element={<AdminProfile />} />

        {/* SETTINGS */}
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/notifications" element={<NotificationsPage />} />

      </Routes>
    </BrowserRouter>
  );
}
