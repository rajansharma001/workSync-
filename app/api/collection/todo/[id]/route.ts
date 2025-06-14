import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma";
interface Props {
  id: string;
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<Props> }
) {
  const id = (await context.params).id;
  const body = await req.json();

  console.log("taskId from URL:", id);
  console.log("body:", body);

  console.log(body);

  const { status } = body;
  console.log(status);

  const updateTaskStatus = await prisma.task.update({
    data: { status: status },
    where: { id: id },
  });
  return NextResponse.json({ message: "Task updated" }, { status: 200 });
}
