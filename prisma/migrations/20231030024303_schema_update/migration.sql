/*
  Warnings:

  - You are about to drop the `ProjectLinks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectLinks" DROP CONSTRAINT "ProjectLinks_projectId_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToUser" DROP CONSTRAINT "_ProjectToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToUser" DROP CONSTRAINT "_ProjectToUser_B_fkey";

-- DropTable
DROP TABLE "ProjectLinks";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_ProjectToUser";

-- CreateTable
CREATE TABLE "PageOwner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "PageOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectLink" (
    "id" TEXT NOT NULL,
    "repositories" TEXT[],
    "demos" TEXT[],
    "projectId" TEXT,

    CONSTRAINT "ProjectLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PageOwnerToProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PageOwnerToProject_AB_unique" ON "_PageOwnerToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_PageOwnerToProject_B_index" ON "_PageOwnerToProject"("B");

-- AddForeignKey
ALTER TABLE "ProjectLink" ADD CONSTRAINT "ProjectLink_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageOwnerToProject" ADD CONSTRAINT "_PageOwnerToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "PageOwner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageOwnerToProject" ADD CONSTRAINT "_PageOwnerToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
