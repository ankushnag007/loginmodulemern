import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();  
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
    }, []);

    console.log(user, "user data from localStorage");

    const logout = ()=>{
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    }
    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
                    <p className="text-gray-600">Welcome to your personal dashboard</p>
                </header>
<button onClick={logout}>Logout</button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-1">
                        <div className="p-6">
                            <div className="flex flex-col items-center">
                            <img 
  src={user?.avatar || '/default-avatar.png'} 
  alt="Profile" 
  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
  onError={(e) => {
    e.target.src = '/default-avatar.png';
  }}
/>
                                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                                    {user.name || 'No name provided'}
                                </h2>
                                <p className="text-gray-500">{user.email}</p>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600 w-24">Phone:</span>
                                    <span className="text-gray-800">
                                        {user.phoneNumber || 'Not provided'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;