-- CreateTable
CREATE TABLE "TechTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT,

    CONSTRAINT "TechTag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TechTag" ADD CONSTRAINT "TechTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;
