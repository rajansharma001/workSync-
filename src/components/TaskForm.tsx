import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { User } from "../../type/userType";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { prioritySet, statusSet } from "./data/formData";
import Toast from "./toastNotification/Toast";
import { Label } from "./ui/label";

interface Props {
  isTask: () => void;
}
const TaskForm = ({ isTask }: Props) => {
  const [userData, setUserData] = useState<User[] | null>([]);
  const { data: session } = useSession();
  const user = session?.user;

  //   task usestates--------------

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  //   --------- error
  const [hasMsg, setHasMsg] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //   ----------   getting user    --------------------
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/collection/user");
      const result = await res.json();
      if (res.ok) {
        setUserData(result);
        console.log("is it running?", result);
      }
    };
    getUser();
  }, []);

  //   ---------------handle submit

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (user?.role === "user") {
      redirect("/dashboard/unathorized");
    } else {
      const res = await fetch("/api/collection/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          assignee,
          dueDate,
          priority,
          status,
          userid: user?.id,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setHasMsg(true);
        setSuccess("Task added and assigned success");
        setError("");
        setTitle("");
        setDescription("");
        setAssignee("");
        setDueDate("");
        setPriority("");
        setStatus("");
        setTimeout(() => {
          setHasMsg(false);
        }, 3000);
      } else {
        setError("Something went wrong.");
        setSuccess("");
      }
      setTimeout(() => {
        setHasMsg(false);
        setSuccess("");
        setError("");
      }, 3000);
    }
  };

  return (
    <div className=" w-full absolute inset-0 top-10 left-0  flex justify-center bg-white">
      <div className=" relative  w-full  flex justify-center bg-white">
        <div className="w-[95%] h-screen flex flex-col items-center shadow-2xl rounded-md p-10 gap-2">
          <div className="absolute h-[8px] inset-0 top-0  mt-10 right-0">
            {hasMsg && <Toast error={error} success={success} />}
          </div>
          <form onSubmit={handleSubmit} method="POST" className="w-full">
            <div className="flex  flex-col justify-center items-center w-full gap-2  text-[14px]">
              <div className="w-full gap-1 flex-4/12 flex flex-col">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  name="title"
                  id="title"
                  placeholder=" Task title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>

              <div className="w-full flex-4/12 gap-1 flex flex-col">
                <Label htmlFor="assignee">Select a employee to assign</Label>
                <select
                  name="assignee"
                  id=""
                  value={assignee}
                  onChange={(e) => {
                    setAssignee(e.target.value);
                  }}
                  className="p-2 rounded-sm border-gray-200 border-2"
                >
                  {userData?.map((user, index) => (
                    <option value="" key={index}>
                      {user.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex-4/12 gap-1 flex flex-col">
                <Label htmlFor="priority">Priority</Label>
                <select
                  name="priority"
                  id=""
                  value={priority}
                  onChange={(e) => {
                    setPriority(e.target.value);
                  }}
                  className="p-2 rounded-sm border-gray-200 border-2"
                >
                  {prioritySet.map((p, i) => (
                    <option
                      key={i}
                      value={p}
                      className="p-2 rounded-sm border-gray-200 border-2"
                    >
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex-4/12 gap-1 flex flex-col">
                <Label htmlFor="status">Task Status</Label>
                <select
                  name="status"
                  id=""
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  className="p-2 rounded-sm border-gray-200 border-2"
                >
                  {statusSet.map((p, i) => (
                    <option
                      key={i}
                      value={p}
                      className="p-2 rounded-sm border-gray-200 border-2"
                    >
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full gap-1 flex-4/12 flex flex-col">
                <Label htmlFor="dueDate">Deadline</Label>
                <Input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value);
                  }}
                />
              </div>
              <div className="w-full flex-4/12 gap-1 flex flex-col">
                <Label htmlFor="description">Describe about task</Label>
                <Textarea
                  name="description"
                  placeholder="Enter task details..."
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
