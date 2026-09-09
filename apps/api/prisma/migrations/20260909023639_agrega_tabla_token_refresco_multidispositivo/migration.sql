-- AlterTable
ALTER TABLE "usuarios" DROP COLUMN "refresh_token_hash";

-- CreateTable
CREATE TABLE "tokens_refresco" (
    "id" TEXT NOT NULL,
    "usuario_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "dispositivo" TEXT NOT NULL,
    "expira_en" TIMESTAMP(3) NOT NULL,
    "revocado_en" TIMESTAMP(3),

    CONSTRAINT "tokens_refresco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tokens_refresco_usuario_id_idx" ON "tokens_refresco"("usuario_id");

-- AddForeignKey
ALTER TABLE "tokens_refresco" ADD CONSTRAINT "tokens_refresco_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
