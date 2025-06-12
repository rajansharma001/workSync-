import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";

interface Props {
  params: {
    id: string;
  };
}
export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const taskId = await context.params.id;
  console.log("this is the id coming from params: ", taskId);

  const deleteTask = await prisma.task.delete({
    where: { id: taskId },
  });

  if (!deleteTask) {
    return NextResponse.json({ message: "deletion failed" }, { status: 404 });
  }
  return NextResponse.json({ message: "Task Deleted" }, { status: 200 });
}
