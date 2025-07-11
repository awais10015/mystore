"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Navbar from "../components/Navbar";

const Admin = () => {
  const { user } = useUser();
  if (!user) return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      console.log("Fetched users:", data);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
        {userEmail === "awais10015@gmail.com" ? (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                >
                  <p className="text-gray-700">
                    <span className="font-semibold">Name:</span> {user.firstName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center text-lg text-red-500 font-semibold">
            Only Admin can access this page
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
