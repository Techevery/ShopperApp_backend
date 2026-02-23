-- CreateEnum
CREATE TYPE "ShopperStatus" AS ENUM ('Pending', 'Active');

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shopper" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "regionId" TEXT NOT NULL,
    "rating" INTEGER,
    "status" "ShopperStatus" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Shopper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Region_id_name_idx" ON "Region"("id", "name");

-- CreateIndex
CREATE INDEX "Shopper_id_email_status_idx" ON "Shopper"("id", "email", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Shopper_email_key" ON "Shopper"("email");

-- AddForeignKey
ALTER TABLE "Shopper" ADD CONSTRAINT "Shopper_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
