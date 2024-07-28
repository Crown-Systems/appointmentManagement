-- CreateTable
CREATE TABLE "pointcloud_formats" (
    "pcid" INTEGER NOT NULL,
    "srid" INTEGER,
    "schema" TEXT,

    CONSTRAINT "pointcloud_formats_pkey" PRIMARY KEY ("pcid")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "roles" VARCHAR(10) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "us_gaz" (
    "id" SERIAL NOT NULL,
    "seq" INTEGER,
    "word" TEXT,
    "stdword" TEXT,
    "token" INTEGER,
    "is_custom" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pk_us_gaz" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "us_lex" (
    "id" SERIAL NOT NULL,
    "seq" INTEGER,
    "word" TEXT,
    "stdword" TEXT,
    "token" INTEGER,
    "is_custom" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pk_us_lex" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "us_rules" (
    "id" SERIAL NOT NULL,
    "rule" TEXT,
    "is_custom" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pk_us_rules" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
