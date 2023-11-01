// Logic to cache the prisma connection by attaching it to global if an instance does not exist
// This might be a singleton
import { Prisma, PrismaClient } from "@prisma/client";
let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

export type PageOwnerFullType = Prisma.PageOwnerGetPayload<{
  include: {
    projects: {
      include: {
        links: true;
        techStack: true;
      };
    };
  };
}>;

export type ProjectFullType = Prisma.ProjectGetPayload<{
  include: {
    links: true;
    techStack: true;
  };
}>;

export const getPageOwner = async ({ id }: { id?: string }) => {
  const query = {
    where: { id },
    include: {
      projects: {
        include: {
          links: true,
          techStack: true,
        },
      },
    },
  };
  if (id) {
    return await prisma.pageOwner.findUniqueOrThrow(query);
  }
  return await prisma.pageOwner.findFirst({
    ...query,
    where: { isDefaultOwner: true },
  });
};

export const dbUtils = {
  getPageOwner,
};
