-- CreateTable
CREATE TABLE "_saved posts" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_saved posts_AB_unique" ON "_saved posts"("A", "B");

-- CreateIndex
CREATE INDEX "_saved posts_B_index" ON "_saved posts"("B");

-- AddForeignKey
ALTER TABLE "_saved posts" ADD CONSTRAINT "_saved posts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_saved posts" ADD CONSTRAINT "_saved posts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
