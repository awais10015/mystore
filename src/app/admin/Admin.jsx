"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";

const Admin = () => {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status !== "authenticated" || !isAdmin) return;

    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      if (!res.ok) return;
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, [status, isAdmin]);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar bg="white" />
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
        {isAdmin ? (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
              Admin Dashboard
            </h1>
            <ul className="space-y-4">
              {users.map((user) => (
                <li
                  key={user._id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-5 hover:shadow-md transition"
                >
                  <p className="text-gray-700">
                    <span className="font-semibold">Name:</span>{" "}
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Role:</span> {user.role}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center text-lg text-red-500 font-semibold">
            Only admins can access this page
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
