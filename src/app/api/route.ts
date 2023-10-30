import db from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const firstUser = await db.pageOwner.findFirstOrThrow({
    include: {
      projects: {
        include: {
          techStack: true,
          links: true,
        },
      },
    },
  });
  return NextResponse.json({ data: firstUser });
};
