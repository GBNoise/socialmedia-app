-- CreateTable
CREATE TABLE "_user liked posts" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user liked posts_AB_unique" ON "_user liked posts"("A", "B");

-- CreateIndex
CREATE INDEX "_user liked posts_B_index" ON "_user liked posts"("B");

-- AddForeignKey
ALTER TABLE "_user liked posts" ADD CONSTRAINT "_user liked posts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user liked posts" ADD CONSTRAINT "_user liked posts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
