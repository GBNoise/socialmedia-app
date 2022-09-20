-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "ParentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_ParentId_fkey" FOREIGN KEY ("ParentId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
