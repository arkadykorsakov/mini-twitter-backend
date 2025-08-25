-- CreateTable
CREATE TABLE "public"."feeds" (
    "id" SERIAL NOT NULL,
    "followerId" INTEGER NOT NULL,
    "followedId" INTEGER NOT NULL,
    "createTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feeds_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "feeds_followerId_idx" ON "public"."feeds"("followerId");

-- CreateIndex
CREATE INDEX "feeds_followedId_idx" ON "public"."feeds"("followedId");

-- CreateIndex
CREATE UNIQUE INDEX "feeds_followedId_followerId_key" ON "public"."feeds"("followedId", "followerId");

-- AddForeignKey
ALTER TABLE "public"."feeds" ADD CONSTRAINT "feeds_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."feeds" ADD CONSTRAINT "feeds_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
