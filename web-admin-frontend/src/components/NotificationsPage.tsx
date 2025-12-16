import React from "react";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, message: "New order received from Pizza Palace." },
    { id: 2, message: "Sushi House menu updated." },
    { id: 3, message: "New customer signed up." },
  ];

  return (
    <div className="fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg z-50 flex flex-col">
      {/* Header */}
      <div className="bg-orange-500 text-black p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Notifications</h1>
        <button
          onClick={() => window.history.back()}
          className="text-black font-bold px-2 py-1 rounded hover:bg-orange-600"
        >
          Close
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-sm">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 bg-white border-l-4 border-orange-500 rounded shadow-sm hover:bg-orange-50"
            >
              {n.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
