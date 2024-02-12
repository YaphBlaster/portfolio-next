"use server";
import { AdminFormType } from "@/components/AdminForm";
import { prisma as prismaInstance } from "./db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { SimpleIcon } from "simple-icons";
import { ProjectFormType } from "@/components/ProjectForm";

const revalidateContent = () => {
  revalidatePath("/(main)/[[...id]]", "page");
};

export type _PageOwnerFullType = Prisma.PageOwnerGetPayload<{
  include: {
    projects: {
      include: {
        links: true;
        techStack: true;
      };
    };
    skills: true;
  };
}>;

export type _ProjectFullType = Prisma.ProjectGetPayload<{
  include: {
    links: true;
    techStack: true;
  };
}>;

export type _SkillsFullType = Prisma.TechGetPayload<{}>;

export const updatePageOwner = async ({
  formData,
  purifiedSkills,
  pageOwnerId,
}: {
  formData: AdminFormType;
  purifiedSkills: SimpleIcon[];
  pageOwnerId: string;
}) => {
  const { name, summary } = formData;

  const techCreateOrConnectArray: Prisma.TechCreateOrConnectWithoutPageOwnerInput[] =
    purifiedSkills.map((skill) => {
      delete skill.guidelines;
      return {
        where: {
          slug: skill.slug,
        },
        create: {
          ...skill,
        },
      };
    });

  await prisma.pageOwner.update({
    where: { id: pageOwnerId },
    include: {
      projects: {
        include: {
          links: true,
          techStack: true,
          pageOwners: true,
        },
      },
      skills: true,
    },
    data: {
      name,
      summary,
      skills: {
        connectOrCreate: techCreateOrConnectArray,
      },
    },
  });

  revalidateContent();
};

export const addProject = async ({
  formData,
  pageOwnerId,
}: {
  formData: ProjectFormType;
  purifiedSkills: SimpleIcon[];
  pageOwnerId: string;
}) => {
  const { description, title, year } = formData;

  const projectData: Prisma.ProjectCreateInput = {
    title,
    description,
    year,
  };

  await prisma.project.create({
    data: {
      ...projectData,
      pageOwners: {
        connect: {
          id: pageOwnerId,
        },
      },
    },
  });

  revalidateContent();
};

export const getOwner = async ({ id }: { id?: string }) => {
  const query: Prisma.PageOwnerFindUniqueOrThrowArgs = {
    where: { id },
    include: {
      skills: true,
      projects: {
        include: {
          links: true,
          techStack: true,
        },
      },
    },
  };

  return await prismaInstance.pageOwner.findUniqueOrThrow(query);
};

export const getPageOwner = async ({ id }: { id?: string }) => {
  const query: Prisma.PageOwnerFindUniqueOrThrowArgs = {
    where: { id },
    include: {
      skills: true,
      projects: {
        include: {
          links: true,
          techStack: true,
        },
      },
    },
  };

  if (id) {
    return await prismaInstance.pageOwner.findUniqueOrThrow(query);
  }
  return await prismaInstance.pageOwner.findFirst({
    ...query,
    where: { isDefaultOwner: true },
  });
};
