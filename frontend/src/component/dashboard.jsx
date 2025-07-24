import React, { useEffect, useState } from 'react';

const UserDashboard = ({ userData }) => {
    console.log(userData, "check user datat");
    
    const [user, serUsers] = useState();
    useEffect(()=>{
        const getUser = async()=>{
            try {
                
                const apiResponse = await fetch('http://localhost:4000/api/auth/get-user',{
          method:"GET",
          credentials:"include",
        })
  
        if(!apiResponse.ok){
          throw new Error("error fetching users")
        }
        const responData = await apiResponse.json();
        serUsers(responData)
        console.log(responData, "check user after login");
        
            } catch (error) {
                console.log(error);
                
            }
        }
        getUser()
    },[])
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
          <p className="text-gray-600">Welcome to your personal dashboard</p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-1">
            <div className="p-6">
              <div className="flex flex-col items-center">
                <img 
                  src={user?.user?.avatar || '/default-avatar.png'} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                />
                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                  {user?.user?.name || 'No name provided'}
                </h2>
                <p className="text-gray-500">{user?.user?.email}</p>
              </div>

              <div className="mt-6">
                <div className="flex items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600 w-24">Phone:</span>
                  <span className="text-gray-800">
                    {user?.user?.phoneNumber || 'Not provided'}
                  </span>
                </div>
                
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="md:col-span-2 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Projects</h3>
                <p className="text-2xl font-bold text-indigo-600">12</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Tasks</h3>
                <p className="text-2xl font-bold text-indigo-600">24</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
                <p className="text-2xl font-bold text-indigo-600">18</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                      <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Created new project</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                      <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Completed task</p>
                      <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;