-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APPLIED', 'INTERVIEW', 'REJECTED', 'OFFER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "date_applied" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "application_id" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_application_id_fkey" FOREIGN KEY ("application_id") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
