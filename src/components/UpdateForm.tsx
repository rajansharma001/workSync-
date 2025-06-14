import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import Toast from "./toastNotification/Toast";
import { User } from "../../type/userType";
import { prioritySet, statusSet } from "./data/formData";
import { Task } from "../../type/taskType";

interface Props {
  taskId: string;
}

const UpdateForm = ({ taskId }: Props) => {
  //   --------- error
  const [hasMsg, setHasMsg] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //   task usestates--------------

  const [task, setTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    priority: "",
    status: "",
  });

  const [userData, setUserData] = useState<User[]>([]);

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

  //   --------- get task by id----------------

  const fetchTask = async () => {
    const res = await fetch(`/api/collection/task/${taskId}`, {
      method: "GET",
    });
    const result = await res.json();
    setTask(result);
    setFormData({
      title: result?.title || "",
      description: result?.description || "",
      assignee: result.userid || "",
      dueDate: result?.dueDate || "",
      priority: result?.priority || "",
      status: result?.status || "",
    });
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  //   handleUPdate ---------------
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    const finalValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: finalValue,
    }));
  };
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/collection/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    setHasMsg(true);

    if (!res.ok) {
      setError("update failed");
    } else {
      setSuccess("Task updated success");
      setFormData({
        title: "",
        description: "",
        assignee: "",
        dueDate: "",
        priority: "",
        status: "",
      });
    }
  };

  return (
    <div className=" w-full ">
      <div className=" relative  w-full  flex justify-center bg-white">
        <div className="w-full h-screen flex flex-col items-center shadow-2xl rounded-md p-10 gap-2">
          <div className="absolute h-[8px] inset-0 top-0  mt-10 right-0">
            {hasMsg && <Toast error={error} success={success} />}
          </div>
          <form onSubmit={handleUpdate} method="POST" className="w-full">
            <div className="flex  flex-col justify-center items-center w-full gap-2  text-[14px]">
              <div className="w-full gap-1 flex-4/12 flex flex-col">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  name="title"
                  id="title"
                  placeholder=" Task title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full flex-4/12 gap-1 flex flex-col">
                <Label htmlFor="assignee">Select a employee to assign</Label>
                <select
                  name="assignee"
                  id=""
                  value={formData.assignee}
                  onChange={handleChange}
                  className="p-2 rounded-sm border-gray-200 border-2"
                >
                  {/* <option value={formData.userid}>{userid}</option> */}
                  {userData?.map((user, index) => (
                    <option value={user.id} key={index}>
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
                  value={formData.priority}
                  onChange={handleChange}
                  className="p-2 rounded-sm border-gray-200 border-2"
                >
                  <option value="">{formData.priority}</option>
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
                  value={formData.status}
                  onChange={handleChange}
                  className="p-2 rounded-sm border-gray-200 border-2"
                >
                  <option value="">{formData.status}</option>
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
                <Label htmlFor="dueDate">Deadline{formData.dueDate}</Label>
                <Input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={
                    formData.dueDate
                      ? new Date(formData.dueDate).toISOString().split("T")[0]
                      : ""
                  }
                  onChange={handleChange}
                />
              </div>
              <div className="w-full flex-4/12 gap-1 flex flex-col">
                <Label htmlFor="description">Describe about task</Label>
                <Textarea
                  name="description"
                  placeholder="Enter task details..."
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
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

export default UpdateForm;
