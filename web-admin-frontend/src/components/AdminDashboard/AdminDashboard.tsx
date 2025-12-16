import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("restaurants");

  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);
  const handleNotificationClick = () => {
  navigate("/admin/notifications");
};


  // Dropdown handlers
  const handleProfileClick = () => {
    navigate("/admin/profile");
    setShowProfileMenu(false);
  };

  const handleSettingsClick = () => {
    navigate("/admin/settings");
    setShowProfileMenu(false);
  };

  const handleSignOutClick = () => {
    navigate("/auth"); // or your login page
    setShowProfileMenu(false);
  };

  const dailySales = [
    { day: "Mon", sales: 12000 },
    { day: "Tue", sales: 18000 },
    { day: "Wed", sales: 15000 },
    { day: "Thu", sales: 26000 },
    { day: "Fri", sales: 30000 },
    { day: "Sat", sales: 35000 },
    { day: "Sun", sales: 31000 },
  ];

  const categoryData = [
    { name: "Pizza", value: 400 },
    { name: "Burgers", value: 300 },
    { name: "Sushi", value: 200 },
    { name: "Chinese", value: 150 },
    { name: "Desserts", value: 100 },
    { name: "Drinks", value: 80 },
  ];

  const COLORS = ["#ff6a3d", "#ff9f1c", "#2ec4b6", "#1e90ff", "#e0e0e0", "#a855f7"];

  const topRestaurants = [
    { id: 1, name: "Pizza Palace", orders: 342, revenue: "NPR 285K" },
    { id: 2, name: "Sushi House", orders: 298, revenue: "NPR 248K" },
    { id: 3, name: "Burger King", orders: 276, revenue: "NPR 215K" },
    { id: 4, name: "China Express", orders: 245, revenue: "NPR 198K" },
  ];

  const pendingRestaurants = [
    { name: "Pizza Palace", owner: "John Doe", email: "pizza@example.com" },
    { name: "Sushi House", owner: "Jane Smith", email: "sushi@example.com" },
    { name: "Burger King", owner: "Alex Brown", email: "burger@example.com" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {/* Header */}
      <header className="bg-white text-black flex justify-between items-center p-4 shadow-md sticky top-0 z-50 w-full">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded" />
          <span className="font-bold text-xl">Admin Dashboard</span>
        </div>

        <div className="flex items-center gap-6">
          {/* Notification */}
          <div className="relative">
            <button onClick={handleNotificationClick} className="relative">
  <Bell size={24} />
  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
</button>

          </div>

          {/* Admin Profile */}
          <div className="relative">
            <button onClick={toggleProfileMenu} className="flex items-center gap-2">
              <User size={24} className="rounded-full bg-white text-orange-500 p-1" />
              <span className="font-semibold">Admin</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
                <p
                  onClick={handleProfileClick}
                  className="p-2 border-b cursor-pointer hover:bg-gray-100"
                >
                  Profile
                </p>
                <p
                  onClick={handleSettingsClick}
                  className="p-2 border-b cursor-pointer hover:bg-gray-100"
                >
                  Settings
                </p>
                <p
                  onClick={handleSignOutClick}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                >
                  Sign Out
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="p-6 w-full max-w-full">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8 w-full">
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm">Today's Sales</p>
            <h2 className="text-2xl font-bold">NPR 35,200</h2>
            <p className="text-green-600 text-sm">+8.2%</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm">Total Orders Today</p>
            <h2 className="text-2xl font-bold">127</h2>
            <p className="text-green-600 text-sm">+12.5%</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm">Conversion Rate</p>
            <h2 className="text-2xl font-bold">68.3%</h2>
            <p className="text-green-600 text-sm">+5.1%</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <p className="text-gray-500 text-sm">Avg. Prep Time</p>
            <h2 className="text-2xl font-bold">18 min</h2>
            <p className="text-green-600 text-sm">-2.3 min</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6 mb-6 w-full">
          {/* Bar Chart */}
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-2">Daily Sales This Week</h2>
            <p className="text-gray-500 text-sm mb-4">
              Sales performance by day (NPR)
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailySales}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#ff6a3d" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="p-6 bg-white rounded-xl shadow-sm border">
            <h2 className="text-xl font-bold mb-2">Sales by Category</h2>
            <p className="text-gray-500 text-sm mb-4">
              Distribution of orders by food category
            </p>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap mt-4 gap-4">
              {categoryData.map((item, i) => (
                <span key={i} className="flex items-center gap-1">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  ></span>
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Restaurants */}
        <div className="p-6 bg-white rounded-xl shadow-sm border mb-6 w-full">
          <h2 className="text-2xl font-bold mb-1">Top Performing Restaurants</h2>
          <p className="text-gray-500 text-sm mb-4">
            Best performing restaurants this month
          </p>
          {topRestaurants.map((r) => (
            <div
              key={r.id}
              className="flex justify-between items-center p-4 border-b last:border-none"
            >
              <div>
                <h3 className="font-semibold">
                  {r.id}. {r.name}
                </h3>
                <p className="text-gray-500 text-sm">{r.orders} orders</p>
              </div>
              <p className="font-bold text-lg">{r.revenue}</p>
            </div>
          ))}
        </div>

        {/* Tabs: Restaurants / Orders / Customers */}
        <div className="bg-white rounded-xl shadow-sm border p-6 w-full">
          <div className="flex gap-4 mb-4 border-b">
            {["restaurants", "orders", "customers"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-t-md font-semibold ${
                  activeTab === tab
                    ? "bg-orange-500 text-white"
                    : "text-gray-500"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "restaurants" && (
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Pending Restaurant Approvals
              </h3>
              {pendingRestaurants.map((r, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 border-b last:border-none"
                >
                  <div>
                    <h4 className="font-semibold">{r.name}</h4>
                    <p className="text-gray-500 text-sm">Owner: {r.owner}</p>
                    <p className="text-gray-500 text-sm">{r.email}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-1 border rounded-md">Reject</button>
                    <button className="px-4 py-1 bg-green-600 text-white rounded-md">
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <p>Orders table or details go here...</p>
            </div>
          )}

          {activeTab === "customers" && (
            <div>
              <p>Customers table or details go here...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
