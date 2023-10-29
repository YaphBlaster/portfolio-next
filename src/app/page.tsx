import ThemeToggle from "@/components/ThemeToggle";
import Image from "next/image";
import db from "@/lib/db";
import { NextResponse } from "next/server";
import { useQuery } from "@tanstack/react-query";

const getData = async () => {
  return await db.user.findFirst({
    include: {
      Projects: {
        include: {
          links: true,
          techStack: true,
        },
      },
    },
  });
};

export default async function Home() {
  const data = await getData();

  return (
    <div>
      <ThemeToggle />
      <div>Nav bar</div>
      <div>Image?</div>
      <div>{data?.summary}</div>
      <div>Skills</div>
      <div>Projects</div>
      <div>Contact Me</div>
    </div>
  );
}
