// src/pages/Profile.tsx
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  LogOut,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import logo from "../../assets/logo.png";

const Profile = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    toast.success("Signed out successfully");
    navigate("/auth");
  };

  const user = {
    name: "Food Express ",
    email: "food.express@example.com",
    phone: "+977 9812345678",
    address: "Pokhara, Nepal",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white shadow border-b">
        <div className="w-full px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/customer")}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <img
              src={logo}
              alt="Food Express"
              className="h-10 w-10 object-contain"
            />

            <h1 className="text-xl font-bold">Profile</h1>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="w-full px-6 py-6 space-y-6">

        {/* PROFILE HEADER */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-yellow-500 to-red-500 flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0)}
            </div>

            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">Customer</p>
            </div>
          </div>

          <button className="w-full border rounded-lg py-2 font-medium hover:bg-gray-100 flex items-center justify-center gap-2">
            <Settings className="h-4 w-4" />
            Edit Profile
          </button>
        </div>

        {/* ACCOUNT DETAILS */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h3 className="text-lg font-semibold mb-4">Account Details</h3>

          {/* EMAIL */}
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
            <Mail className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
          </div>

          {/* PHONE */}
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
            <Phone className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="text-sm font-medium">{user.phone}</p>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
            <MapPin className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-xs text-gray-500">Address</p>
              <p className="text-sm font-medium">{user.address}</p>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

          <button className="w-full border rounded-lg py-2 flex items-center gap-3 hover:bg-gray-100">
            <CreditCard className="h-5 w-5 text-yellow-600" />
            Order History
          </button>

          <button className="w-full border rounded-lg py-2 flex items-center gap-3 hover:bg-gray-100">
            <MapPin className="h-5 w-5 text-yellow-600" />
            Saved Addresses
          </button>

          <button className="w-full border rounded-lg py-2 flex items-center gap-3 hover:bg-gray-100">
            <Settings className="h-5 w-5 text-yellow-600" />
            Settings
          </button>
        </div>

        {/* SIGN OUT */}
        <div className="bg-white rounded-xl shadow p-6">
          <button
            onClick={handleSignOut}
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>

      </main>
    </div>
  );
};

export default Profile;
