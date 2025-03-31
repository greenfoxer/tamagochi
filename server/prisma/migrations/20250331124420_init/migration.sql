-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegram_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'ru',
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "last_active" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT 'Питомец',
    "level" INTEGER NOT NULL DEFAULT 1,
    "hunger" REAL NOT NULL DEFAULT 100,
    "happiness" REAL NOT NULL DEFAULT 100,
    "energy" REAL NOT NULL DEFAULT 100,
    "health" REAL NOT NULL DEFAULT 100,
    "knowledge" REAL NOT NULL DEFAULT 0,
    "feedBonus" REAL NOT NULL DEFAULT 0,
    "happyBonus" REAL NOT NULL DEFAULT 0,
    "lastFeed" DATETIME,
    "lastPlay" DATETIME,
    "lastSleep" DATETIME,
    "lastEducate" DATETIME,
    "accessories" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_id_key" ON "User"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_ownerId_key" ON "Pet"("ownerId");
