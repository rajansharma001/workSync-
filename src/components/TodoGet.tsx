"use client";
import React, { useEffect, useState } from "react";
import { Task } from "../../type/taskType";
import { statusSet } from "./data/formData";

const TodoGet = () => {
  const [todo, setTodo] = useState<Task[]>([]);
  const [todoId, setTodoId] = useState("");
  const [newStatus, setNewStatus] = useState<{ [todoId: string]: string }>({});
  const getTodo = async () => {
    const res = await fetch("/api/collection/todo");
    const result = await res.json();
    setTodo(result);
    result.map((r: any) => {
      setTodoId(r.id);
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    taskId: string
  ) => {
    const value = e.target.value;
    setNewStatus((prev) => ({
      ...prev,
      [taskId]: value,
    }));
    handleTaskUpdate(taskId, value);
  };

  const handleTaskUpdate = async (taskId: string, value: string) => {
    const status = newStatus[taskId];
    const res = await fetch(`/api/collection/todo/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: value }),
    });
    const result = await res.json();
    getTodo();
  };
  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div className="w-full p-10">
      <h1
        className="text-xl font-semibold text-gray-400 text-center
        "
      >
        Assigned Task to you
      </h1>
      <table className="min-w-full border border-gray-300 text-sm text-left mt-8">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Assignee</th>
            <th className="px-4 py-2 border">Due Date</th>
            <th className="px-4 py-2 border">Priority</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {todo.map((task) => (
            <tr key={task.id}>
              <td className="px-4 py-2 border">{task.id}</td>
              <td className="px-4 py-2 border">{task.title}</td>
              <td className="px-4 py-2 border">{task.description}</td>
              <td className="px-4 py-2 border">{task.assignee}</td>
              <td className="px-4 py-2 border">{task.dueDate}</td>
              <td className="px-4 py-2 border">{task.priority}</td>
              <td className="px-4 py-2 border">{task.status}</td>
              <td className="px-4 py-2 border">
                <select
                  name="status"
                  id=""
                  value={newStatus[task.id] || task.status}
                  onChange={(e) => {
                    handleChange(e, task.id);
                  }}
                >
                  {statusSet.map((s, i) => (
                    <option key={i} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoGet;
