/*
  Warnings:

  - You are about to drop the column `projectId` on the `TechTag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TechTag" DROP CONSTRAINT "TechTag_projectId_fkey";

-- AlterTable
ALTER TABLE "TechTag" DROP COLUMN "projectId";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectLinks" (
    "id" TEXT NOT NULL,
    "github" TEXT[],
    "demo" TEXT,
    "projectId" TEXT,

    CONSTRAINT "ProjectLinks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToTechTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTechTag_AB_unique" ON "_ProjectToTechTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTechTag_B_index" ON "_ProjectToTechTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToUser_AB_unique" ON "_ProjectToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToUser_B_index" ON "_ProjectToUser"("B");

-- AddForeignKey
ALTER TABLE "ProjectLinks" ADD CONSTRAINT "ProjectLinks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTechTag" ADD CONSTRAINT "_ProjectToTechTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTechTag" ADD CONSTRAINT "_ProjectToTechTag_B_fkey" FOREIGN KEY ("B") REFERENCES "TechTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD CONSTRAINT "_ProjectToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToUser" ADD CONSTRAINT "_ProjectToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
