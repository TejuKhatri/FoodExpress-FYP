import React, { type JSX } from "react";

import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }: { children: JSX.Element }) {
    const raw = localStorage.getItem("adminUser");

    if (!raw) return <Navigate to="/login" replace />;

    try {
        const user = JSON.parse(raw);

        if (user?.role !== "admin") {
            localStorage.removeItem("adminUser");
            return <Navigate to="/login" replace />;
        }

        return children;
    } catch {
        localStorage.removeItem("adminUser");
        return <Navigate to="/login" replace />;
    }
}
