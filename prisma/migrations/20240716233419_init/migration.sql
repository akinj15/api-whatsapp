/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "identificadornumero" TEXT NOT NULL,
    "identificadorconta" TEXT NOT NULL,
    "whatsapptoken" TEXT NOT NULL
);
INSERT INTO "new_Client" ("email", "id", "identificadorconta", "identificadornumero", "name", "whatsapptoken") SELECT "email", "id", "identificadorconta", "identificadornumero", "name", "whatsapptoken" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_name_key" ON "Client"("name");
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
CREATE UNIQUE INDEX "Client_identificadornumero_key" ON "Client"("identificadornumero");
CREATE UNIQUE INDEX "Client_identificadorconta_key" ON "Client"("identificadorconta");
CREATE UNIQUE INDEX "Client_whatsapptoken_key" ON "Client"("whatsapptoken");
CREATE TABLE "new_Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "keywords" TEXT NOT NULL
);
INSERT INTO "new_Role" ("color", "id", "keywords", "name") SELECT "color", "id", "keywords", "name" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "token" TEXT,
    "password" TEXT,
    "firstname" TEXT,
    "surname" TEXT,
    "lastname" TEXT,
    "roleId" TEXT NOT NULL,
    CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("email", "firstname", "id", "lastname", "password", "roleId", "surname", "token", "username") SELECT "email", "firstname", "id", "lastname", "password", "roleId", "surname", "token", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
