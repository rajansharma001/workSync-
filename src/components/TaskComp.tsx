"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

import TaskTable from "./TaskTable";
import TaskForm from "./TaskForm";
interface Props {
  id: string;
}
const TaskComp = ({ id }: Props) => {
  const [isTaskPopOpen, setIsTaskPopOpen] = useState(false);

  const handlePop = async () => {
    setIsTaskPopOpen(true);
  };

  return (
    <div className="relative w-full flex-col flex justify-center items-center">
      {/* //////////// BUTTONS */}

      {!isTaskPopOpen ? (
        <Button
          onClick={() => setIsTaskPopOpen(true)}
          className="absolute top-0 right-5"
        >
          Add New Task
        </Button>
      ) : (
        <Button
          title="Close"
          onClick={() => setIsTaskPopOpen(false)}
          className="absolute top-0 right-5"
        >
          Close
        </Button>
      )}

      {/* task table */}

      <div className="w-full flex justify-center items-center mt-10">
        <TaskTable id={id} />
      </div>

      {isTaskPopOpen && <TaskForm isTask={handlePop} />}

      {/* {isTaskUpdatePopOpen && (
        <div className=" absolute inset-0 top-0 left-0 w-full h-screen flex flex-col justify-center bg-white">
          <div className="absolute top-0   w-full h-[50%]  flex flex-col items-center justify-center shadow-2xl rounded-md p-10 gap-2">
            <Button
              title="Close"
              onClick={() => setIsTaskUpdatePopOpen(false)}
              className="absolute top-0 right-5"
            >
              Close
            </Button>
            <form onSubmit={handleUpdate} className="w-full mt-10">
              <div className="flex  flex-col justify-center items-center w-full gap-2  text-[14px]">
                <div className="w-full gap-1 flex-4/12 flex flex-col">
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
                  {userData.map((u) => (
                    <select
                      name="assignee"
                      id=""
                      key={u.id}
                      value={assignee}
                      onChange={(e) => {
                        setAssignee(e.target.value);
                      }}
                      className="p-2 rounded-sm border-gray-200 border-2"
                    >
                      <option
                        value={u.id}
                        className="p-2 rounded-sm border-gray-200 border-2"
                      >
                        {u.name}
                      </option>
                    </select>
                  ))}
                </div>
                <div className="w-full flex-4/12 gap-1 flex flex-col">
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
      )} */}
    </div>
  );
};

export default TaskComp;
