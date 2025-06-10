"use client";
import ProfileComp from "@/components/ProfileComp";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const Profile = () => {
  const { data: session } = useSession();
  if (session?.user.role == "user") {
    redirect("/dashboard/unathorized");
  }
  return (
    <div>
      <ProfileComp />
    </div>
  );
};

export default Profile;
