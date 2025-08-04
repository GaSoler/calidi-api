/*
  Warnings:

  - You are about to drop the column `canceled_reason` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `otps` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `services` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `services` table. All the data in the column will be lost.
  - Changed the type of `start_time` on the `barber_availabilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `end_time` on the `barber_availabilities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updated_at` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "canceled_reason",
DROP COLUMN "notes",
ADD COLUMN     "cancel_reason" "CancelReason",
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "barber_availabilities" DROP COLUMN "start_time",
ADD COLUMN     "start_time" TIME NOT NULL,
DROP COLUMN "end_time",
ADD COLUMN     "end_time" TIME NOT NULL;

-- AlterTable
ALTER TABLE "otps" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT;
