import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { prisma } from "../../../../prisma/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  const sessionId = session?.user.id;
  console.log("this is the current sessionId:", sessionId);

  const getTask = await prisma.task.findMany({
    where: { assignee: sessionId },
  });

  return NextResponse.json(getTask);
}
