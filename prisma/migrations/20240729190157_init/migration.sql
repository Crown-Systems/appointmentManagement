-- AlterTable
CREATE SEQUENCE roles_id_seq;
ALTER TABLE "roles" ALTER COLUMN "id" SET DEFAULT nextval('roles_id_seq');
ALTER SEQUENCE roles_id_seq OWNED BY "roles"."id";

-- CreateTable
CREATE TABLE "Slot" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Slot_pkey" PRIMARY KEY ("id")
);
