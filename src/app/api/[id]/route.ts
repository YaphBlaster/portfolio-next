import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const user = await db.user.findUniqueOrThrow({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json({ ...user });
};
