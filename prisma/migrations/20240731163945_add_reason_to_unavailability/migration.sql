/*
  Warnings:

  - Added the required column `updatedAt` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Unavailability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Unavailability" ADD COLUMN     "reason" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
