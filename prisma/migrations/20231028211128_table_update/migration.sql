/*
  Warnings:

  - You are about to drop the column `demo` on the `ProjectLinks` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `ProjectLinks` table. All the data in the column will be lost.
  - Added the required column `year` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProjectLinks" DROP COLUMN "demo",
DROP COLUMN "github",
ADD COLUMN     "demos" TEXT[],
ADD COLUMN     "repositories" TEXT[];
