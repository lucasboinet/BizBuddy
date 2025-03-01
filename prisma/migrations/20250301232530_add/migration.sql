-- CreateTable
CREATE TABLE "Setting" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "address" JSONB,
    "siret" TEXT NOT NULL,
    "iban" TEXT NOT NULL,
    "bic" TEXT NOT NULL,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Setting_userId_key" ON "Setting"("userId");

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
