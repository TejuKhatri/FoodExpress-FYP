// src/pages/Settings.tsx
import { ArrowLeft, Lock, Bell, User, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 w-full">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow border-b">
        <div className="w-full px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <img src={logo} alt="Food Express" className="h-10 w-10" />

            <h1 className="text-xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="w-full px-6 py-6 space-y-6">

        {/* ACCOUNT SETTINGS */}
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="text-lg font-semibold mb-3">Account</h2>

          <button className="w-full border rounded-lg py-3 flex items-center gap-3 hover:bg-gray-100 px-3">
            <User className="h-5 w-5 text-yellow-600" />
            Edit Profile Info
          </button>

          <button className="w-full border rounded-lg py-3 flex items-center gap-3 hover:bg-gray-100 px-3">
            <Lock className="h-5 w-5 text-yellow-600" />
            Change Password
          </button>
        </div>

        {/* APP SETTINGS */}
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="text-lg font-semibold mb-3">App Settings</h2>

          <button className="w-full border rounded-lg py-3 flex items-center gap-3 hover:bg-gray-100 px-3">
            <Bell className="h-5 w-5 text-yellow-600" />
            Notifications
          </button>

          <button className="w-full border rounded-lg py-3 flex items-center gap-3 hover:bg-gray-100 px-3">
            <Globe className="h-5 w-5 text-yellow-600" />
            Language
          </button>
        </div>
      </main>
    </div>
  );
}
