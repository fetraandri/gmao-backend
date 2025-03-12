/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Equipment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Intervention` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Intervention` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Maintenance` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Maintenance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Equipment" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Intervention" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Maintenance" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ALTER COLUMN "status" DROP DEFAULT;
