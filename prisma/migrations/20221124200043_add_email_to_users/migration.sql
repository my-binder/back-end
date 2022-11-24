/*
  Warnings:

  - You are about to drop the column `displayname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[urlName]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayName` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "displayname",
DROP COLUMN "username",
ADD COLUMN     "displayName" VARCHAR(50) NOT NULL,
ADD COLUMN     "email" VARCHAR(50) NOT NULL,
ADD COLUMN     "urlName" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_urlName_key" ON "users"("urlName");
