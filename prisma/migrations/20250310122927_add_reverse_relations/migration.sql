-- AlterTable
ALTER TABLE "Intervention" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'En cours';

-- AlterTable
ALTER TABLE "Maintenance" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'En cours';

-- AddForeignKey
ALTER TABLE "Intervention" ADD CONSTRAINT "Intervention_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Maintenance" ADD CONSTRAINT "Maintenance_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
