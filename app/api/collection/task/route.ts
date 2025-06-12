import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { Task } from "../../../../type/taskType";
import { auth } from "../../../../auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  console.log("mI getting session", session);
  try {
    if (session?.user?.role === "admin") {
      const body = await req.json();
      const {
        title,
        description,
        assignee,
        dueDate,
        priority,
        status,
        userid,
      }: Task = body;
      console.log("this is coming from api ", body);

      const postTask = await prisma.task.create({
        data: {
          title,
          description,
          assignee,
          dueDate: new Date(dueDate),
          priority,
          status,
          userid,
        },
      });
      if (!postTask) return NextResponse.json({ error: "got some error" });

      return NextResponse.json(
        { success: "everything going well" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "you are not authoried to perform this task",
      },
      { status: 404 }
    );
  }
}

export async function GET() {
  const getTask = await prisma.task.findMany();
  return NextResponse.json(getTask);
}
