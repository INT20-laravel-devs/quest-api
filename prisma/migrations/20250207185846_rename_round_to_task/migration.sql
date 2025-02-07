/*
  Warnings:

  - You are about to drop the column `round_id` on the `coordinates` table. All the data in the column will be lost.
  - You are about to drop the column `round_id` on the `variants` table. All the data in the column will be lost.
  - You are about to drop the `rounds` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[taskId_id]` on the table `coordinates` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `taskId_id` to the `coordinates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId_id` to the `variants` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('SINGLE', 'MULTIPLE', 'OPEN', 'IMAGE', 'LOCATION');

-- DropForeignKey
ALTER TABLE "coordinates" DROP CONSTRAINT "coordinates_round_id_fkey";

-- DropForeignKey
ALTER TABLE "rounds" DROP CONSTRAINT "rounds_quest_id_fkey";

-- DropForeignKey
ALTER TABLE "variants" DROP CONSTRAINT "variants_round_id_fkey";

-- DropIndex
DROP INDEX "coordinates_round_id_key";

-- AlterTable
ALTER TABLE "coordinates" DROP COLUMN "round_id",
ADD COLUMN     "taskId_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "quests" ADD COLUMN     "time_limit" INTEGER;

-- AlterTable
ALTER TABLE "variants" DROP COLUMN "round_id",
ADD COLUMN     "taskId_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "rounds";

-- DropEnum
DROP TYPE "RoundType";

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "quest_id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "type" "TaskType" NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "coordinates_taskId_id_key" ON "coordinates"("taskId_id");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_quest_id_fkey" FOREIGN KEY ("quest_id") REFERENCES "quests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variants" ADD CONSTRAINT "variants_taskId_id_fkey" FOREIGN KEY ("taskId_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinates" ADD CONSTRAINT "coordinates_taskId_id_fkey" FOREIGN KEY ("taskId_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
