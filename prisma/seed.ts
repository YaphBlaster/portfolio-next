import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { v4 as uuidv4 } from "uuid";

async function main() {
  const pageOwner = await prisma.pageOwner.upsert({
    where: { id: uuidv4() },
    update: {},
    create: {
      summary: "I make things",
      name: "Yaphet Abraha",
      isDefaultOwner: true,
    },
  });

  await prisma.contactInfo.create({
    data: {
      email: "yaphet.abraha@gmail.com",
      linkedIn: "https://www.linkedin.com/in/yaphet-abraha/",
      github: "https://github.com/YaphBlaster",
      pageOwnerId: pageOwner.id,
    },
  });

  await prisma.project.create({
    data: {
      title: "Test Title",
      description: "Test Description",
      year: 2020,
    },
  });

  await prisma.projectLink.create({
    data: {
      demos: ["https://www.youtube.com/watch?v=E9lGHy3dBO0"],
      repositories: ["https://github.com/YaphBlaster"],
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
