import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET() {
  const getUser = await prisma.user.findMany({
    where: { role: "user" },
  });
  if (!getUser)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(getUser);
}
