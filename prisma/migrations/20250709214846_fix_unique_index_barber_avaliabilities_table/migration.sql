/*
  Warnings:

  - A unique constraint covering the columns `[barber_id,weekday]` on the table `barber_availabilities` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "barber_availabilities_barber_id_weekday_key" ON "barber_availabilities"("barber_id", "weekday");
