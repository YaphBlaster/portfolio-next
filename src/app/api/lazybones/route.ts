import db from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const projects = await db.project.findMany();
  return NextResponse.json({ data: projects });
};

export const POST = (request: Request) => {};
