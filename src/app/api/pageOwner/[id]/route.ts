import { AdminFormType } from "@/components/AdminForm";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const user = await db.pageOwner.findUniqueOrThrow({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({ ...user });
};

export const PATCH = async (
  request: Request,
  { params: { id } }: { params: { id: string } }
) => {
  const { name, summary, skills } = (await request.json()) as AdminFormType;

  const updatedPageOwner = await prisma.pageOwner.update({
    where: { id },
    include: {
      projects: {
        include: {
          links: true,
          techStack: true,
          pageOwners: true,
        },
      },
    },
    data: {
      name,
      summary,
      skills,
    },
  });

  revalidatePath("/(main)/[[...id]]/page", "page");

  // revalidatePath("/", "page");
  // revalidatePath(`/${id}`, "page");

  return NextResponse.json({ ...updatedPageOwner });
};
