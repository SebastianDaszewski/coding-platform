import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  const { nickname, firstName, lastName, email, password } =
    await request.json();

  const hashedPassword = await hash(password, 10);
  const existingEmail = await prisma.user.findUnique({
    where: { email: email },
  });
  const existingNickname = await prisma.user.findUnique({
    where: { nickname: nickname },
  });

  if (existingEmail) {
    return NextResponse.json(
      {
        user: null,
        message: "User with this email already exists",
      },
      { status: 409 }
    );
  }
  if (existingNickname) {
    return NextResponse.json(
      {
        user: null,
        message: "User with this nickname already exists",
      },
      { status: 410 }
    );
  }
  const user = await prisma.user.create({
    data: {
      nickname,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: "User created successfully", user });
}
