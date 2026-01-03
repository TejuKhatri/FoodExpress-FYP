import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://192.168.1.70:8000/api/login/";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            alert("Enter username and password");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(
                API_URL,
                { username, password },
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 15000, // ✅ avoids hanging forever
                }
            );

            const data = res.data;

            // ✅ allow ONLY admin
            if (data?.role !== "admin") {
                alert("Access denied. Admins only.");
                return;
            }

            localStorage.setItem("adminUser", JSON.stringify(data));
            navigate("/admin", { replace: true });
        } catch (err: any) {
            // ✅ Better error messages for debugging
            if (err?.response) {
                // Server responded (400/401/403/500)
                alert(
                    err.response.data?.error ||
                    `Server error: ${err.response.status}`
                );
            } else if (err?.request) {
                // No response (CORS / server down / IP wrong)
                alert(
                    "No response from server. Check Django is running on 0.0.0.0:8000 and CORS is enabled."
                );
            } else {
                alert(err?.message || "Login failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                background: "#f2f2f2",
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    width: 360,
                    padding: 24,
                    border: "1px solid #ddd",
                    borderRadius: 12,
                    background: "#fff",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                }}
            >
                <h2 style={{ marginBottom: 6 }}>Admin Login</h2>
                <p style={{ marginTop: 0, color: "#666", marginBottom: 18 }}>
                    Login with admin credentials
                </p>

                <label style={{ display: "block", marginBottom: 6 }}>Username</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin username"
                    style={{
                        width: "100%",
                        padding: 12,
                        marginBottom: 12,
                        borderRadius: 10,
                        border: "1px solid #ccc",
                        outline: "none",
                    }}
                />

                <label style={{ display: "block", marginBottom: 6 }}>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="admin password"
                    style={{
                        width: "100%",
                        padding: 12,
                        marginBottom: 16,
                        borderRadius: 10,
                        border: "1px solid #ccc",
                        outline: "none",
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: 12,
                        borderRadius: 10,
                        border: "none",
                        background: "black",
                        color: "white",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
