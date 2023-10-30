// "use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Portfolio from "@/components/Portfolio";
import db, { dbUtils } from "@/lib/db";

export const getPageOwnerById = async ({ id }: { id: string }) => {
  return await db.pageOwner.findUnique({
    where: {
      id,
    },
    include: {
      projects: {
        include: {
          links: true,
          techStack: true,
        },
      },
    },
  });
};

type Props = {};

const PageOwnerPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const data = await dbUtils.getPageOwner({ id });

  if (!data) return;

  return (
    <div>
      <Portfolio pageOwner={data} />
      {/* <div>{params.id}</div> */}
      {/* <div>{data?.name}</div> */}
    </div>
  );
};

export default PageOwnerPage;
