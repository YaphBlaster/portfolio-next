/*
  Warnings:

  - The primary key for the `Tech` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Tech` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProjectToTech" DROP CONSTRAINT "_ProjectToTech_B_fkey";

-- AlterTable
ALTER TABLE "Tech" DROP CONSTRAINT "Tech_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Tech_pkey" PRIMARY KEY ("name");

-- AddForeignKey
ALTER TABLE "_ProjectToTech" ADD CONSTRAINT "_ProjectToTech_B_fkey" FOREIGN KEY ("B") REFERENCES "Tech"("name") ON DELETE CASCADE ON UPDATE CASCADE;
