-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "telegram_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "photo_url" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'ru',
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "coins" INTEGER NOT NULL DEFAULT 0,
    "last_active" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Питомец',
    "level" INTEGER NOT NULL DEFAULT 1,
    "hunger" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "happiness" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "energy" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "health" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "knowledge" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "feedBonus" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "happyBonus" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lastFeed" TIMESTAMP(3),
    "lastPlay" TIMESTAMP(3),
    "lastSleep" TIMESTAMP(3),
    "lastEducate" TIMESTAMP(3),
    "accessories" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_id_key" ON "User"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "Pet_ownerId_key" ON "Pet"("ownerId");

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
