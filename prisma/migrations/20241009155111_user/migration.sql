-- CreateEnum
CREATE TYPE "Category" AS ENUM ('FUNCTION', 'LOOP');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "accounts" (
    "_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "_id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "image" TEXT,
    "emailVerified" TIMESTAMP(3),
    "acceptTerms" BOOLEAN,
    "eneabled" BOOLEAN,

    CONSTRAINT "users_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "JavascriptAssignment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL DEFAULT 'FUNCTION',
    "difficultyLevel" "DifficultyLevel" NOT NULL DEFAULT 'EASY',
    "submissions" INTEGER DEFAULT 0,
    "descriptionStart" TEXT NOT NULL,
    "descriptionEnd" TEXT,
    "sampleInput" TEXT[],
    "sampleOutput" TEXT[],
    "tests" JSONB[],
    "patternFunction" TEXT NOT NULL,

    CONSTRAINT "JavascriptAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JavascriptAssignmentSolution" (
    "id" TEXT NOT NULL,
    "javascriptAssignmentId" TEXT NOT NULL,
    "solution" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "userId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "JavascriptAssignmentSolution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_nickname_key" ON "users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "JavascriptAssignmentSolution_javascriptAssignmentId_userId_key" ON "JavascriptAssignmentSolution"("javascriptAssignmentId", "userId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JavascriptAssignmentSolution" ADD CONSTRAINT "JavascriptAssignmentSolution_javascriptAssignmentId_fkey" FOREIGN KEY ("javascriptAssignmentId") REFERENCES "JavascriptAssignment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JavascriptAssignmentSolution" ADD CONSTRAINT "JavascriptAssignmentSolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
