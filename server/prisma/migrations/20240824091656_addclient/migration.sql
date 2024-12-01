-- CreateTable
CREATE TABLE "Client" (
    "clientId" TEXT NOT NULL,
    "org" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "affiliation" TEXT NOT NULL,
    "attributes" JSONB NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("clientId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_UserId_key" ON "Client"("UserId");
