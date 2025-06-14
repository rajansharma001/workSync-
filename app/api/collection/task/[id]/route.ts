import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
import { Task } from "../../../../../type/taskType";

interface Props {
  id: string;
}
export async function DELETE(
  req: Request,
  context: { params: Promise<Props> }
) {
  const taskId = (await context.params).id;

  const deleteTask = await prisma.task.delete({
    where: { id: taskId },
  });

  if (!deleteTask) {
    return NextResponse.json({ message: "deletion failed" }, { status: 404 });
  }
  return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
}

export async function GET(req: Request, context: { params: Promise<Props> }) {
  const taskId = (await context.params).id;

  const getTaskById = await prisma.task.findUnique({
    where: { id: taskId },
  });
  return NextResponse.json(getTaskById);
}

export async function PUT(req: Request, context: { params: Promise<Props> }) {
  const taskid = (await context.params).id;
  const body = await req.json();

  // Debug
  console.log("Raw body:", body, taskid);

  const { title, assignee, description, dueDate, priority, status } = body;

  const updateTask = await prisma.task.update({
    data: {
      title: title,
      description: description,
      assignee: assignee,
      dueDate: dueDate,
      priority: priority,
      status: status,
      userid: assignee,
    },
    where: { id: taskid },
  });

  if (!updateTask) {
    return NextResponse.json({ message: "Update failed" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Task updated success" },
    { status: 200 }
  );
}
