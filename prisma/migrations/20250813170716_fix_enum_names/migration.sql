/*
  Warnings:

  - The values [CANCELLED] on the enum `AppointmentStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [BARBER_CANCELLED,CUSTOMER_CANCELLED] on the enum `CancelReason` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppointmentStatus_new" AS ENUM ('CONFIRMED', 'CANCELED', 'DONE');
ALTER TABLE "appointments" ALTER COLUMN "status" TYPE "AppointmentStatus_new" USING ("status"::text::"AppointmentStatus_new");
ALTER TYPE "AppointmentStatus" RENAME TO "AppointmentStatus_old";
ALTER TYPE "AppointmentStatus_new" RENAME TO "AppointmentStatus";
DROP TYPE "AppointmentStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "CancelReason_new" AS ENUM ('CUSTOMER_NO_SHOW', 'BARBER_CANCELED', 'CUSTOMER_CANCELED', 'WEATHER_OR_EMERGENCY', 'OTHER');
ALTER TABLE "appointments" ALTER COLUMN "cancel_reason" TYPE "CancelReason_new" USING ("cancel_reason"::text::"CancelReason_new");
ALTER TYPE "CancelReason" RENAME TO "CancelReason_old";
ALTER TYPE "CancelReason_new" RENAME TO "CancelReason";
DROP TYPE "CancelReason_old";
COMMIT;
