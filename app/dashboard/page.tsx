"use client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      welcome to dashboard
      <button
        className="p-2 bg-blue-500 rounded-md uppercase font-semibold text-[12px] cursor-pointer"
        onClick={() => {
          signOut();
          redirect("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
