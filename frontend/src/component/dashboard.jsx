import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({
        projects: 12,
        tasks: 24,
        completed: 18
    });
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
        
        const timer = setTimeout(() => {
            setStats({
                projects: 12,
                tasks: 24,
                completed: 18
            });
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 max-w-full rounded-lg">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-indigo-700">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-100 p-4 md:p-8 w-full">
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-indigo-200 opacity-20"
                        style={{
                            width: Math.random() * 200 + 50,
                            height: Math.random() * 200 + 50,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: Math.random() * 30 + 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-screen mx-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl font-bold text-gray-800"
                        >
                            Welcome back, {user.name.split(' ')[0]}!
                        </motion.h1>
                        <p className="text-gray-600">Here's what's happening today</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={logout}
                        className="px-4 py-2 bg-red-500 text-black rounded-lg shadow hover:bg-red-600 transition-colors"
                    >
                        Logout
                    </motion.button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden md:col-span-1"
                    >
                        <div className="p-6">
                            <div className="flex flex-col items-center">
                                <motion.img
                                    src={user?.avatar || '/default-avatar.png'}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                                    onError={(e) => {
                                        e.target.src = '/default-avatar.png';
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                />
                                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                                    {user.name || 'No name provided'}
                                </h2>
                                <p className="text-gray-500">{user.email}</p>
                            </div>

                            <div className="mt-6 space-y-3">
                                <div className="flex items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600 w-24">Phone:</span>
                                    <span className="text-gray-800">
                                        {user.phoneNumber || 'Not provided'}
                                    </span>
                                </div>
                                <div className="flex items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600 w-24">Member since:</span>
                                    <span className="text-gray-800">
                                        {new Date().toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Section */}
                    <div className="md:col-span-2 space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {Object.entries(stats).map(([key, value]) => (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + 0.1 * Object.keys(stats).indexOf(key) }}
                                    className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg"
                                >
                                    <h3 className="text-gray-500 text-sm font-medium capitalize">
                                        {key}
                                    </h3>
                                    <p className="text-2xl font-bold text-indigo-600">
                                        {value}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                                <ul className="space-y-3">
                                    {[
                                        { action: "Completed project", time: "2 hours ago", icon: "check" },
                                        { action: "Uploaded files", time: "Yesterday", icon: "upload" },
                                        { action: "Created new task", time: "2 days ago", icon: "plus" }
                                    ].map((item, index) => (
                                        <motion.li
                                            key={index}
                                            whileHover={{ x: 5 }}
                                            className="flex items-start"
                                        >
                                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                                                <svg
                                                    className="h-5 w-5 text-indigo-500"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d={
                                                            item.icon === "check" ? "M5 13l4 4L19 7" :
                                                            item.icon === "upload" ? "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" :
                                                            "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                        }
                                                    />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-sm font-medium text-gray-900">{item.action}</p>
                                                <p className="text-sm text-gray-500">{item.time}</p>
                                            </div>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;