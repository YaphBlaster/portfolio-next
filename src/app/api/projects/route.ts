import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const firstUser = await db.user.findFirst({
    include: {
      Projects: {
        include: { techStack: true, User: true },
      },
    },
  });
  console.log("🚀 ~ file: route.ts:6 ~ GET ~ firstUser:", firstUser);
  return NextResponse.json({ data: firstUser });
};

export const POST = (request: Request) => {};
