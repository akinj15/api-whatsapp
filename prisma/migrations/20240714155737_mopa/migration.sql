/*
  Warnings:

  - You are about to drop the column `identificadorConta` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `identificadorNumero` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `whatsappToken` on the `Client` table. All the data in the column will be lost.
  - Added the required column `identificadorconta` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identificadornumero` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapptoken` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "identificadornumero" TEXT NOT NULL,
    "identificadorconta" TEXT NOT NULL,
    "whatsapptoken" TEXT NOT NULL
);
INSERT INTO "new_Client" ("email", "id", "name") SELECT "email", "id", "name" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
CREATE UNIQUE INDEX "Client_identificadornumero_key" ON "Client"("identificadornumero");
CREATE UNIQUE INDEX "Client_identificadorconta_key" ON "Client"("identificadorconta");
CREATE UNIQUE INDEX "Client_whatsapptoken_key" ON "Client"("whatsapptoken");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
