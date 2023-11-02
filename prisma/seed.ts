import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v4 as uuidv4 } from "uuid";

async function main() {
  await prisma.pageOwner.upsert({
    where: { id: uuidv4() },
    update: {},
    create: {
      summary: "I make things",
      name: "Yaphet Abraha",
      isDefaultOwner: true,
    },
  });

  await prisma.projectLink.upsert({
    where: { id: uuidv4() },
    update: {},
    create: {
      demos: ["https://www.youtube.com/watch?v=E9lGHy3dBO0"],
      repositories: ["https://github.com/YaphBlaster"],
    },
  });

  await prisma.project.upsert({
    where: { id: uuidv4() },
    update: {},
    create: {
      title: "Test Title",
      description: "Test Description",
      year: 2020,
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
