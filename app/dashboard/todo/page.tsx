"use client";
import TodoGet from "@/components/TodoGet";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const page = () => {
  const { data: session } = useSession();
  const userSessionRole = session?.user.role;

  if (userSessionRole === "admin") {
    redirect("/dashboard/unathorized");
  }
  return (
    <div>
      <TodoGet />
    </div>
  );
};

export default page;
