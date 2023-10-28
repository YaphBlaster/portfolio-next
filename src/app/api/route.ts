import db from "@/lib/db";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const firstUser = await db.user.findFirst({
    include: {
      Projects: {
        include: {
          techStack: true,
          links: true,
        },
      },
    },
  });
  return NextResponse.json({ data: firstUser });
};
