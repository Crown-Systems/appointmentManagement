/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pointcloud_formats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `us_gaz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `us_lex` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `us_rules` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "pointcloud_formats";

-- DropTable
DROP TABLE "us_gaz";

-- DropTable
DROP TABLE "us_lex";

-- DropTable
DROP TABLE "us_rules";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
