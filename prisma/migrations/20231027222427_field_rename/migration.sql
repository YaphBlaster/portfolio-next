/*
  Warnings:

  - You are about to drop the `TechTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectToTechTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToTechTag" DROP CONSTRAINT "_ProjectToTechTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectToTechTag" DROP CONSTRAINT "_ProjectToTechTag_B_fkey";

-- DropTable
DROP TABLE "TechTag";

-- DropTable
DROP TABLE "_ProjectToTechTag";

-- CreateTable
CREATE TABLE "Tech" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProjectToTech" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectToTech_AB_unique" ON "_ProjectToTech"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectToTech_B_index" ON "_ProjectToTech"("B");

-- AddForeignKey
ALTER TABLE "_ProjectToTech" ADD CONSTRAINT "_ProjectToTech_A_fkey" FOREIGN KEY ("A") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectToTech" ADD CONSTRAINT "_ProjectToTech_B_fkey" FOREIGN KEY ("B") REFERENCES "Tech"("id") ON DELETE CASCADE ON UPDATE CASCADE;
