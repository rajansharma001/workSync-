//   delete task
"use client";
import { useState } from "react";
import { Task } from "../../../type/taskType";

export const deleteByApiTask = async (e: any) => {
  e.preventDefault();
  const [isMsg, setIsMsg] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [taskId, setTaskId] = useState("");
  const res = await fetch(`/api/collection/task/${taskId}`, {
    method: "DELETE",
  });
  const result = await res.json();
  if (res.ok) {
    setSuccess("Task Removed Success");
    setError("");
    setIsMsg(true);
  } else {
    setError("Something went wrong");
    setSuccess("");
    setIsMsg(true);
  }
};
