"use client";

import { useEffect, useState } from "react";
import { Task } from "../../type/taskType";
import { User } from "../../type/userType";
import { Button } from "./ui/button";
import { Delete, DeleteIcon, Edit } from "lucide-react";
import Toast from "./toastNotification/Toast";
import UpdateForm from "./UpdateForm";

const TaskTable = () => {
  const [isMsg, setIsMsg] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [assignUserId, setAssignUserId] = useState();
  const [assignUserName, setAssignUserName] = useState();
  const [taskUser, setTaskUser] = useState<User[] | null>(null);
  const [isTaskUpdatePopOpen, setIsTaskUpdatePopOpen] = useState(false);

  const [task, setTask] = useState<Task[] | null>([]);
  const [taskId, setTaskId] = useState("");

  //   -------------------------------
  const getTask = async () => {
    const res = await fetch("/api/collection/task", {
      method: "GET",
    });
    const result = await res.json();
    setTask(result);
  };

  //   ------------------------------
  const getUser = async () => {
    const res = await fetch("/api/collection/user");
    const result = await res.json();
    setTaskUser(result);
    if (res.ok) {
      result.map((u: any) => {
        setAssignUserId(u.id);
        setAssignUserName(u.email);
      });
      console.log("usergetting or not:", result);
      setSuccess(`${result.length} 's user found`);

      setTimeout(() => {
        setSuccess(``);
      }, 300);
    } else {
      setError(`User not found`);
      setTimeout(() => {
        setError(``);
      }, 300);
    }
  };

  //   delete task

  const deleteTask = async (e: any) => {
    e.preventDefault();
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
    getTask();
  };

  useEffect(() => {
    getUser();
    getTask();
  }, []);
  setTimeout(() => {
    setIsMsg(false);
  }, 6000);

  return (
    <div className="w-full relative">
      <div className="absolute w-full">
        {isMsg && <Toast error={error} success={success} Icon={DeleteIcon} />}
      </div>
      <div className="w-full capitalize">
        {/* Header */}
        <div className="grid grid-cols-7 bg-gray-100 font-semibold text-sm border-b">
          <div className="p-2">Title</div>
          <div className="p-2">Description</div>
          <div className="p-2">Assigned to</div>
          <div className="p-2">Priority</div>
          <div className="p-2">Due Date</div>
          <div className="p-2">Status</div>
          <div className="p-2">Action</div>
        </div>

        {/* Body */}
        <div className="max-h-[600px] overflow-y-scroll">
          {task?.map((t, i) => (
            <div key={i} className="grid grid-cols-7 border-b text-sm">
              <div className="p-2">{t.title}</div>
              <div className="p-2">{t.description}</div>
              <div className="p-2">
                {t.assignee == assignUserId ? assignUserName : "Unknown"}
              </div>
              <div className="p-2">{t.priority}</div>
              <div className="p-2">
                {new Date(t.dueDate).toISOString().split("T")[0]}
              </div>
              <div className="p-2">{t.status}</div>
              <div className="p-2">
                <div className="flex gap-2">
                  <form onSubmit={deleteTask} method="POST">
                    <Button
                      type="submit"
                      variant={"destructive"}
                      className="cursor-pointer"
                      onClick={() => setTaskId(t.id)}
                    >
                      <Delete />
                    </Button>
                  </form>
                  <Button
                    onClick={() => {
                      setIsTaskUpdatePopOpen(true);
                      setTaskId(t.id);
                    }}
                  >
                    <Edit />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------ Update------- */}
      {isTaskUpdatePopOpen && (
        <div className="absolute inset-0 top-10 right-0  bg-white w-[95%]">
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setIsTaskUpdatePopOpen(false);
              }}
            >
              close
            </Button>
          </div>
          <UpdateForm taskId={taskId} />
        </div>
      )}
    </div>
  );
};

export default TaskTable;
